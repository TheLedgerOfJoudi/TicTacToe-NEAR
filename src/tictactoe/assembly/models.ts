import { PersistentVector, PersistentMap, u128 } from "near-sdk-core";

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
    amount1: u128;
    amount2: u128;
    roundsPlayed: u8;
    nextPlayer: string;
    board: PersistentVector<i8>;
}

export const games = new PersistentMap("g");