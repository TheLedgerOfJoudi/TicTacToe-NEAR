import { PersistentVector, PersistentMap, u128, RNG, context } from "near-sdk-core";

export enum GameState {
    Created,
    InProgress,
    Completed
}

@nearBindgen
export class TicTacToe {
    gameId: u32;
    gameState: GameState;
    player1: string;
    player2: string;
    winner: string;
    amount1: u128;
    amount2: u128;
    roundsPlayed: u8;
    nextPlayer: string;
    board: Array<u8>;

    constructor() {
        const rng = new RNG<u32>(1, u32.MAX_VALUE);
        const roll = rng.next();
        this.gameId = roll;
        this.gameState = GameState.Created;
        this.player1 = context.sender;
        this.player2 = "";
        this.winner = "";
        this.amount1 = context.attachedDeposit;
        this.amount2 = u128.Zero;
        this.roundsPlayed = 0;
        this.nextPlayer = this.player1;
        this.board = new Array<u8>(9);
        for (let i = 0; i < 9; i++) {
            this.board[i] = 0;
        }
    }
}

export const games = new PersistentMap<u32, TicTacToe>("g");