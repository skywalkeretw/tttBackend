import {games, userConnections} from "../game.ts";


const makeMove = (dataObj: any, uid:string) => {
    if (games.has(dataObj.gameId)) {
        let game = games.get(dataObj.gameId);
        // @ts-ignore
        if (game.playero !== "" && game.playero !== "") {

            // @ts-ignore
            let playerIsX: boolean
            // @ts-ignore
            playerIsX = game.playerx === uid;
            // @ts-ignore
            if (playerIsX && game.gameData.xIsNext || !playerIsX && !game.gameData.xIsNext) {
                // @ts-ignore
                if (game.gameData.winner == null) {
                    // @ts-ignore
                    if (!game.gameData.squares[dataObj.move]) {
                        // @ts-ignore
                        game.gameData.squares.splice(dataObj.move, 1, game.gameData.xIsNext ? 'X' : 'O');
                        // @ts-ignore
                        game.gameData.xIsNext = !game.gameData.xIsNext;
                        // @ts-ignore
                        game.gameData.moveCounter++
                    }
                    // @ts-ignore
                    let winnnerData = calculateWinner(game.gameData.squares, dataObj.move);
                    // @ts-ignore
                    game.gameData.winner = winnnerData.winner
                    // @ts-ignore
                    game.gameData.squares = winnnerData.squares
                    // @ts-ignore
                    if (game.gameData.winner){
                        // @ts-ignore
                        if (game.gameData.winner === 'd') {
                            // @ts-ignore
                            game.gameData.score.draw++
                        } else {
                            // @ts-ignore
                            game.gameData.winner == 'X' ? game.gameData.score.x++ :  game.gameData.score.o++;
                        }
                    }
                }

                // @ts-ignore
                const xid = game.playerx
                if(userConnections.has(xid)){
                    // @ts-ignore
                    userConnections.get(xid).ws.send(JSON.stringify({action: "move",  data: games.get(dataObj.gameId)}))
                }
                // @ts-ignore
                const oid = game.playero
                if(userConnections.has(oid)){
                    // @ts-ignore
                    userConnections.get(oid).ws.send(JSON.stringify({action: "move",  data: games.get(dataObj.gameId)}))
                }
            }
        }
    }
}

   function calculateWinner(squares: [], moveCounter: number) {
       const lines = [
           [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           [0, 4, 8],
           [2, 4, 6]
       ];
       for (let i = 0; i < lines.length; i++) {
           const [a, b, c] = lines[i];
           if (
               squares[a] &&
               squares[a] === squares[b] &&
               squares[a] === squares[c]
           ) {
               return {winner: squares[a], squares: squares};
           }
       }
       if (moveCounter === 9 ){
           return {winner: 'd', squares: squares}
       }
       // @ts-ignore
       return {winner: null, squares: squares};
   }

export {makeMove}
