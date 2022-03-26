import { expect } from "chai"

export const expectToThrow = async (promise: Promise<any>, errorMsg: string) => {
    try {
        await promise
        throw new Error(`Was expecting to fail with ${errorMsg}`)
    } catch (e) {
        expect(e.message).to.be.deep.eq(errorMsg)
    }
}