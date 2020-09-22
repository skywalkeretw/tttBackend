import { WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import {createGame} from "./functions/createGame.ts";
import {joinGame} from "./functions/joinGame.ts";
import {newGame} from "./functions/newGame.ts";
import {makeMove} from "./functions/makeMove.ts";
import {game} from "./gameInterface.ts";
import {closedWebSocketHandler} from "./functions/closed.ts";
import {leaveGame} from "./functions/leaveGame.ts";
import {returnActiveGames} from "./functions/returnActiveGames.ts";



let userConnections = new Map<string, {ws:WebSocket, gameID: string}>();
let games = new Map<string, game>()


const gameConnection = async (ws: WebSocket) => {
    // add new ws connection to map
    const uid = v4.generate();
    userConnections.set(uid, {ws:ws, gameID: ""});

    // listen for websocket events
    for await (const ev of ws) {
        // delete socket if connection closed
        if (isWebSocketCloseEvent(ev)) {
            closedWebSocketHandler(uid)
        }

        // create ev object if ev is string
        if (typeof ev === 'string') {
            let evObj = JSON.parse(ev.toString());

            switch (evObj.action) {
                case "getGames":
                    returnActiveGames()
                    break;
                case "createGame":
                    createGame(evObj.data, uid)
                    break;
                case "joinGame":
                    joinGame(evObj.data, uid)
                    break;
                case "newGame":
                    newGame(evObj.data, uid)
                    break;
                case "makeMove":
                    makeMove(evObj.data, uid)
                    break;
                case "leaveGame":
                    leaveGame(uid)

            }
        } else {
            returnActiveGames()
        }

    }

};


export { gameConnection, games, userConnections };
