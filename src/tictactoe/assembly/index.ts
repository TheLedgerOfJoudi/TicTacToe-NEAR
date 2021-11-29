import { context, ContractPromiseBatch, u128 } from "near-sdk-core";
import { TicTacToe, games, GameState } from "./models";

export function createGame(): u32 {
    const game = new TicTacToe();
    games.set(game.gameId, game);
    return game.gameId;
}

export function joinGame(gameId : u32): string{
    assert(games.contains(gameId), "This game does not exist");
    let game = games.getSome(gameId);
    assert(game.player2=="", "This game already has two players"); 
    assert(game.player1!=context.sender, "You cannot play with yourself!");
    game.player2 = context.sender;
    game.amount2 = context.attachedDeposit;
    game.gameState = GameState.InProgress;
    games.set(gameId,game);
    return "Joined!";
} 

export function play(gameId:u32, row:u32,col:u32) : boolean{
    assert(row >=0 && row<3 && col>=0 && col<3, "Please enter a valid cell");
    assert(games.contains(gameId), "This game does not exist");
    let game = games.getSome(gameId);
    assert(game.gameState==GameState.InProgress, "This game is not on progress");
    //kAMMIL MIN HAWN
    return true;
}

    export function finishGame(gameId:u32) : boolean{
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