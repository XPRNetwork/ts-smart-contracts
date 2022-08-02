import { check, Encoder, Utils, Decoder, Variant } from "..";
import { decode, encode } from "./base58";
import { RESERVED } from "./atomicassets.constants";

@packer
export class AtomicFormat {
    constructor (
        public name: string = "",
        public type: string = "",
    ) {}
}

@packer
export class AtomicAttribute {
    constructor (
        public key: string = "",
        public value: AtomicValue = new AtomicValue()
    ) {}

    @inline @operator('==')
    static eq(a: AtomicAttribute, b: AtomicAttribute): bool {
        return a.key == b.key && Utils.bytesCmp(a.value.pack(), b.value.pack()) == 0;
    }

    @inline @operator('!=')
    static neq(a: AtomicAttribute, b: AtomicAttribute): bool {
        return a.key != b.key || Utils.bytesCmp(a.value.pack(), b.value.pack()) != 0;
    }
}

@variant
export class AtomicValue extends Variant {
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

    // Just for TS intellisense, gets replaced by pre-processor
    static new<T>(value: T): AtomicValue {
        return instantiate<AtomicValue>()
    }
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


export function eraseAttribute (attributes: AtomicAttribute[], toErase: AtomicAttribute): void {
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


export function findIndexOfAttribute (attributes: AtomicAttribute[], key: string): i32 {
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
    return serialized_data
}

export function serialize_attribute (type: string, attr: AtomicValue): u8[]  {
    if (type.indexOf("[]") == type.length - 2) {
        if (attr.is<i8[]>()) {
            const vec = attr.get<i8[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 1);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<i16[]>()) {
            const vec = attr.get<i16[]>()
            let serialized_data = toVarintBytes(vec.length)

            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 2);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<i32[]>()) {
            const vec = attr.get<i32[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 4);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<i64[]>()) {
            const vec = attr.get<i64[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(zigzagEncode(vec[i]), 8);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<u8[]>()) {
            const vec = attr.get<u8[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 1);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<u16[]>()) {
            const vec = attr.get<u16[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 2);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<u32[]>()) {
            const vec = attr.get<u32[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 4);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<u64[]>()) {
            const vec = attr.get<u64[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = toVarintBytes(vec[i], 8);
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<f32[]>()) {
            const vec = attr.get<f32[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = floatToBytes(vec[i])
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        }  else if (attr.is<f64[]>()) {
            const vec = attr.get<f64[]>()
            let serialized_data = toVarintBytes(vec.length)
            for (let i = 0; i < vec.length; i++) {
                const serialized_element: u8[] = doubleToBytes(vec[i])
                serialized_data = serialized_data.concat(serialized_element)
            }
            return serialized_data
        } else if (attr.is<string[]>()) {
            const vec = attr.get<string[]>()
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
        return toVarintBytes(zigzagEncode(attr.get<i8>()), 1)
    } else if (type == "int16") {
        return toVarintBytes(zigzagEncode(attr.get<i16>()), 2)
    }  else if (type == "int32") {
        return toVarintBytes(zigzagEncode(attr.get<i32>()), 4)
    }  else if (type == "int64") {
        return toVarintBytes(zigzagEncode(attr.get<i64>()), 8)
       
    } else if (type == "uint8") {
        return toVarintBytes(attr.get<u8>(), 1)
    } else if (type == "uint16") {
        return toVarintBytes(attr.get<u16>(), 2)
    }  else if (type == "uint32") {
        return toVarintBytes(attr.get<u32>(), 4)
    }  else if (type == "uint64") {
        return toVarintBytes(attr.get<u64>(), 8)
        
    } else if (type == "fixed8" || type == "byte") {
        return toIntBytes(attr.get<u8>(), 1);
    } else if (type == "fixed16") {
        return toIntBytes(attr.get<u16>(), 2);
    } else if (type == "fixed32") {
        return toIntBytes(attr.get<u32>(), 4);
    } else if (type == "fixed64") {
        return toIntBytes(attr.get<u64>(), 8);

    } else if (type == "float") {
        return floatToBytes(attr.get<f32>())

    } else if (type == "double") {
        return doubleToBytes(attr.get<f64>())

    } else if (type == "string" || type == "image") {
        return stringToBytes(attr.get<string>())

    } else if (type == "ipfs") {
        const value = decode(attr.get<string>())
        const length_bytes: u8[] = toVarintBytes(value.length)
        return length_bytes.concat(value)

    } else if (type == "bool") {
        const value = attr.get<u8>()
        check(value == 0 || value == 1, "Bools need to be provided as an uin8_t that is either 0 or 1")
        return [<u8>(value)]

    } else {
        check(false, "No type could be matched - " + type);
        return []
    }
}

export function deserialize_attribute (type: string, itr: u8[]): AtomicValue  {
    if (type.indexOf("[]", type.length - 2) == type.length - 2) {
        const array_length = unsignedFromVarintBytes(itr)
        const base_type = type.slice(0, type.length - 2)

        if (type == "int8[]") {
            const vec: i8[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<i8>())
            }
            return AtomicValue.new<i8[]>(vec)
        } else if (type == "int16[]") {
            const vec: i16[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<i16>())
            }
            return AtomicValue.new<i16[]>(vec)
        } else if (type == "int32[]") {
            const vec: i32[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<i32>())
            }
            return AtomicValue.new<i32[]>(vec)
        } else if (type == "int64[]") {
            const vec: i64[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<i64>())
            }
            return AtomicValue.new<i64[]>(vec)

        } else if (type == "uint8[]" || type == "fixed8[]" || type == "bool[]") {
            const vec: u8[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<u8>())
            }
            return AtomicValue.new<u8[]>(vec)
        } else if (type == "uint16[]" || type == "fixed16[]") {
            const vec: u16[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<u16>())
            }
            return AtomicValue.new<u16[]>(vec)
        } else if (type == "uint32[]" || type == "fixed32[]") {
            const vec: u32[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<u32>())
            }
            return AtomicValue.new<u32[]>(vec)
        } else if (type == "uint64[]" || type == "fixed64[]") {
            const vec: u64[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<u64>())
            }
            return AtomicValue.new<u64[]>(vec)

        } else if (type == "float[]") {
            const vec: f32[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<f32>())
            }
            return AtomicValue.new<f32[]>(vec)

        } else if (type == "double[]") {
            const vec: f64[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<f64>())
            }
            return AtomicValue.new<f64[]>(vec)

        } else if (type == "string[]" || type == "image[]") {
            const vec: string[] = []
            for (let i = 0; i < <i32>(array_length); i++) {
                vec.push(deserialize_attribute(base_type, itr).get<string>())
            }
            return AtomicValue.new<string[]>(vec)
        } else {
            check(false, "No type could be matched - " + type);
            return new AtomicValue()
        }

    } else if (type == "int8") {
        return AtomicValue.new(<i8>(zigzagDecode(unsignedFromVarintBytes(itr))))
    } else if (type == "int16") {
        return AtomicValue.new(<i16>(zigzagDecode(unsignedFromVarintBytes(itr))))
    }  else if (type == "int32") {
        return AtomicValue.new(<i32>(zigzagDecode(unsignedFromVarintBytes(itr))))
    }  else if (type == "int64") {
        return AtomicValue.new(<i64>(zigzagDecode(unsignedFromVarintBytes(itr))))
       
    } else if (type == "uint8") {
        return AtomicValue.new(<u8>(unsignedFromVarintBytes(itr)))
    } else if (type == "uint16") {
        return AtomicValue.new(<u16>(unsignedFromVarintBytes(itr)))
    }  else if (type == "uint32") {
        return AtomicValue.new(<u32>(unsignedFromVarintBytes(itr)))
    }  else if (type == "uint64") {
        return AtomicValue.new(<u64>(unsignedFromVarintBytes(itr)))
        
    } else if (type == "fixed8") {
        return AtomicValue.new(<u8>(unsignedFromIntBytes(itr, 1)))
    } else if (type == "fixed16") {
        return AtomicValue.new(<u16>(unsignedFromIntBytes(itr, 2)))
    } else if (type == "fixed32") {
        return AtomicValue.new(<u32>(unsignedFromIntBytes(itr, 4)))
    } else if (type == "fixed64") {
        return AtomicValue.new(<u64>(unsignedFromIntBytes(itr, 8)))

    } else if (type == "float") {
        const dec = new Decoder(itr.splice(0, 4));
        const innerValue: f32 = dec.unpackNumber<f32>();
        return AtomicValue.new<f32>(innerValue)

    } else if (type == "double") {
        const dec = new Decoder(itr.splice(0, 8));
        const innerValue: f64 = dec.unpackNumber<f64>();
        return AtomicValue.new<f64>(innerValue)

    } else if (type == "string" || type == "image") {
        const string_length = unsignedFromVarintBytes(itr);
        const rawStr = itr.splice(0, <i32>(string_length));
        const innerValue: string = String.UTF8.decode(rawStr.buffer);
        return AtomicValue.new<string>(innerValue)

    } else if (type == "ipfs") {
        const array_length = unsignedFromVarintBytes(itr);
        const byte_array = Uint8Array.wrap(itr.splice(0, <i32>(array_length)).buffer)
        return AtomicValue.new<string>(encode(byte_array))

    } else if (type == "bool") {
        const next_byte = itr.splice(0, 1)[0]
        return AtomicValue.new<u8>(next_byte)

    } else {
        check(false, "No type could be matched - " + type);
        return new AtomicValue()
    }
}

export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[] {
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

export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[] {
    const attr_map: AtomicAttribute[] = [];

    while (data.length) {
        const identifier = unsignedFromVarintBytes(data);
        const format = format_lines[<i32>(identifier - RESERVED)]
        const attr = deserialize_attribute(format.type, data)
        attr_map.push(
            new AtomicAttribute(format.name, attr)
        )
    }

    return attr_map;
}
