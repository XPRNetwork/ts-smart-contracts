export interface Fixtures {
    contracts: {
        name: string,
        path: string,
        sendsInline: boolean,
    }[],
    accounts: string[],
    beforeEach: {
        helper: string
    }[],
    tests: {
        description: string;
        cases: {
            title: string;
            actions: {
                contract: string;
                action: string;
                data: object | any[]
                authorization: string
                expectErrorMessage?: string
            }[],
        }[]
    }[]
}