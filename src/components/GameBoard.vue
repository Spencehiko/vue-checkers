<script lang="ts" setup>
import { useCheckerStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const store = useCheckerStore();
const { gameBoard, gameTurn, selectedPiece, possibleMoves } =
    storeToRefs(store);
const { checkGameEnd, playMove, selectPiece } = store;
</script>

<template>
    <div class="pt-5 w-full">
        {{ possibleMoves }}
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
                    'bg-primary-gray':
                        selectedPiece[0] === row - 1 &&
                        selectedPiece[1] === column - 1,
                    'bg-green-900': gameBoard[row - 1][column - 1] === 10,
                }"
                v-for="column in 8"
                :key="column"
                @click="selectPiece([row - 1, column - 1])"
            >
                <div>
                    {{ gameBoard[row - 1][column - 1] }}
                </div>
            </div>
        </div>
    </div>
</template>
