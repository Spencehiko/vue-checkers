<script lang="ts" setup>
import { useCheckerStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const store = useCheckerStore();
const {
    gameBoard,
    gameTurn,
    selectedPiece,
    takingPiece,
    isTakeAvailable,
    longestTakeMoves,
} = storeToRefs(store);
const { selectPiece } = store;
</script>

<template>
    <div class="pt-5 w-full">
        {{ "takingPiece" + takingPiece }}
        <br /><br />
        {{ "longestTakeMoves" + longestTakeMoves }}
        <br /><br />
        {{ isTakeAvailable }}
        <br /><br />
        {{ "takingPiece" + takingPiece }}
        <br /><br />
        <div
            class="flex flex-row justify-center items-center"
            v-for="row in 8"
            :key="row"
        >
            <div
                class="border border-primary-gray w-20 h-20 flex justify-center items-center"
                :class="{
                    'cursor-pointer':
                        gameBoard[row - 1][column - 1] === gameTurn ||
                        gameBoard[row - 1][column - 1] === 10,
                    'bg-orange-900':
                        (column + row) % 2 === 0 &&
                        gameBoard[row - 1][column - 1] !== 10 &&
                        (selectedPiece[0] !== row - 1 ||
                            selectedPiece[1] !== column - 1),
                    'bg-gray-200':
                        (column + row) % 2 === 1 &&
                        gameBoard[row - 1][column - 1] !== 10 &&
                        (selectedPiece[0] !== row - 1 ||
                            selectedPiece[1] !== column - 1),
                    'bg-primary-gray':
                        selectedPiece[0] === row - 1 &&
                        selectedPiece[1] === column - 1,
                    'bg-green-700': gameBoard[row - 1][column - 1] === 10,
                }"
                v-for="column in 8"
                :key="column"
                @click="selectPiece([row - 1, column - 1])"
            >
                <div class="p-1">
                    <img
                        v-if="gameBoard[row - 1][column - 1] === 1"
                        src="blue.png"
                    />
                    <img
                        v-if="gameBoard[row - 1][column - 1] === -1"
                        src="red.png"
                    />
                    <img
                        v-if="gameBoard[row - 1][column - 1] === 2"
                        src="blue-king.png"
                    />
                    <img
                        v-if="gameBoard[row - 1][column - 1] === -2"
                        src="red-king.png"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
