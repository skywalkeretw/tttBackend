import { WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import {createGame, returnActiveGames} from "./functions/createGame.ts";
import {joinGame} from "./functions/joinGame.ts";
import {newGame} from "./functions/newGame.ts";
import {makeMove} from "./functions/makeMove.ts";
import {game} from "./gameInterface.ts";
//let games: {id: string, game: game}[] =[]



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
            userConnections.delete(uid);
            let gid: string
            games.forEach((data) => {
                if(data.playerx === uid || data.playero === uid) {
                    if(data.playerx === "" || data.playero === "") {
                        games.delete(data.gameId)
                    } else {
                        if (data.playerx === uid) {
                            data.playerx = ""
                        }
                        if (data.playero === uid) {
                            data.playero = ""
                        }
                    }
                }
                    gid = data.gameId
                }
            )
            returnActiveGames()
        }

        // create ev object if ev is string
        if (typeof ev === 'string') {
            let evObj = JSON.parse(ev.toString());

            switch (evObj.action) {
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
            }
        } else {
            returnActiveGames()
        }

    }

};


export { gameConnection, games, userConnections };
