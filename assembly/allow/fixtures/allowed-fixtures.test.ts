import { Fixtures } from "@proton/vert";

export const allowFixtures: Fixtures = {
    assembly: [{
        name: "allowed",
        path: "assembly/allow/target/allow.contract",
        sendsInline: false
    }],

    accounts: [
        'researcher',
        'malicious'
    ],

    beforeEach: [{
        "helper": "resetTables"
    }],

    tests: [{
        description: "Check Authorizations",
        cases: [
            {
                title: "setpaused: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "setpaused",
                    data: {
                        isPaused: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "setpaused",
                    data: {
                        isPaused: true
                    },
                    authorization: "malicious@active",
                    expectErrorMessage: "missing required authority allowed"
                }]
            },
            {
                title: "setactor: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "setactor",
                    data: {
                        actor: 'researcher',
                        isAllowed: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "setactor",
                    data: {
                        actor: 'researcher',
                        isAllowed: true
                    },
                    authorization: "malicious@active",
                    expectErrorMessage: "missing required authority allowed"
                }]
            },
            {
                title: "setactor: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "setactor",
                    data: {
                        actor: 'malicious',
                        isBlocked: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "setactor",
                    data: {
                        actor: 'malicious',
                        isBlocked: true
                    },
                    authorization: "malicious@active",
                    expectErrorMessage: "missing required authority allowed"
                }]
            },
            {
                title: "settoken: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "settoken",
                    data: {
                        token: { contract: 'xtokens', sym: '6,XUSDC' },
                        isAllowed: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "settoken",
                    data: {
                        token: { contract: 'xtokens', sym: '6,XUSDC' },
                        isAllowed: true
                    },
                    authorization: "malicious@active",
                    expectErrorMessage: "missing required authority allowed"
                }]
            },
            {
                title: "settoken: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "settoken",
                    data: {
                        token: { contract: 'xtokens', sym: '6,XUSDC' },
                        isBlocked: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "settoken",
                    data: {
                        token: { contract: 'xtokens', sym: '6,XUSDC' },
                        isBlocked: true
                    },
                    authorization: "malicious@active",
                    expectErrorMessage: "missing required authority allowed"
                }]
            }
        ]
    }]
}