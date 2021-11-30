#near call $CONTRACT createGame --accountId $CONTRACT
#near create-account p2.$CONTRACT --masterAccount $CONTRACT
#near call $CONTRACT joinGame '{"gameId": 2558303264}' --accountId $CONTRACT
#near call $CONTRACT isGameOver '{"gameId": 2558303264}' --accountId $CONTRACT
#near call $CONTRACT claimReward '{"gameId": 2558303264}' --accountId $CONTRACT
#near call $CONTRACT play '{"gameId": 2558303264, "row":0, "col":0}' --accountId $CONTRACT
#near call $CONTRACT play '{"gameId": 2558303264, "row":0, "col":0}' --accountId p2.$CONTRACT
#near call $CONTRACT getBoard '{"gameId": 2558303264}' --accountId $CONTRACT



