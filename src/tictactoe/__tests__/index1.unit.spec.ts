import { addProposal } from "../assembly";
import { VMContext } from "near-sdk-as";
describe("addProposal", () => {
  it("adds a proposal", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    const added = addProposal("proposal");
    expect(added).toBeTruthy();
  })
})
