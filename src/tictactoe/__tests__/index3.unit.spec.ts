import { vote, addProposal, createVoter } from "../assembly";
import { VMContext } from "near-sdk-as";
describe("vote", () => {
  it("allows users to vote", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    addProposal("proposal");
    createVoter();
    const voted = vote("proposal");
    expect(voted).toBeTruthy();
  })
})
