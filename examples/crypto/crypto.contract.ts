import { recoverKey } from "proton-tsc"
import { PublicKey } from "proton-tsc"
import { Encoder } from "proton-tsc"
import { assertRecoverKey } from "proton-tsc"
import { calcPackedVarUint32Length } from "proton-tsc"
import { PublicKeyType } from "proton-tsc"
import { sha256 } from "proton-tsc"
import { Action } from "proton-tsc"
import { Contract, modExp, sha3, Utils, check, keccak, assertSha3, assertKeccak, Checksum256, blake2, Checksum512, AltBn128G1, U256, bn128Add, print, bn128Mul, AltBn128G2, bn128Pair, AltBn128Pair, k1Recover, Signature, ECCUncompressedPublicKey } from "proton-tsc"

const H2B = Utils.hexToBytes

function createG1Point (x: string, y: string): AltBn128G1 {
    return new AltBn128G1(
        U256.fromBytesBE(H2B(x)),
        U256.fromBytesBE(H2B(y))
    )
}

function createG2Point (x1: string, x2: string, y1: string, y2: string): AltBn128G2 {
    return new AltBn128G2(
        U256.fromBytesBE(H2B(x1)),
        U256.fromBytesBE(H2B(x2)),
        U256.fromBytesBE(H2B(y1)),
        U256.fromBytesBE(H2B(y2))
    )
}

@contract
class CryptoContract extends Contract {

    @action("recoverkey")
    recoverkey(actions: Action[], signature: Signature): void {
        const size = calcPackedVarUint32Length(actions.length) + 
                     actions.reduce<usize>((acc: usize, action: Action) => acc + action.getSize(), 0)
        const encoder = new Encoder(size)
        encoder.packObjectArray(actions)
        
        const digest = sha256(encoder.getBytes())
        const pubKey = recoverKey(digest, signature)
        const matchPubKey = new PublicKey(PublicKeyType.K1, Utils.hexToBytes("02e1cfe15202406d707f8f39c5e8577a05145448a1d1f37311673b173779d540a3"))

        check(pubKey == matchPubKey, "recoverkey - Invalid key match")
        assertRecoverKey(digest, signature, matchPubKey)
    }

    @action("k1recover1")
    k1recover1(): void {
        const sig = new Signature()
        sig.unpack(H2B("001b323dd47a1dd5592c296ee2ee12e0af38974087a475e99098a440284f19c1f7642fa0baa10a8a3ab800dfdbe987dee68a09b6fa3db45a5cc4f3a5835a1671d4dd"))
        const dig = new Checksum256(H2B("92390316873c5a9d520b28aba61e7a8f00025ac069acd9c4d2a71d775a55fa5f"))
        const res = k1Recover(sig, dig)
        check(res == new ECCUncompressedPublicKey(H2B("044424982f5c4044aaf27444965d15b53f219c8ad332bf98a98a902ebfb05d46cb86ea6fe663aa83fd4ce0a383855dfae9bf7a07b779d34c84c347fec79d04c51e")), "Invalid k1Recover1")
    }

    @action("k1recover2")
    k1recover2(): void {
        const sig = new Signature()
        sig.unpack(H2B("0001174de755b55bd29026d626f7313a5560353dc5175f29c78d79d961b81a0c04360d833ca789bc16d4ee714a6d1a19461d890966e0ec5c074f67be67e631d33aa7"))
        const dig = new Checksum256(H2B("45fd65f6dd062fe7020f11d19fe5c35dc4d425e1479c0968c8e932c208f25399"))
        const res = k1Recover(sig, dig)
        check(!res, "Invalid k1Recover2")
    }

    @action("k1recover3")
    k1recover3(): void {
        const sig = new Signature()
        sig.unpack(H2B("00174de755b55bd29026d626f7313a5560353dc5175f29c78d79d961b81a0c04360d833ca789bc16d4ee714a6d1a19461d890966e0ec5c074f67be67e631d33aa7"))
        const dig = new Checksum256(H2B("45fd65f6dd062fe7020f11d19fe5c35dc4d425e1479c0968c8e932c208f25399"))
        k1Recover(sig, dig)
    }

    @action("k1recover4")
    k1recover4(): void {
        const sig = new Signature()
        sig.unpack(H2B("0000174de755b55bd29026d626f7313a5560353dc5175f29c78d79d961b81a0c04360d833ca789bc16d4ee714a6d1a19461d890966e0ec5c074f67be67e631d33aa7"))
        const dig = new Checksum256(H2B("fd65f6dd062fe7020f11d19fe5c35dc4d425e1479c0968c8e932c208f25399"))
        k1Recover(sig, dig)
    }

    @action("sha3")
    sha3(): void {
        const str1 = Utils.stringToU8Array("")
        const exp1 = "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a"
        const res1 = sha3(str1)
        check(res1.toString() == exp1, "Invalid sha3 test 1")
        assertSha3(str1, new Checksum256(H2B(exp1)))

        const str2 = Utils.stringToU8Array("abc")
        const exp2 = "3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532"
        const res2 = sha3(str2)
        check(res2.toString() == exp2, "Invalid sha3 test 2")
        assertSha3(str2, new Checksum256(H2B(exp2)))

        const str3 = Utils.stringToU8Array("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq")
        const exp3 = "41c0dba2a9d6240849100376a8235e2c82e1b9998a999e21db32dd97496d3376"
        const res3 = sha3(str3)
        check(res3.toString() == "41c0dba2a9d6240849100376a8235e2c82e1b9998a999e21db32dd97496d3376", "Invalid sha3 test 3")
        assertSha3(str3, new Checksum256(H2B(exp3)))
    }

    @action("keccak")
    keccak(): void {
        const str1 = Utils.stringToU8Array("")
        const exp1 = "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
        const res1 = keccak(str1)
        check(res1.toString() == exp1, "Invalid keccak test 1")
        assertKeccak(str1, new Checksum256(H2B(exp1)))

        const str2 = Utils.stringToU8Array("abc")
        const exp2 = "4e03657aea45a94fc7d47ba826c8d667c0d1e6e33a64a036ec44f58fa12d6c45"
        const res2 = keccak(str2)
        check(res2.toString() == exp2, "Invalid keccak test 2")
        assertKeccak(str2, new Checksum256(H2B(exp2)))

        const str3 = Utils.stringToU8Array("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq")
        const exp3 = "45d3b367a6904e6e8d502ee04999a7c27647f91fa845d456525fd352ae3d7371"
        const res3 = keccak(str3)
        check(res3.toString() == exp3, "Invalid keccak test 3")
        assertKeccak(str3, new Checksum256(H2B(exp3)))
    }

    @action("blake2")
    blake2(): void {
        const exp1 = new Checksum512(H2B("08c9bcf367e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5d282e6ad7f520e511f6c3e2b8c68059b9442be0454267ce079217e1319cde05b"))
        const res1 = blake2(
            0,
            H2B("48c9bdf267e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5d182e6ad7f520e511f6c3e2b8c68059b6bbd41fbabd9831f79217e1319cde05b"),
            H2B("6162630000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"),
            H2B("0300000000000000"),
            H2B("0000000000000000"),
            true,
        )
        check(res1 == exp1, "Invalid blake2 test 1")

        const exp2 = new Checksum512(H2B("ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923"))
        const res2 = blake2(
            12,
            H2B("48c9bdf267e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5d182e6ad7f520e511f6c3e2b8c68059b6bbd41fbabd9831f79217e1319cde05b"),
            H2B("6162630000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"),
            H2B("0300000000000000"),
            H2B("0000000000000000"),
            true,
        )
        check(res2 == exp2, "Invalid blake2 test 2")

        const exp3 = new Checksum512(H2B("75ab69d3190a562c51aef8d88f1c2775876944407270c42c9844252c26d2875298743e7f6d5ea2f2d3e8d226039cd31b4e426ac4f2d3d666a610c2116fde4735"))
        const res3 = blake2(
            12,
            H2B("48c9bdf267e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5d182e6ad7f520e511f6c3e2b8c68059b6bbd41fbabd9831f79217e1319cde05b"),
            H2B("6162630000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"),
            H2B("0300000000000000"),
            H2B("0000000000000000"),
            false,
        )
        check(res3 == exp3, "Invalid blake2 test 3")

        const exp4 = new Checksum512(H2B("b63a380cb2897d521994a85234ee2c181b5f844d2c624c002677e9703449d2fba551b3a8333bcdf5f2f7e08993d53923de3d64fcc68c034e717b9293fed7a421"))
        const res4 = blake2(
            1,
            H2B("48c9bdf267e6096a3ba7ca8485ae67bb2bf894fe72f36e3cf1361d5f3af54fa5d182e6ad7f520e511f6c3e2b8c68059b6bbd41fbabd9831f79217e1319cde05b"),
            H2B("6162630000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"),
            H2B("0300000000000000"),
            H2B("0000000000000000"),
            true,
        )
        check(res4 == exp4, "Invalid blake2 test 4")
    }

    @action("bnadd1")
    bnadd1(): void {
        const point1_1 = createG1Point("222480c9f95409bfa4ac6ae890b9c150bc88542b87b352e92950c340458b0c09", "2976efd698cf23b414ea622b3f720dd9080d679042482ff3668cb2e32cad8ae2")
        const point2_1 = createG1Point("1bd20beca3d8d28e536d2b5bd3bf36d76af68af5e6c96ca6e5519ba9ff8f5332", "2a53edf6b48bcf5cb1c0b4ad1d36dfce06a79dcd6526f1c386a14d8ce4649844")
        const exp1 = "16c7c4042e3a725ddbacf197c519c3dcad2bc87dfd9ac7e1e1631154ee0b7d9c19cd640dd28c9811ebaaa095a16b16190d08d6906c4f926fce581985fe35be0e"
        const res1 = bn128Add(point1_1, point2_1)
        check(Utils.bytesToHex(res1.pack()) == exp1, "Invalid bnAdd test 1")

        const point1_2 = createG1Point("0000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000")
        const point2_2 = createG1Point("1bd20beca3d8d28e536d2b5bd3bf36d76af68af5e6c96ca6e5519ba9ff8f5332", "2a53edf6b48bcf5cb1c0b4ad1d36dfce06a79dcd6526f1c386a14d8ce4649844")
        const exp2 = "1bd20beca3d8d28e536d2b5bd3bf36d76af68af5e6c96ca6e5519ba9ff8f53322a53edf6b48bcf5cb1c0b4ad1d36dfce06a79dcd6526f1c386a14d8ce4649844"
        bn128Add(point1_2, point2_2);
        const res2 = bn128Add(point1_2, point2_2)
        check(Utils.bytesToHex(res2.pack()) == exp2, "Invalid bnAdd test 2")
    }

    @action("bnadd2")
    bnadd2(): void {
        const point1 = createG1Point("222480c9f95409bfa4ac6ae890b9c150bc88542b87b352e92950c340458b0c09", "2976efd698cf23b414ea622b3f720dd9080d679042482ff3668cb2e32cad8ae2")
        const point2 = createG1Point("2a53edf6b48bcf5cb1c0b4ad1d36dfce06a79dcd6526f1c386a14d8ce4649844", "1bd20beca3d8d28e536d2b5bd3bf36d76af68af5e6c96ca6e5519ba9ff8f5332")
        bn128Add(point1, point2);
    }

    @action("bnadd3")
    bnadd3(): void {
        const point1 = createG1Point("30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47", "2976efd698cf23b414ea622b3f720dd9080d679042482ff3668cb2e32cad8ae2")
        const point2 = createG1Point("1bd20beca3d8d28e536d2b5bd3bf36d76af68af5e6c96ca6e5519ba9ff8f5332", "2a53edf6b48bcf5cb1c0b4ad1d36dfce06a79dcd6526f1c386a14d8ce4649844")
        bn128Add(point1, point2);
    }

    @action("bnmul1")
    bnmul1(): void {
        const g1_1 = createG1Point("007c43fcd125b2b13e2521e395a81727710a46b34fe279adbf1b94c72f7f9136", "0db2f980370fb8962751c6ff064f4516a6a93d563388518bb77ab9a6b30755be")
        const scalar_1 = U256.fromBytesBE(H2B("0312ed43559cf8ecbab5221256a56e567aac5035308e3f1d54954d8b97cd1c9b"))
        const exp1 = "2d66cdeca5e1715896a5a924c50a149be87ddd2347b862150fbb0fd7d0b1833c11c76319ebefc5379f7aa6d85d40169a612597637242a4bbb39e5cd3b844becd"
        const res1 = bn128Mul(g1_1, scalar_1)
        print(Utils.bytesToHex(res1.pack()))
        check(Utils.bytesToHex(res1.pack()) == exp1, "Invalid bnMul test 1 1")

        const g1_2 = createG1Point("0000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000000")
        const scalar_2 = U256.fromBytesBE(H2B("0312ed43559cf8ecbab5221256a56e567aac5035308e3f1d54954d8b97cd1c9b"))
        const exp2 = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        const res2 = bn128Mul(g1_2, scalar_2)
        check(Utils.bytesToHex(res2.pack()) == exp2, "Invalid bnMul test 1 2")
    }

    @action("bnmul2")
    bnmul2(): void {
        const g1_1 = createG1Point("0db2f980370fb8962751c6ff064f4516a6a93d563388518bb77ab9a6b30755be", "007c43fcd125b2b13e2521e395a81727710a46b34fe279adbf1b94c72f7f9136")
        const scalar_1 = U256.fromBytesBE(H2B("0312ed43559cf8ecbab5221256a56e567aac5035308e3f1d54954d8b97cd1c9b"))
        bn128Mul(g1_1, scalar_1)
    }

    @action("bnmul3")
    bnmul3(): void {
        const g1_1 = createG1Point("2976efd698cf23b414ea622b3f720dd9080d679042482ff3668cb2e32cad8ae2", "30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47")
        const scalar_1 = U256.fromBytesBE(H2B("0100010001000100010001000100010001000100010001000100010001000100"))
        bn128Mul(g1_1, scalar_1)
    }

    @action("bnpair1")
    bnpair1(): void {
        const g1_1_1 = createG1Point("0f25929bcb43d5a57391564615c9e70a992b10eafa4db109709649cf48c50dd2", "16da2f5cb6be7a0aa72c440c53c9bbdfec6c36c7d515536431b3a865468acbba")
        const g2_1_1 = createG2Point(
            "2e89718ad33c8bed92e210e81d1853435399a271913a6520736a4729cf0d51eb", "01a9e2ffa2e92599b68e44de5bcf354fa2642bd4f26b259daa6f7ce3ed57aeb3",
            "14a9a87b789a58af499b314e13c3d65bede56c07ea2d418d6874857b70763713", "178fb49a2d6cd347dc58973ff49613a20757d0fcc22079f9abd10c3baee24590"
        )
        const g1_2_1 = createG1Point("1b9e027bd5cfc2cb5db82d4dc9677ac795ec500ecd47deee3b5da006d6d049b8", "11d7511c78158de484232fc68daf8a45cf217d1c2fae693ff5871e8752d73b21")
        const g2_2_1 = createG2Point(
            "198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c2", "1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed",
            "090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b", "12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa"
        )
        const pair1_1 = new AltBn128Pair(g1_1_1, g2_1_1)
        const pair2_1 = new AltBn128Pair(g1_2_1, g2_2_1)
        const res1 = bn128Pair([pair1_1, pair2_1])
        check(res1 == true, "Invalid bnPair test 1 1")


        const g1_1_2 = createG1Point("0000000000000000000000000000000000000000000000000000000000000001", "0000000000000000000000000000000000000000000000000000000000000002")
        const g2_1_2 = createG2Point(
            "198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c2", "1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed",
            "090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b", "12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa"
        )
        const pair1_2 = new AltBn128Pair(g1_1_2, g2_1_2)
        const res2 = bn128Pair([pair1_2])
        check(res2 == false, "Invalid bnPair test 1 2")
    }

    @action("bnpair2")
    bnpair2(): void {
        const g1_1_1 = createG1Point("0000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000100000000000000000000000000000000")
        const g2_1_1 = createG2Point(
            "198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c2", "1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed",
            "090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b", "12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa"
        )
        const pair1_1 = new AltBn128Pair(g1_1_1, g2_1_1)
        bn128Pair([pair1_1])
    }

    @action("bnpair3")
    bnpair3(): void {
        const g1_1_1 = createG1Point("30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47", "0000000000000000000000000000000100000000000000000000000000000000")
        const g2_1_1 = createG2Point(
            "198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c2", "1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed",
            "090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b", "12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa"
        )
        const pair1_1 = new AltBn128Pair(g1_1_1, g2_1_1)
        bn128Pair([pair1_1])
    }

    @action("modexp1")
    modexp1(): void {
        const res1 = modExp(
            U256.fromU64(3),
            U256.fromBytesBE(H2B("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2e")),
            U256.fromBytesBE(H2B("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")),
        )
        check(res1 == U256.fromU64(1), "Invalid modexp test 1 1")

        const res2 = modExp(
            U256.fromU64(0),
            U256.fromBytesBE(H2B("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2e")),
            U256.fromBytesBE(H2B("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")),
        )
        check(res2 == U256.fromU64(0), "Invalid modexp test 1 2")

        const res3 = modExp(
            U256.fromU64(2),
            U256.fromU64(90),
            U256.fromU64(13)
        )
        print(res3.toString())
        check(res3 == U256.fromU64(12), "Invalid modexp test 1 3")
    }

    @action("modexp2")
    modexp2(): void {
        const res1 = modExp(
            U256.fromU64(1),
            U256.fromBytes(H2B("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2e")),
            U256.fromU64(0)
        )
    }
}