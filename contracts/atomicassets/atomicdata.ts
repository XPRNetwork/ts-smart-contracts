import { decode, encode } from "./base58";
import { check, Encoder, Utils, Decoder } from "as-chain";
import { RESERVED } from "./atomicassets.constants";

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

    @inline @operator('==')
    static eq(a: ATTRIBUTE_MAP_SINGLE, b: ATTRIBUTE_MAP_SINGLE): bool {
        return a.key == b.key;
    }

    @inline @operator('!=')
    static ne(a: ATTRIBUTE_MAP_SINGLE, b: ATTRIBUTE_MAP_SINGLE): bool {
        return a.key != b.key;
    }
}


@variant
class ATOMIC_ATTRIBUTE {
    i8: i8;
    i16: i16;
    i32: i32;
    i64: i64;
    u8: u8;
    u16: u16;
    u32: u32;
    u64: u64;
    float: f32;
    double: f64;
    string: string = "";
    INT8_VEC: i8[];
    INT16_VEC: i16[] ;
    INT32_VEC: i32[];
    INT64_VEC: i64[];
    UINT8_VEC: u8[];
    UINT16_VEC: u16[];
    UINT32_VEC: u32[];
    UINT64_VEC: u64[];
    FLOAT_VEC: f32[];
    DOUBLE_VEC: f64[];
    STRING_VEC: string[];
}

export function unsignedFromVarintBytes(itr: u8[]): u64 {
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
export function toIntBytes(number: u64, byte_amount: u64): u8[] {
    const bytes: u8[] = [];
    for (let i: u64 = 0; i < byte_amount; i++) {
        bytes.push(<u8>(number % 256));
        number /= 256;
    }
    return bytes;
}

export function unsignedFromIntBytes(itr: u8[], original_bytes: u64 = 8): u64 {
    let number: u64 = 0;
    let multiplier: u64 = 1;

    for (let i: u64 = 0; i < original_bytes; i++) {
        number += (itr[0] * multiplier);
        multiplier *= 256;
        itr.splice(0, 1)
    }

    return number;
}

export function zigzagEncode (value: i64): u64 {
    if (value < 0) {
        return <u64>(-1 * (value + 1)) * 2 + 1;
    } else {
        return <u64>(value * 2);
    }
}

export function zigzagDecode (value: u64): i64 {
    if (value % 2 == 0) {
        return <i64>(value / 2);
    } else {
        return <i64>((value / 2) * -1 - 1);
    }
}


export function eraseAttribute (attributes: ATTRIBUTE_MAP_SINGLE[], toErase: ATTRIBUTE_MAP_SINGLE): void {
    if (!toErase) {
        return
    }

    const toEraseIndex = findIndexOfAttribute(attributes, toErase.key)
    if (toEraseIndex != -1) {
        attributes.splice(toEraseIndex, 1)
    }
}


export function toVarintBytes(number: u64, original_bytes: u64 = 8): u8[] {
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


export function findIndexOfAttribute (attributes: ATTRIBUTE_MAP_SINGLE[], key: string): i32 {
    const keys = attributes.map<string>(attr => attr.key)
    return keys.indexOf(key)
}

export function floatToBytes (float: f32): u8[] {
    let enc = new Encoder(sizeof<f32>())
    enc.packNumber<f32>(float)
    return enc.getBytes()
}

export function doubleToBytes (float: f64): u8[] {
    let enc = new Encoder(sizeof<f64>())
    enc.packNumber<f64>(float)
    return enc.getBytes()
}

export function stringToBytes (string: string): u8[] {
    const enc = new Encoder(Utils.calcPackedStringLength(string))
    enc.packString(string)
    const serialized_data: u8[] = enc.getBytes()
    const length_bytes: u8[] = toVarintBytes(string.length)
    return length_bytes.concat(serialized_data)
}

export function serialize_attribute (type: string, attr: ATOMIC_ATTRIBUTE): u8[]  {
    if (type.indexOf("[]") == type.length - 2) {
        if (attr.isINT8_VEC()) {
            const vec = attr.getINT8_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 1);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isINT16_VEC()) {
            const vec = attr.getINT16_VEC()
            let serialized_data = toVarintBytes(vec.length)

            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 2);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isINT32_VEC()) {
            const vec = attr.getINT32_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 4);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isINT64_VEC()) {
            const vec = attr.getINT64_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 8);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isUINT8_VEC()) {
            const vec = attr.getUINT8_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 1);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isUINT16_VEC()) {
            const vec = attr.getUINT16_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 2);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isUINT32_VEC()) {
            const vec = attr.getUINT32_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 4);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isUINT64_VEC()) {
            const vec = attr.getUINT64_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 8);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isFLOAT_VEC()) {
            const vec = attr.getFLOAT_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = floatToBytes(vec[i])
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        }  else if (attr.isDOUBLE_VEC()) {
            const vec = attr.getDOUBLE_VEC()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = doubleToBytes(vec[i])
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.isSTRING_VEC()) {
            const vec = attr.getSTRING_VEC()
            let serialized_data = toVarintBytes(vec.length)
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
        return toVarintBytes(zigzagEncode(attr.geti16()), 2)
    }  else if (type == "int32") {
        return toVarintBytes(zigzagEncode(attr.geti32()), 4)
    }  else if (type == "int64") {
        return toVarintBytes(zigzagEncode(attr.geti64()), 8)
       
    } else if (type == "uint8") {
        return toVarintBytes(attr.getu8(), 1)
    } else if (type == "uint16") {
        return toVarintBytes(attr.getu16(), 2)
    }  else if (type == "uint32") {
        return toVarintBytes(attr.getu32(), 4)
    }  else if (type == "uint64") {
        return toVarintBytes(attr.getu64(), 8)
        
    } else if (type == "fixed8" || type == "byte") {
        return toIntBytes(attr.getu8(), 1);
    } else if (type == "fixed16") {
        return toIntBytes(attr.getu16(), 2);
    } else if (type == "fixed32") {
        return toIntBytes(attr.getu32(), 4);
    } else if (type == "fixed64") {
        return toIntBytes(attr.getu64(), 8);

    } else if (type == "float") {
        return floatToBytes(attr.getfloat())

    } else if (type == "double") {
        return doubleToBytes(attr.getdouble())

    } else if (type == "string" || type == "image") {
        return stringToBytes(attr.getstring())

    } else if (type == "ipfs") {
        const value = decode(attr.getstring())
        const length_bytes: u8[] = toVarintBytes(value.length)
        return length_bytes.concat(value)

    } else if (type == "bool") {
        const value = attr.getu8()
        check(value == 0 || value == 1, "Bools need to be provided as an uin8_t that is either 0 or 1")
        return [<u8>(value)]

    } else {
        check(false, "No type could be matched - " + type);
        return []
    }
}

export function deserialize_attribute (type: string, itr: u8[]): ATOMIC_ATTRIBUTE  {
    if (type.indexOf("[]", type.length - 2) == type.length - 2) {
        const array_length = unsignedFromVarintBytes(itr)
        const base_type = type.slice(0, type.length - 2)

        if (type == "int8[]") {
            const vec: i8[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).geti8())
            }
            return ATOMIC_ATTRIBUTE.new<i8[]>(vec)
        } else if (type == "int16[]") {
            const vec: i16[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).geti16())
            }
            return ATOMIC_ATTRIBUTE.new<i16[]>(vec)
        } else if (type == "int32[]") {
            const vec: i32[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).geti32())
            }
            return ATOMIC_ATTRIBUTE.new<i32[]>(vec)
        } else if (type == "int64[]") {
            const vec: i64[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).geti64())
            }
            return ATOMIC_ATTRIBUTE.new<i64[]>(vec)

        } else if (type == "uint8[]" || type == "fixed8[]" || type == "bool[]") {
            const vec: u8[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).getu8())
            }
            return ATOMIC_ATTRIBUTE.new<u8[]>(vec)
        } else if (type == "uint16[]" || type == "fixed16[]") {
            const vec: u16[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).getu16())
            }
            return ATOMIC_ATTRIBUTE.new<u16[]>(vec)
        } else if (type == "uint32[]" || type == "fixed32[]") {
            const vec: u32[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).getu32())
            }
            return ATOMIC_ATTRIBUTE.new<u32[]>(vec)
        } else if (type == "uint64[]" || type == "fixed64[]") {
            const vec: u64[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).getu64())
            }
            return ATOMIC_ATTRIBUTE.new<u64[]>(vec)

        } else if (type == "float[]") {
            const vec: f32[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).getfloat())
            }
            return ATOMIC_ATTRIBUTE.new<f32[]>(vec)

        } else if (type == "double[]") {
            const vec: f64[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).getdouble())
            }
            return ATOMIC_ATTRIBUTE.new<f64[]>(vec)

        } else if (type == "string[]" || type == "image[]") {
            const vec: string[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).getstring())
            }
            return ATOMIC_ATTRIBUTE.new<string[]>(vec)
        } else {
            check(false, "No type could be matched - " + type);
            return new ATOMIC_ATTRIBUTE()
        }

    } else if (type == "int8") {
        return ATOMIC_ATTRIBUTE.new(<i8>(zigzagDecode(unsignedFromVarintBytes(itr))))
    } else if (type == "int16") {
        return ATOMIC_ATTRIBUTE.new(<i16>(zigzagDecode(unsignedFromVarintBytes(itr))))
    }  else if (type == "int32") {
        return ATOMIC_ATTRIBUTE.new(<i32>(zigzagDecode(unsignedFromVarintBytes(itr))))
    }  else if (type == "int64") {
        return ATOMIC_ATTRIBUTE.new(<i64>(zigzagDecode(unsignedFromVarintBytes(itr))))
       
    } else if (type == "uint8") {
        return ATOMIC_ATTRIBUTE.new(<u8>(unsignedFromVarintBytes(itr)))
    } else if (type == "uint16") {
        return ATOMIC_ATTRIBUTE.new(<u16>(unsignedFromVarintBytes(itr)))
    }  else if (type == "uint32") {
        return ATOMIC_ATTRIBUTE.new(<u32>(unsignedFromVarintBytes(itr)))
    }  else if (type == "uint64") {
        return ATOMIC_ATTRIBUTE.new(<u64>(unsignedFromVarintBytes(itr)))
        
    } else if (type == "fixed8") {
        return ATOMIC_ATTRIBUTE.new(<u8>(unsignedFromIntBytes(itr, 1)))
    } else if (type == "fixed16") {
        return ATOMIC_ATTRIBUTE.new(<u16>(unsignedFromIntBytes(itr, 2)))
    } else if (type == "fixed32") {
        return ATOMIC_ATTRIBUTE.new(<u32>(unsignedFromIntBytes(itr, 4)))
    } else if (type == "fixed64") {
        return ATOMIC_ATTRIBUTE.new(<u64>(unsignedFromIntBytes(itr, 8)))

    } else if (type == "float") {
        const dec = new Decoder(itr.splice(0, 4));
        const innerValue: f32 = dec.unpackNumber<f32>();
        return ATOMIC_ATTRIBUTE.new<f32>(innerValue)

    } else if (type == "double") {
        const dec = new Decoder(itr.splice(0, 8));
        const innerValue: f64 = dec.unpackNumber<f64>();
        return ATOMIC_ATTRIBUTE.new<f64>(innerValue)

    } else if (type == "string" || type == "image") {
        const string_length = unsignedFromVarintBytes(itr);
        const rawStr = itr.splice(0, <i32>(string_length + 1)).slice(1);
        const innerValue: string = String.UTF8.decode(rawStr.buffer);
        return ATOMIC_ATTRIBUTE.new<string>(innerValue)

    } else if (type == "ipfs") {
        const array_length = unsignedFromVarintBytes(itr);
        const byte_array = Uint8Array.wrap(itr.splice(0, <i32>(array_length)).buffer)
        return ATOMIC_ATTRIBUTE.new<string>(encode(byte_array))

    } else if (type == "bool") {
        const next_byte = itr.splice(0, 1)[0]
        return ATOMIC_ATTRIBUTE.new<u8>(next_byte)

    } else {
        check(false, "No type could be matched - " + type);
        return new ATOMIC_ATTRIBUTE()
    }
}

export function serialize(attr_map: ATTRIBUTE_MAP_SINGLE[], format_lines: FORMAT[]): u8[] {
    let number: u64 = 0;
    let serialized_data: u8[] = []

    for (let i = 0; i < format_lines.length; i++) {
        const line = format_lines[i];
        const attributeIndex = findIndexOfAttribute(attr_map, line.name);
        if (attributeIndex != -1) {
            const identifier: u8[] = toVarintBytes(number + RESERVED);
            serialized_data = serialized_data.concat(identifier)

            const child_data: u8[] = serialize_attribute(line.type, attr_map[attributeIndex].value)
            serialized_data = serialized_data.concat(child_data)

            attr_map.splice(attributeIndex, 1)
        }
        number++;
    }
    if (attr_map.length > 0) {
        check(false,
            "The following attribute could not be serialized, because it is not specified in the provided format: "
            + attr_map[0].key);
    }
    return serialized_data;
}

export function deserialize(data: u8[], format_lines: FORMAT[]): ATTRIBUTE_MAP_SINGLE[] {
    const attr_map: ATTRIBUTE_MAP_SINGLE[] = [];

    while (data.length) {
        const identifier = unsignedFromVarintBytes(data);
        const format = format_lines[<i32>(identifier - RESERVED)]
        const attr = deserialize_attribute(format.type, data)
        attr_map.push(
            new ATTRIBUTE_MAP_SINGLE(format.name, attr)
        )
    }

    return attr_map;
}
