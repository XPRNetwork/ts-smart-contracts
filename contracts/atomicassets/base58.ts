// Code converted from:
// https://github.com/cryptocoinjs/base-x/blob/master/src/index.js

import { Table } from "as-chain";

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
@inline const BASE = 58;

const LEADER = ALPHABET.charAt(0);
const LEADER_CODE = ALPHABET.charCodeAt(0);
// log(256) / log(58) = 1.365658237309761 ~= 554 / 405
@inline const FACTOR_NUM = 406;
@inline const FACTOR_DEN = 554;

@inline const INV_FACTOR_NUM = FACTOR_DEN;
@inline const INV_FACTOR_DEN = FACTOR_NUM - 1;

const BASE_MAP = new Array<u8>(256).fill(0xFF);

for (let i = 0; i < BASE; i++) {
  let code = ALPHABET.charCodeAt(i);
  if (unchecked(BASE_MAP[code]) != 0xFF) {
    throw new TypeError(String.fromCharCode(code) + ' is ambiguous');
  }
  unchecked(BASE_MAP[code] = <u8>i);
}

@inline
function FACTOR(length: i32): i32 {
  return length * FACTOR_NUM / FACTOR_DEN + 1; // log(58) / log(256), rounded up
}

@inline
function INV_FACTOR(length: i32): i32 {
  return length * INV_FACTOR_NUM / INV_FACTOR_DEN + 1; // log(256) / log(58), rounded up
}

/**
* Encode Uint8Array as a base58 string.
* @param bytes Byte array of type Uint8Array.
*/
export function encode(source: Uint8Array): string {

  // Skip & count leading zeroes.
  let pend = source.length;
  let pbegin = 0;
  while (pbegin != pend && source[pbegin] == 0) ++pbegin;
  let zeroes = pbegin;

  // Allocate enough space in big-endian base58 representation.
  let size = INV_FACTOR(pend - pbegin);
  let b58 = new Uint8Array(size);
  let length = 0;

  // Process the bytes.
  while (pbegin != pend) {
    let carry = u32(source[pbegin])
    // Apply "b58 = b58 * 256 + ch".
    let i = 0
    for (let it = size - 1; it != -1 && (carry != 0 || i < length); --it, ++i) {
      carry += u32(b58[it]) << 8;
      b58[it] = carry % BASE;
      carry = carry / BASE;
    }
    if (ASC_OPTIMIZE_LEVEL == 0) {
      assert(!carry, 'Non-zero carry');
    }
    length = i;
    pbegin++;
  }

  // Skip leading zeroes in base58 result.
  let it = size - length;
  while (it != size && b58[it] == 0) ++it;

  // Translate the result into a string.
  let str = LEADER.repeat(zeroes);
  for (; it < size; ++it) str += ALPHABET.charAt(b58[it]);
  return str;
}

export function decodeUnsafe(source: string): u8[] | null {
  let srcLen = source.length;
  if (!srcLen) return [];
  // Skip leading spaces.
  if (source.charCodeAt(0) == /* Space */ 0x20) return null;
  // Skip and count leading '1's.
  let length = 0;
  let psz = 0;

  while (source.charCodeAt(psz) == LEADER_CODE) ++psz;

  let zeroes = psz;
  // Allocate enough space in big-endian base256 representation.
  let size = FACTOR(srcLen - psz);
  let b256 = new Uint8Array(size);
  // Process the characters;
  while (srcLen > psz) {
    // Decode character
    let carry: u32 = unchecked(BASE_MAP[source.charCodeAt(psz++)])
    // Invalid character
    if (carry == 0xFF) return null;
    let i = 0;
    let it3 = size - 1;
    for (; it3 != -1 && (carry != 0 || i < length); --it3, ++i) {
      carry += u32(BASE * b256[it3]);
      b256[it3] = carry;
      carry >>>= 8;
    }
    if (ASC_OPTIMIZE_LEVEL == 0) {
      assert(!carry, 'Non-zero carry');
    }
    length = i;
  }
  // Skip trailing spaces.
  if (source.charCodeAt(psz) == /* Space */ 0x20) return null;
  // Skip leading zeroes in b256.
  let it4 = size - length;
  while (it4 != size && b256[it4] == 0) ++it4;

  let vch = new Array<u8>(zeroes + (size - it4));
  if (zeroes) vch.fill(0, 0, zeroes);
  let j = zeroes;
  while (it4 != size) {
    vch[j++] = b256[it4++];
  }
  return vch;
}

export function decode(source: string): u8[] {
  let buffer = decodeUnsafe(source);
  if (buffer) return buffer;
  throw new Error('Non-base' + String.fromCharCode(BASE) + ' character');
}

// Include
@packer
class atomicassets_base58 extends Table { constructor() { super(); } }