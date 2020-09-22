import {userConnections, games} from "../game.ts";
import {game} from "../gameInterface.ts";

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

export { returnActiveGames}
