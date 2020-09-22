import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import {game} from "../interfaces/gameInterface.ts";
import {generateName} from "./randomName.ts";
import {startNewGame} from "./newGame.ts";
import {games, userConnections} from "../game.ts";
import {returnActiveGames} from "./returnActiveGames.ts";


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
        userConnections.get(uid).gameID = gameId
        // @ts-ignore
        userConnections.get(uid).ws.send(JSON.stringify({action: "gameCreated",  data:games.get(gameId)}))
    }
};

export {createGame}
