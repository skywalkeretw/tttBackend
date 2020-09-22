import {games, userConnections} from "../game.ts";
import {returnActiveGames} from "./returnActiveGames.ts";
import {startNewGame} from "./newGame.ts";


const joinGame = (dataObj: any, uid:string) => {
    if (games.has(dataObj.gameId)) {
        let game = games.get(dataObj.gameId);
        // @ts-ignore
        if (game.playero === "") {
            // @ts-ignore
            game.playero = uid
            // @ts-ignore
            game.gameData = startNewGame(dataObj.gameId)
            // @ts-ignore
            const xid = game.playerx
            // @ts-ignore
            const oid = game.playero
            if(userConnections.has(uid)) {
                // @ts-ignore
                userConnections.get(uid).gameID =dataObj.gameId
            }
            if(userConnections.has(xid)){
                // @ts-ignore
                userConnections.get(xid).ws.send(JSON.stringify({action: "startGame",  data: games.get(dataObj.gameId)}))
            }
            if(userConnections.has(oid)){
                // @ts-ignore
                userConnections.get(oid).ws.send(JSON.stringify({action: "joinGame",  data: games.get(dataObj.gameId)}))
            }
            returnActiveGames()
        }
    }
}

export {joinGame}
