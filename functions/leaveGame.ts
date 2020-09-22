import {games, userConnections} from "../game.ts";
import {returnActiveGames} from "./returnActiveGames.ts";
import {game} from "../gameInterface.ts";

function leaveGame(uid: string) {
    let gid: string
    if (userConnections.has(uid)){
        // @ts-ignore
        gid = userConnections.get(uid).gameID
        let game: game
        if (games.has(gid)){
            // @ts-ignore
            game = games.get(gid)
            xLeavesGame(uid, game)
            oLeavesGame(uid, game)
        }
        // @ts-ignore
        userConnections.get(uid).ws.send(JSON.stringify({action: "leaveGame",  data:{}}))
    }
    returnActiveGames()
}

function xLeavesGame(uid: string, game: game) {
    if ((uid === game.playerx) && (game.playero !== "")) {
        // @ts-ignore
        game.playerx = game.playero
        // @ts-ignore
        game.playero = ""
        // @ts-ignore
        if(userConnections.has(game.playerx)) {
            // @ts-ignore
            userConnections.get(game.playerx).ws.send(JSON.stringify({action: "playerLeft",  data:games.get(game.gameId)}))
        }
    }
}

function oLeavesGame(uid: string, game: game) {
    if ((uid === game.playero) && (game.playerx !== "")) {
        // @ts-ignore
        game.playero = ""
        // @ts-ignore
        if(userConnections.has(game.playerx)) {
            // @ts-ignore
            userConnections.get(game.playerx).ws.send(JSON.stringify({action: "playerLeft",  data:games.get(game.gameId)}))
        }
    }
}

export {leaveGame, xLeavesGame, oLeavesGame}
