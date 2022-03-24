import { Fixtures } from "fixtures/fixture";

export const allowFixtures: Fixtures = {
    contracts: [{
        name: "allowed",
        path: "contracts/allow/target/allow.contract",
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
                title: "allowactor: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "allowactor",
                    data: {
                        actor: 'researcher',
                        isAllowed: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "allowactor",
                    data: {
                        actor: 'researcher',
                        isAllowed: true
                    },
                    authorization: "malicious@active",
                    expectErrorMessage: "missing required authority allowed"
                }]
            },
            {
                title: "blockactor: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "blockactor",
                    data: {
                        actor: 'malicious',
                        isBlocked: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "blockactor",
                    data: {
                        actor: 'malicious',
                        isBlocked: true
                    },
                    authorization: "malicious@active",
                    expectErrorMessage: "missing required authority allowed"
                }]
            },
            {
                title: "allowtoken: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "allowtoken",
                    data: {
                        token: { contract: 'xtokens', sym: '6,XUSDC' },
                        isAllowed: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "allowtoken",
                    data: {
                        token: { contract: 'xtokens', sym: '6,XUSDC' },
                        isAllowed: true
                    },
                    authorization: "malicious@active",
                    expectErrorMessage: "missing required authority allowed"
                }]
            },
            {
                title: "blocktoken: Only owner can call",
                actions: [{
                    contract: "allowed",
                    action: "blocktoken",
                    data: {
                        token: { contract: 'xtokens', sym: '6,XUSDC' },
                        isBlocked: true
                    },
                    authorization: "allowed@active"
                }, {
                    contract: "allowed",
                    action: "blocktoken",
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