import { ExtendedSymbol, U128, Decoder, check } from ".."

export const extendedSymbolToU128 = (extSym: ExtendedSymbol): U128 => {
    return new U128(extSym.contract.N, extSym.sym.value)
}

export const U128ToExtSym = (value: U128): ExtendedSymbol => {
    const data: u8[] = value.toBytes()
    const extSym = new ExtendedSymbol()
    let dec = new Decoder(data);
    dec.unpack(extSym.contract);
    dec.unpack(extSym.sym);
    check(extSym.sym.isValid(), "invalid extended symbol");
    return extSym;
}