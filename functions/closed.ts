import {games, userConnections} from "../game.ts";
import {returnActiveGames} from "./returnActiveGames.ts";
import {game} from "../gameInterface.ts";
import {oLeavesGame, xLeavesGame} from "./leaveGame.ts";

function closedWebSocketHandler(uid: string) {
    // @ts-ignore
    let gid: string
    if (userConnections.has(uid)) {
        // @ts-ignore
        gid = userConnections.get(uid).gameID
    }
    // @ts-ignore
    console.log("deleteing: " + gid)
    // @ts-ignore
    gameOnConnectionDropped(uid, gid)
    userConnections.delete(uid);
    returnActiveGames()
}

function gameOnConnectionDropped(uid: string, gid: string) {
    // check if there is even a game to delete
    if (gid !== "") {
        let game: game
        if (games.has(gid)) {
            // @ts-ignore
            game = games.get(gid)
        }


        // delete Game if only one User
        // @ts-ignore
        if ((uid === game.playerx) && (game.playero === "")) {
            // @ts-ignore
            console.log("game: " + game.gameId + "has been deleted")
            games.delete(gid)
        } else {
            // @ts-ignore
            xLeavesGame(uid, game)
            // @ts-ignore
            oLeavesGame(uid, game)
        }
    }
}

export {closedWebSocketHandler}
