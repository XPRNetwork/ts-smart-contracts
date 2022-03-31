import { check } from "as-chain";
import { ATTRIBUTE_MAP_SINGLE, findIndexOfAttribute, FORMAT } from "./atomicdata";

/*
This function checks if a vector of FORMAT structs, used to describe a format, is valid
For a format to be valid, three things are checked:
1. The type attribute has to be a valid type. Valid types are:
    int8 / int16 / int32 / int64
    uint8 / uint16 / uint32 / uint64
    fixed8 / fixed16 / fixed32 / fixed64
    float / double / string / image / ipfs / bool / byte
    or any valid type followed by [] to describe a vector
    nested vectors (e.g. uint64[][]) are not allowed
2. Names need to be unique
3. A format line {"name": "name", "type": "string"} needs to be defined
   This could obviously also be done automatically, but we believe that this could lead to confusion
Note: This could all be done a lot cleaner by using regex or similar libraries
      However, using them would bloat up the contract size significantly.
*/
export function check_format(lines: FORMAT[]): void {
    let found_name = false;
    const attribute_names: string[] = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        const name = line.name;
        const type = line.type;

        check(name.length != 0, "An attribute's name can't be empty");
        check(name.length <= 64, "An attribute's name can only be 64 characters max");

        if (name == "name" && type == "string") {
            found_name = true;
        }

        let offset = 0;
        let found_num_type = false;
        if (type.indexOf("int", offset) == offset) {
            offset += 3;
            found_num_type = true;
        } else if (type.indexOf("uint", offset) == offset) {
            offset += 4;
            found_num_type = true;
        } else if (type.indexOf("fixed", offset) == offset) {
            offset += 5;
            found_num_type = true;
        }
        if (found_num_type) {
            if (type.indexOf("8", offset) == offset) {
                offset += 1;
            } else if (type.indexOf("16", offset) == offset || type.indexOf("32", offset) == offset ||
                       type.indexOf("64", offset) == offset) {
                offset += 2;
            } else {
                check(false, "'type' attribute has an invalid format - " + line.type);
            }
        } else {
            if (type.indexOf("bool", offset) == offset || type.indexOf("ipfs", offset) == offset) {
                offset += 4;
            } else if (type.indexOf("bytes", offset) == offset || type.indexOf("float", offset) == offset ||
                type.indexOf("image", offset) == offset) {
                offset += 5;
            } else if (type.indexOf("string", offset) == offset || type.indexOf("double", offset) == offset) {
                offset += 6;
            } else {
                check(false, "'type' attribute has an invalid format - " + line.type);
            }
        }
        if (offset != type.length) {
            check(type.indexOf("[]", offset) == offset, "'type' attribute has an invalid format - " + line.type);
            offset += 2;
        }
        check(offset == type.length, "'type' attribute has an invalid format - " + line.type);

        check(attribute_names.indexOf(name) == -1, "there already is an attribute with the same name - " + line.name);

        attribute_names.push(name);
    }

    check(found_name,
        "A format line with {\"name\": \"name\" and \"type\": \"string\"} needs to be defined for every schema");
}

/**
* The "name" attribute is limited to 64 characters max for both assets and collections
* This function checks that, if there exists an ATTRIBUTE with name: "name", the value of it
* must be of length <= 64
*/
export function check_name_length(data: ATTRIBUTE_MAP_SINGLE[]): void {
    const index = findIndexOfAttribute(data, "name");
    if (index != -1) {
        if (data[index].value.isstring()) {
            check(data[index].value.getstring().length <= 64, "Names (attribute with name: \"name\") can only be 64 characters max");
        }
    }
}