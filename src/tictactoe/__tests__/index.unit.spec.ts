import * as contract from "../assembly";
import { VMContext } from "near-sdk-as";
describe("Voting contract", () => {

  it("adds a proposal", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    const added = contract.addProposal("proposal");
    expect(added).toBeTruthy();
  })

  it("creates a voter", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    const created = contract.createVoter();
    expect(created).toBeTruthy();
  })

  it("allows users to vote", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    contract.addProposal("proposal");
    contract.createVoter();
    const voted = contract.vote("proposal");
    expect(voted).toBeTruthy();
  })

  it("prohibits revoting", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    contract.addProposal("proposal");
    contract.createVoter();
    contract.vote("proposal");
    const voted = contract.vote("proposal");
    expect(voted).toBeFalsy();
  })

  it("gets the winning proposal", () => {
    VMContext.setSigner_account_id(process.env.get("user1"));
    contract.addProposal("proposal");
    contract.createVoter();
    contract.vote("proposal");
    const winningProposal = contract.getWinningProposal();
    expect(winningProposal).toBe("proposal");
  })

})
