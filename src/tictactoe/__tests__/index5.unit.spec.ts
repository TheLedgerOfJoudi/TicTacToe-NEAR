import { getWinningProposal, addProposal, createVoter, vote } from "../assembly";
import { VMContext } from "near-sdk-as";
describe("winningProposal", () => {
  it("gets the winning proposal", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    addProposal("proposal");
    createVoter();
    vote("proposal");
    const winningProposal = getWinningProposal();
    expect(winningProposal).toBe("proposal");
  })
})
