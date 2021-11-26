//A simple voting contract
import { context, PersistentMap, PersistentVector } from "near-sdk-as";


@nearBindgen
export class Voter {
    voted: boolean;  // if true, that person already voted 
    vote: string;   // name of the voted proposal

    constructor() {
        this.voted = false;
        this.vote = "None";
    }
}


export const voters = new PersistentMap<string, Voter>("t");
export const proposalVotes = new PersistentMap<string, u32>("v");
export const proposals = new PersistentVector<string>("p");


export function addProposal(proposal: string): boolean {
    if (proposal != "None") {
        proposals.push(proposal);
        proposalVotes.set(proposal, 0);
        return true;
    }
    return false;
}

export function createVoter(): boolean {
    const voted = voters.get(context.sender);
    if (!voted) {
        const voterNew = new Voter();
        voterNew.vote = "None";
        voterNew.voted = false;
        voters.set(context.sender, voterNew);
        return true;
    }
    return false;
}

//Vote for a proposal of your choice
export function vote(proposalName: string): boolean {
    const voter = voters.getSome(context.sender);
    let proposal = proposalVotes.getSome(proposalName);
    if (voter.voted) {
        return false;
    }
    else {
        voter.vote = proposalName;
        voter.voted = true;
        proposal = proposal + 1;
        proposalVotes.set(proposalName, proposal);
        voters.set(context.sender, voter);
        return true;
    }
}

//Get the winning proposal
export function getWinningProposal(): string {
    let winningProposal = "None";
    let highestVote: u32 = 0;
    for (let i = 0; i < proposals.length; i++) {
        let proposalVote = proposalVotes.getSome(proposals[i]);
        if (proposalVote > highestVote) {
            highestVote = proposalVote;
            winningProposal = proposals[i];
        }
    }
    return winningProposal
}