import { Contract, sha3, Utils, check, keccak, assertSha3, assertKeccak, Checksum256, blake2, Checksum512, print } from "proton-tsc"

const H2B = Utils.hexToBytes

@contract
class CryptoContract extends Contract {
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
}