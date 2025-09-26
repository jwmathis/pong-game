import { gameState, initGame, updateState } from './model.js';
import {elements, render, initializeView} from "./view.js";

let animationFrameId;

export function startGame() {
    const { boardWidth, boardHeight } = initializeView();
    initGame(boardWidth, boardHeight);
    gameState.computerPaddle.x = boardWidth - gameState.computerPaddle.width - 10;
    gameLoop();
}

function gameLoop() {
    updateState();
    render(gameState);
    animationFrameId = requestAnimationFrame(gameLoop);
}

export function handlePlayerInput(event) {
    const paddleSpeed = 7;
    if (event.key === 'w' || event.key === 'W') {
        gameState.playerPaddle.y = Math.max(0, gameState.playerPaddle.y - paddleSpeed);
    }
    if (event.key === 's' || event.key === 'S') {
        gameState.playerPaddle.y = Math.min(gameState.gameBoardHeight - gameState.playerPaddle.height, gameState.playerPaddle.y + paddleSpeed);
    }
}