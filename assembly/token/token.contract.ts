import { Name, Asset, Symbol, check, requireAuth, hasAuth, isAccount, requireRecipient, SAME_PAYER, Contract, TableStore } from ".."
import { Account, Stat } from './token.tables';

@contract
export class TokenContract extends Contract {
    /**
     * Allows `issuer` account to create a token in supply of `maximum_supply`. If validation is successful a new entry in statstable for token symbol scope gets created.
     *
     * @param issuer - the account that creates the token,
     * @param maximum_supply - the maximum supply set for the token created.
     *
     * @pre Token symbol has to be valid,
     * @pre Token symbol must not be already created,
     * @pre maximum_supply has to be smaller than the maximum supply allowed by the system: 1^62 - 1.
     * @pre Maximum supply must be positive;
     */
    @action("create")
    create(
        issuer: Name,
        maximum_supply: Asset
    ): void {
        requireAuth(this.receiver);

        const sym = maximum_supply.symbol;
        check(maximum_supply.isValid(), "invalid supply");
        check(maximum_supply.amount > 0, "max-supply must be positive");

        const statstable = new TableStore<Stat>(this.receiver, new Name(sym.code()));
        check(!statstable.exists(sym.code()), "token with symbol already exists")

        const zeroSupply = new Asset(0, maximum_supply.symbol);
        const value = new Stat(zeroSupply, maximum_supply, issuer);
        statstable.store(value, this.receiver);
    }

    /**
     *  This action issues to `to` account a `quantity` of tokens.
     *
     * @param to - the account to issue tokens to, it must be the same as the issuer,
     * @param quantity - the amount of tokens to be issued,
     * @memo - the memo string that accompanies the token issue transaction.
     */
    @action("issue")
    issue(
        to: Name,
        quantity: Asset,
        memo: string
    ): void {
        const sym = quantity.symbol;
        check(sym.isValid(), "invalid symbol name");

        check(memo.length <= 256, "memo has more than 256 bytes");

        const statstable = new TableStore<Stat>(this.receiver, new Name(sym.code()));
        const st = statstable.requireGet(sym.code(), "token with symbol does not exist, create token before issue");
        check(to == st.issuer, "tokens can only be issued to issuer account");

        requireAuth(st.issuer);
        check(quantity.isValid(), "invalid quantity");

        check(quantity.amount > 0, "must issue positive quantity");

        check(quantity.symbol == st.supply.symbol, "symbol precision mismatch");

        check(quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

        st.supply = Asset.add(st.supply, quantity);
        statstable.update(st, SAME_PAYER);

        this.addBalance(st.issuer, quantity, st.issuer);
    }

    /**
     * The opposite for issue action, if all validations succeed,
     * it debits the statstable.supply amount.
     *
     * @param quantity - the quantity of tokens to retire,
     * @param memo - the memo string to accompany the transaction.
     */
    @action("retire")
    retire(
        quantity: Asset,
        memo: string
    ): void {
        const sym = quantity.symbol;
        check(sym.isValid(), "invalid symbol name");

        check(memo.length <= 256, "memo has more than 256 bytes");

        const statstable = new TableStore<Stat>(this.receiver, new Name(sym.code()));
        const st = statstable.requireGet(sym.code(), "token with symbol does not exist");

        requireAuth(st.issuer);
        check(quantity.isValid(), "invalid quantity");
        check(quantity.amount > 0, "must retire positive quantity");

        check(quantity.symbol == st.supply.symbol, "symbol precision mismatch");

        st.supply = Asset.sub(st.supply, quantity);
        statstable.update(st, SAME_PAYER);

        this.subBalance(st.issuer, quantity);
    }

    /**
     * Allows `from` account to transfer to `to` account the `quantity` tokens.
     * One account is debited and the other is credited with quantity tokens.
     *
     * @param from - the account to transfer from,
     * @param to - the account to be transferred to,
     * @param quantity - the quantity of tokens to be transferred,
     * @param memo - the memo string to accompany the transaction.
     */
    @action("transfer")
    transfer(
        from: Name,
        to: Name,
        quantity: Asset,
        memo: string
    ): void {
        check(from != to, "cannot transfer to self");
        requireAuth(from);

        check(isAccount(to), "to account does not exist");

        const sym = quantity.symbol;
        const statstable = new TableStore<Stat>(this.receiver, new Name(sym.code()));
        const st = statstable.requireGet(sym.code(), "token with symbol does not exist");

        requireRecipient(from);
        requireRecipient(to);

        check(quantity.isValid(), "invalid quantity");
        check(quantity.amount > 0, "must transfer positive quantity");

        check(quantity.symbol == st.supply.symbol, "symbol precision mismatch");
        check(memo.length <= 256, "memo has more than 256 bytes");

        const payer = hasAuth(to) ? to : from;

        this.subBalance(from, quantity);
        this.addBalance(to, quantity, payer);
    }

    /**
     * Allows `ram_payer` to create an account `owner` with zero balance for
     * token `symbol` at the expense of `ram_payer`.
     *
     * @param owner - the account to be created,
     * @param symbol - the token to be payed with by `ram_payer`,
     * @param ram_payer - the account that supports the cost of this action.
     *
     */
    @action("open")
    open(
        owner: Name,
        symbol: Symbol,
        ram_payer: Name
    ): void {
        requireAuth(ram_payer);

        check(isAccount(owner), "owner account does not exist");

        const statstable = new TableStore<Stat>(this.receiver, new Name(symbol.code()));
        const st = statstable.requireGet(symbol.code(), "symbol does not exist");

        check(st.supply.symbol == symbol, "symbol precision mismatch");

        const acnts = new TableStore<Account>(this.receiver, owner)
        const it = acnts.get(symbol.code());
        if (!it) {
            const account = new Account(new Asset(0, symbol));
            acnts.store(account, ram_payer);
        }
    }

    /**
     * This action is the opposite for open, it closes the account `owner`
     * for token `symbol`.
     *
     * @param owner - the owner account to execute the close action for,
     * @param symbol - the symbol of the token to execute the close action for.
     *
     * @pre The pair of owner plus symbol has to exist otherwise no action is executed,
     * @pre If the pair of owner plus symbol exists, the balance has to be zero.
     */
    @action("close")
    close(
        owner: Name,
        symbol: Symbol
    ): void {
        requireAuth(owner);
        const acnts = new TableStore<Account>(this.receiver, owner)
        const account = acnts.requireGet(
            symbol.code(),
            "Balance row already deleted or never existed. Action won't have any effect."
        );
        check(
            account.balance.amount == 0,
            "Cannot close because the balance is not zero."
        );
        acnts.remove(account);
    }

    private subBalance(owner: Name, value: Asset): void {
        const fromAcnts = new TableStore<Account>(this.receiver, owner)

        const account = fromAcnts.requireGet(value.symbol.code(), "no balance object found");
        check(account.balance.amount >= value.amount, "overdrawn balance");

        account.balance = Asset.sub(account.balance, value);
        fromAcnts.update(account, owner);
    }

    private addBalance(
        owner: Name,
        value: Asset,
        ramPayer: Name
    ): void {
        const toAcnts = new TableStore<Account>(this.receiver, owner)
        const to = toAcnts.get(value.symbol.code());
        if (!to) {
            const account = new Account(value);
            toAcnts.store(account, ramPayer);
        } else {
            to.balance = Asset.add(to.balance, value);
            toAcnts.update(to, ramPayer);
        }
    }
}