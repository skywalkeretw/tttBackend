import {games, userConnections} from "../game.ts";


const newGame = (dataObj: any, uid:string) => {
    if (games.has(dataObj.gameId)) {
        let game = games.get(dataObj.gameId);
        // @ts-ignore
        game.gameData = startNewGame(dataObj.gameId)
        // @ts-ignore
        const xid = game.playerx
        // @ts-ignore
        const oid = game.playero
        if(userConnections.has(xid)){
            // @ts-ignore
            userConnections.get(xid).ws.send(JSON.stringify({action: "startGame",  data: games.get(dataObj.gameId)}))
        }
        if(userConnections.has(oid)){
            // @ts-ignore
            userConnections.get(oid).ws.send(JSON.stringify({action: "startGame",  data: games.get(dataObj.gameId)}))
        }
    }

}

function startNewGame(gameID: string, ) :{
    squares: any[];
    xIsNext: boolean;
    winner: string;
    moveCounter: number;
    score: {x: number, o: number, draw: number};
}{
    let data = games.get(gameID);
    let gameData = {
        squares: Array(9).fill(null),
        xIsNext: Math.random() >= 0.5,
        winner: null,
        moveCounter: 0,
        score: {
            x: 0,
            o: 0,
            draw: 0
        }
    };
    if (data !== undefined) {
        let score: {x: number, o: number, draw: number} = data.gameData.score
        gameData = {
            squares: Array(9).fill(null),
            xIsNext: Math.random() >= 0.5,
            winner: null,
            moveCounter: 0,
            score: score
        };
    }
    // @ts-ignore
    return gameData
}

export {newGame, startNewGame}
