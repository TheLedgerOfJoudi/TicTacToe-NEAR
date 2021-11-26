import { createVoter } from "../assembly";
import { VMContext } from "near-sdk-as";
describe("createVote", () => {
    it("creates a voter", () => {
        VMContext.setSigner_account_id(process.env.get("user1"));
        const created = createVoter();
        expect(created).toBeTruthy();
    })
})
