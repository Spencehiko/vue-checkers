import { defineStore } from "pinia";

export const useCheckerStore = defineStore({
    id: "checker",
    state: () => ({
        gameBoard: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ] as number[][],
        gameTurn: 1 as 1 | 0 | -1,
        selectedPiece: [-1, -1] as [number, number],
        possibleMoves: [] as any,
    }),
    actions: {
        playMove(oldIndex: [number, number], newIndex: [number, number]) {
            for (let move of this.possibleMoves) {
                if (this.gameBoard[move[0]][move[1]] === 10) {
                    this.gameBoard[move[0]][move[1]] = 0;
                }
            }
            this.gameBoard[oldIndex[0]][oldIndex[1]] = 0;
            this.gameBoard[newIndex[0]][newIndex[1]] = this.gameTurn;
            this.gameTurn *= -1;
            this.selectedPiece = [-1, -1];
            this.possibleMoves = [];
        },
        checkGameEnd() {
            const { gameBoard, gameTurn } = this;
            const checkerCount = (board: number[][], turn: number) => {
                let count = 0;
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (board[i][j] === turn) {
                            count++;
                        }
                    }
                }
                return count;
            };
            const count = checkerCount(gameBoard, gameTurn);
            if (count === 0) {
                this.gameTurn = 0;
            }
        },
        selectPiece(pieceIndex: [number, number]) {
            if (
                this.gameBoard[pieceIndex[0]][pieceIndex[1]] === this.gameTurn
            ) {
                this.selectedPiece = pieceIndex;
                this.getPossibleMoves();
            } else if (this.gameBoard[pieceIndex[0]][pieceIndex[1]] === 10) {
                this.playMove(this.selectedPiece, pieceIndex);
            }
        },
        getPossibleMoves() {
            const { gameBoard, selectedPiece, gameTurn } = this;
            for (let move of this.possibleMoves) {
                if (gameBoard[move[0]][move[1]] === 10) {
                    gameBoard[move[0]][move[1]] = 0;
                }
            }
            this.possibleMoves = [];
            const row = selectedPiece[0];
            const column = selectedPiece[1];
            const allPossibleMoves = [
                [row, column - gameTurn],
                [row, column + gameTurn],
                [row - gameTurn, column],
            ];
            for (let move of allPossibleMoves) {
                if (gameBoard[move[0]][move[1]] === 0) {
                    gameBoard[move[0]][move[1]] = 10;
                    this.possibleMoves.push(move);
                }
            }
        },
    },
    getters: {},
});
