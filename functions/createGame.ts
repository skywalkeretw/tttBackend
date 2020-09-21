import { WebSocket } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import {generateName} from "../randomName.ts";
import {games, userConnections} from "../game.ts";
import {game} from "../gameInterface.ts";
import {startNewGame} from "./newGame.ts";

const createGame = (dataObj: any, uid: string) => {
    const gameId = v4.generate();
    const newGame: game = {
        gameId: gameId,
        name: generateName(),
        playerx: uid,
        playero: "",
        gameData: startNewGame(gameId)
    }
    games.set(gameId, newGame)
    returnActiveGames()
    if (userConnections.has(uid)) {
        // @ts-ignore
        userConnections.get(uid).ws.send(JSON.stringify({action: "gameCreated",  data:games.get(gameId)}))
    }
};


function returnActiveGames() {
    userConnections.forEach((data) => {
        let retGames: game[] = []
        games.forEach((gdata) => {
            if(gdata.playerx === "" || gdata.playero === "") {
                retGames.push(gdata)
            }
        })
        data.ws.send(JSON.stringify({action: "activeGames", data: retGames}));
    });
}

export {createGame, returnActiveGames}
