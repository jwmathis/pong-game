// --- 3. CONTROLLER (Input and Game Loop) ---
import { gameState, updateState, initGame, resetGame} from './model.js';
import { render, handleResize} from "./view.js";

let animationFrameId;

/**
 * The main game loop driven by requestAnimationFrame.
 */
function updateDifficultyDisplay(label) {
    const displayElement = document.getElementById('difficultyDisplay');
    if (displayElement) {
        displayElement.textContent = `Difficulty: ${label}`;
    }
}
function gameLoop() {
    if (!gameState.paused) {
        updateState();
    }
    render();
    animationFrameId = requestAnimationFrame(gameLoop);
}

/**
 * Sets up the canvas context and game state before starting the loop.
 */
export function startGame() {
    const canvas = document.getElementById('pongCanvas');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    // Initialize global canvas references
    gameState.canvas = canvas;
    gameState.ctx = canvas.getContext('2d');

    // Get initial dimensions from the view and initialize model
    const { width, height } = handleResize();
    initGame(width, height);

    // Update difficulty label on load
    updateDifficultyDisplay(gameState.currentDifficultyLabel);

    // Start the game loop
    gameLoop();
}


/**
 * Handles keyboard input for moving the player paddle and pausing.
 */
export function handlePlayerInput(event) {
    if (event.key === 'w' || event.key === 'W' || event.key ==="ArrowUp") {
        // Move up, but clamp at 0
        gameState.playerPaddle.y = Math.max(0, gameState.playerPaddle.y - gameState.playerPaddle.speed);
    }
    if (event.key === 's' || event.key === 'S' || event.key ==="ArrowDown") {
        // Move down, but clamp at bottom edge
        const maxY = gameState.gameBoardHeight - gameState.playerPaddle.height;
        gameState.playerPaddle.y = Math.min(maxY, gameState.playerPaddle.y + gameState.playerPaddle.speed);
    }
    if (event.key === 'p' || event.key === 'P') {
        gameState.paused = !gameState.paused;
        if (!gameState.paused) {
            // If unpausing, restart the loop
            cancelAnimationFrame(animationFrameId);
            gameLoop();
        }
    }

    if (event.key === 'r' || event.key === 'R') {
        handleResetGame();
    }
}

export function handleResetGame() {
    resetGame();

    gameState.paused = false;

    cancelAnimationFrame(animationFrameId);
    gameLoop();
    console.log('Game Loop Complete!');
}

export function setAIDifficulty(speed, label) {
    gameState.computerPaddle.speed = speed;
    gameState.currentDifficultyLabel = label; // Update model state
    updateDifficultyDisplay(label); // Update UI
    console.log(`AI Difficulty set to ${label} (Speed: ${speed})`);
}