import { context, ContractPromiseBatch, u128 } from "near-sdk-core";
import { Game, games, GameState } from "./models";

export function createGame(): u32 {
    const game = new Game();
    games.set(game.gameId, game);
    return game.gameId;
}

export function joinGame(gameId: u32): string {
    assert(games.contains(gameId), "This game does not exist");
    let game = games.getSome(gameId);
    assert(game.player2 == "", "This game already has two players");
    assert(game.player1 != context.sender, "You cannot play with yourself!");
    game.player2 = context.sender;
    game.amount2 = context.attachedDeposit;
    game.gameState = GameState.InProgress;
    games.set(gameId, game);
    return "Joined!";
}

export function play(gameId: u32, row: u32, col: u32): boolean {
    assert(row >= 0 && row < 3 && col >= 0 && col < 3, "Please enter a valid cell");
    assert(games.contains(gameId), "This game does not exist");
    let game = games.getSome(gameId);
    assert(context.sender == game.player1 || context.sender == game.player2, "You are not a player!")
    assert(game.nextPlayer == context.sender, "It is not your turn!");
    assert(game.gameState == GameState.InProgress, "This game is not on progress");
    let chosen_row = game.board[row];
    if (context.sender == game.player1) {
        chosen_row.data[col] = 1;
        game.board[row] = chosen_row;
        game.nextPlayer = game.player2;
    }
    else {
        chosen_row.data[col] = 2;
        game.board[row] = chosen_row;
        game.nextPlayer = game.player1;
    }
    let gameIsOver = isGameOver(game.gameId);
    if (gameIsOver) {
        game.winner = context.sender;
        game.gameState = GameState.Completed;
    }
    games.set(game.gameId, game);
    return true;
}

export function isGameOver(gameId: u32): boolean {

    return true;
}
export function claimReward(gameId: u32): boolean {
    assert(games.contains(gameId), "This game does not exist");
    let game = games.getSome(gameId);
    assert(game.gameState = GameState.Completed, "The game is not over yet!");
    assert(context.sender == game.winner, "Only the winner can claim the reward");
    const to_winner = ContractPromiseBatch.create(context.sender);
    const reward = u128.add(game.amount1, game.amount2);
    to_winner.transfer(reward);
    games.set(gameId, game);
    return true;
}