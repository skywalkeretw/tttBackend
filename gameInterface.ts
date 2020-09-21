interface game {
    gameId: string,
    name: string
    playerx: string //player 1 id
    playero: string //player 2 id
    gameData: {
        squares: any[];
        xIsNext: boolean;
        winner: string;
        moveCounter: number;
        score: {x: number, o: number, draw: number};
    }
}

export {game}
