import { Name, Symbol } from "..";

//------------------- Constants ------------------------------//
export const SYSTEM_CONTRACT = Name.fromString("eosio")
export const PROTON_USER_CONTRACT = Name.fromString("eosio.proton")

export const RAM_FEE_PRECISION: i64 = 100;

export const XPR_CONTRACT = Name.fromString("eosio.token")
export const XPR_SYMBOL = new Symbol("XPR", 4)