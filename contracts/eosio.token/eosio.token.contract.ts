import { Name, Asset, Symbol, check, requireAuth, hasAuth, isAccount, requireRecipient, SAME_PAYER, Contract } from 'as-chain'
import { Account, Stat } from './eosio.token.tables';

@contract("token")
export class TokenContract extends Contract {
    @action("create")
    create(issuer: Name, maximum_supply: Asset): void {
        requireAuth(this.receiver);

        const sym = maximum_supply.symbol;
        check(maximum_supply.isValid(), "invalid supply");
        check(maximum_supply.amount > 0, "max-supply must be positive");

        const statstable = Stat.getTable(this.receiver, sym);
        check(!statstable.exists(sym.code()), "token with symbol already exists")

        const zeroSupply = new Asset(0, maximum_supply.symbol);
        const value = new Stat(zeroSupply, maximum_supply, issuer);
        statstable.store(value, this.receiver);
    }

    @action("issue")
    issue(to: Name, quantity: Asset, memo: string): void {
        const sym = quantity.symbol;
        check(sym.isValid(), "invalid symbol name");
        check(memo.length <= 256, "memo has more than 256 bytes");

        const statstable = Stat.getTable(this.receiver, sym);
        const st = statstable.requireGet(sym.code(), "token with symbol does not exist, create token before issue");
        check(to == st.issuer,  "tokens can only be issued to issuer account");

        requireAuth(st.issuer);
        check(quantity.isValid(), "invalid quantity");
        check(quantity.amount > 0, "must issue positive quantity");

        check(quantity.symbol == st.supply.symbol, "symbol precision mismatch");
        check(quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

        st.supply = Asset.add(st.supply, quantity);
        statstable.update(st, SAME_PAYER);

        this.addBalance(st.issuer, quantity, st.issuer);
    }

    @action("retire")
    retire(quantity: Asset, memo: string): void {
        const sym = quantity.symbol;
        check(sym.isValid(), "invalid symbol name");
        check(memo.length <= 256, "memo has more than 256 bytes");

        const statstable = Stat.getTable(this.receiver, sym);
        const st = statstable.requireGet(sym.code(), "token with symbol does not exist");

        requireAuth(st.issuer);
        check(quantity.isValid(), "invalid quantity");
        check(quantity.amount > 0, "must retire positive quantity");

        check(quantity.symbol == st.supply.symbol, "symbol precision mismatch");

        st.supply = Asset.sub(st.supply, quantity);
        statstable.update(st, SAME_PAYER);

        this.subBalance(st.issuer, quantity);
    }

    @action("transfer")
    transfer(from: Name, to: Name, quantity: Asset, memo: string): void {
        check(from != to, "cannot transfer to self");
        requireAuth(from);
        check(isAccount(to), "to account does not exist");
        const sym = quantity.symbol;
        const statstable = Stat.getTable(this.receiver, sym);
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

    @action("open")
    open(owner: Name, symbol: Symbol, ram_payer: Name): void {
        requireAuth(ram_payer);

        check(isAccount(owner), "owner account does not exist");

        const statstable = Stat.getTable(this.receiver, symbol);
        const st = statstable.requireGet(symbol.code(), "symbol does not exist");
        check(st.supply.symbol == symbol, "symbol precision mismatch");

        const acnts = Account.getTable(this.receiver, owner)
        const it = acnts.get(symbol.code());
        if (!it) {
            const account = new Account(new Asset(0, symbol));
            acnts.store(account, ram_payer);
        }
    }

    @action("close")
    close(owner: Name, symbol: Symbol): void {
        requireAuth(owner);
        const acnts = Account.getTable(this.receiver, owner)
        const account = acnts.requireGet(symbol.code(), "Balance row already deleted or never existed. Action won't have any effect.");
        check(account.balance.amount == 0, "Cannot close because the balance is not zero.");
        acnts.remove(account);
    }

    subBalance(owner: Name, value: Asset): void {
        const fromAcnts = Account.getTable(this.receiver, owner)

        const account = fromAcnts.requireGet(value.symbol.code(), "no balance object found");
        check(account.balance.amount >= value.amount, "overdrawn balance");

        account.balance = Asset.sub(account.balance, value);
        fromAcnts.update(account, owner);
    }

    addBalance(owner: Name, value: Asset, ramPayer: Name): void {
        const toAcnts = Account.getTable(this.receiver, owner)
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