import { vote, addProposal, createVoter } from "../assembly";
import { VMContext } from "near-sdk-as";
describe("revoting", () => {
  it("prohibits revoting", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    addProposal("proposal");
    createVoter();
    vote("proposal");
    const voted = vote("proposal");
    expect(voted).toBeFalsy();
  })

})
