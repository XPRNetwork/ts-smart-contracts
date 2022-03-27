import { Packer, Float128, calcPackedVarUint32Length, check, Decoder, Encoder, Utils, packer, Table, variant } from "as-chain";
import { RESERVED } from "./atomicassets.constants";
import { decode } from "./base58";

@variant
export class ATOMIC_ATTRIBUTE {
    i8: i8;
    i16: i16;
    i32: i32;
    i64: i64;
    u8: u8;
    u16: u16;
    u32: u32;
    u64: u64;
    float: f64;
    double: Float128 | null;
    string: string = "";
    INT8_VEC: i8[] | null;
    INT16_VEC: i16[] | null ;
    INT32_VEC: i32[] | null;
    INT64_VEC: i64[] | null;
    UINT8_VEC: u8[] | null;
    UINT16_VEC: u16[] | null;
    UINT32_VEC: u32[] | null;
    UINT64_VEC: u64[] | null;
    FLOAT_VEC: f64[] | null;
    DOUBLE_VEC: Float128[] | null;
    STRING_VEC: string[] | null;
}

// export function serialize(attr_map: ATTRIBUTE_MAP, format_lines: FORMAT[]): u8[] {
//     let number: u64 = 0;
//     let serialized_data: u8[] = []

//     for (let i = 0; i < format_lines.length; i++) {
//         const line = format_lines[i];

//         const attribute_itr = attr_map.find(line.name);
//         if (attribute_itr != attr_map.end()) {
//             const identifier: u8[] = toVarintBytes(number + RESERVED);
//             serialized_data = serialized_data.concat(identifier)

//             const child_data: u8[] = serialize_attribute(line.type, attribute_itr!.second)
//             serialized_data = serialized_data.concat(child_data)

//             attr_map.erase(attribute_itr);
//         }
//         number++;
//     }
//     if (attr_map.begin() != attr_map.end()) {
//         check(false,
//             "The following attribute could not be serialized, because it is not specified in the provided format: "
//             + attr_map.begin()!.first);
//     }
//     return serialized_data;
// }

function zigzagEncode (value: i64): u64 {
    if (value < 0) {
        return <u64>(-1 * (value + 1)) * 2 + 1;
    } else {
        return <u64>(value * 2);
    }
}

function zigzagDecode (value: u64): i64 {
    if (value % 2 == 0) {
        return <i64>(value / 2);
    } else {
        return <i64>((value / 2) * -1 - 1);
    }
}

function toVarintBytes(number: u64, original_bytes: u64 = 8): u8[] {
    if (original_bytes < 8) {
        const bitmask: u64 = (<u64>(1) << original_bytes * 8) - 1;
        number &= bitmask;
    }

    const bytes: u8[] = []
    while (number >= 128) {
        // sets msb, stores remainder in lower bits
        bytes.push(<u8>(128 + number % 128));
        number /= 128;
    }
    bytes.push(<u8>(number));

    return bytes;
}

function unsignedFromVarintBytes(itr: u8[]): u64 {
    let number: u64 = 0;
    let multiplier: u64 = 1;

    while (itr[0] >= 128) {
        number += ((itr[0] - 128) * multiplier);
        itr.splice(0, 1);
        multiplier *= 128;
    }
    number += (itr[0] * multiplier);
    itr.splice(0, 1);

    return number;
}

//It is expected that the number is smaller than 2^byte_amount
function toIntBytes(number: u64, byte_amount: u64): u8[] {
    const bytes: u8[] = [];
    for (let i: u64 = 0; i < byte_amount; i++) {
        bytes.push(<u8>(number % 256));
        number /= 256;
    }
    return bytes;
}

function unsignedFromIntBytes(itr: u8[], original_bytes: u64 = 8): u64 {
    let number: u64 = 0;
    let multiplier: u64 = 1;

    for (let i: u64 = 0; i < original_bytes; i++) {
        number += (itr[0] * multiplier);
        multiplier *= 256;
        itr.splice(0, 1)
    }

    return number;
}

@packer
export class FORMAT {
    constructor (
        public name: string = "",
        public type: string = "",
    ) {}
}

@packer
export class ATTRIBUTE_MAP_SINGLE {
    constructor (
        public key: string = "",
        public value: ATOMIC_ATTRIBUTE = new ATOMIC_ATTRIBUTE()
    ) {}
}

export function findAttribute (attributes: ATTRIBUTE_MAP_SINGLE[], key: string): ATOMIC_ATTRIBUTE | null {
    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].key === key) {
            return attributes[i].value
        }
    }
    return null
}

export function findIndexOfAttribute (attributes: ATTRIBUTE_MAP_SINGLE[], key: string): i32 {
    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].key === key) {
            return i
        }
    }
    return -1
}

export function beginAttribute (attributes: ATTRIBUTE_MAP_SINGLE[]): ATOMIC_ATTRIBUTE | null {
    return attributes.length ? attributes[0].value : null
}

export function endAttribute (attributes: ATTRIBUTE_MAP_SINGLE[]): ATOMIC_ATTRIBUTE | null {
    return attributes.length ? attributes[attributes.length - 1].value : null
}

export function eraseAttribute (attributes: ATTRIBUTE_MAP_SINGLE[], toErase: ATTRIBUTE_MAP_SINGLE | null): void {
    if (!toErase) {
        return
    }

    const toEraseIndex = findIndexOfAttribute(attributes, toErase.key)
    if (toEraseIndex != -1) {
        attributes.splice(toEraseIndex, 1)
    }
}

function floatToBytes (float: f64): u8[] {
    let enc = new Encoder(sizeof<f64>())
    enc.packNumber<f64>(float)
    return enc.getBytes()
}

function doubleToBytes (float: Float128): u8[] {
    let enc = new Encoder(float.getSize())
    enc.pack(float)
    return enc.getBytes()
}

function stringToBytes (string: string): u8[] {
    const enc = new Encoder(Utils.calcPackedStringLength(string))
    enc.packString(string)
    const serialized_data: u8[] = enc.getBytes()
    const length_bytes: u8[] = toVarintBytes(string.length)
    return length_bytes.concat(serialized_data)
}

function serialize_attribute (type: string, attr: ATOMIC_ATTRIBUTE): u8[]  {
    if (type.indexOf("[]", type.length - 2) == type.length - 2) {
        if (attr.isINT8_VEC()) {
            const vec = attr.getINT8_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 1);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isINT16_VEC()) {
            const vec = attr.getINT16_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 2);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isINT32_VEC()) {
            const vec = attr.getINT32_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 4);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isINT64_VEC()) {
            const vec = attr.getINT64_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 8);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isUINT8_VEC()) {
            const vec = attr.getUINT8_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 1);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isUINT16_VEC()) {
            const vec = attr.getUINT16_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 2);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isUINT32_VEC()) {
            const vec = attr.getUINT32_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 4);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isUINT64_VEC()) {
            const vec = attr.getUINT64_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 8);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isFLOAT_VEC()) {
            const vec = attr.getFLOAT_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = floatToBytes(vec[i])
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        }  else if (attr.isDOUBLE_VEC()) {
            const vec = attr.getDOUBLE_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = doubleToBytes(vec[i])
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isSTRING_VEC()) {
            const vec = attr.getSTRING_VEC()!
            let serialized_data = toVarintBytes(attr.getSize() - 1)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = stringToBytes(vec[i])
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        }  else {
            return []
        }

    } else if (type == "int8") {
        return toVarintBytes(zigzagEncode(attr.geti8()), 1)
    } else if (type == "int16") {
        return toVarintBytes(zigzagEncode(attr.geti8()), 2)
    }  else if (type == "int32") {
        return toVarintBytes(zigzagEncode(attr.geti8()), 4)
    }  else if (type == "int64") {
        return toVarintBytes(zigzagEncode(attr.geti8()), 8)
       
    } else if (type == "uint8") {
        return toVarintBytes(attr.geti8(), 1)
    } else if (type == "uint16") {
        return toVarintBytes(attr.geti8(), 2)
    }  else if (type == "uint32") {
        return toVarintBytes(attr.geti8(), 4)
    }  else if (type == "uint64") {
        return toVarintBytes(attr.geti8(), 8)
        
    } else if (type == "fixed8" || type == "byte") {
        return toIntBytes(attr.getu8(), 1);
    } else if (type == "fixed16") {
        return toIntBytes(attr.getu16(), 2);
    }  else if (type == "fixed32") {
        return toIntBytes(attr.getu32(), 4);
    }  else if (type == "fixed64") {
        return toIntBytes(attr.getu64(), 8);

    }  else if (type == "float") {
        return floatToBytes(attr.getfloat())

    }  else if (type == "double") {
        return doubleToBytes(attr.getdouble())

    }   else if (type == "string" || type == "image") {
        return stringToBytes(attr.getstring())

    }  else if (type == "ipfs") {
        const value = decode(attr.getstring())
        const length_bytes: u8[] = toVarintBytes(value.length)
        return length_bytes.concat(value)

    }   else if (type == "bool") {
        const value = attr.getu8()
        check(value == 0 || value == 1, "Bools need to be provided as an uin8_t that is either 0 or 1")
        return [<u8>(value)]

    } else {
        check(false, "No type could be matched - " + type);
        return []
    }
}

// Include
@packer
class atomicassets_atomicdata extends Table { constructor() { super(); } }