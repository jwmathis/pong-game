// --- 4. Main entry point ---
import {startGame, handlePlayerInput, handleResetGame, setAIDifficulty} from './controller.js';
import { handleResize } from './view.js';
import { DIFFICULTY } from "./model.js";
import { initializeAudio } from "./audio.js";


document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', handleResetGame);
    }

    const easyButton = document.getElementById('easyButton');
    const mediumButton = document.getElementById('mediumButton');
    const hardButton = document.getElementById('hardButton');

    if (easyButton) {
        easyButton.addEventListener('click', () => setAIDifficulty(DIFFICULTY.EASY, 'Easy'));
    }
    if (mediumButton) {
        mediumButton.addEventListener('click', () => setAIDifficulty(DIFFICULTY.MEDIUM, 'Medium'));
    }
    if (hardButton) {
        hardButton.addEventListener('click', () => setAIDifficulty(DIFFICULTY.HARD, 'Hard'));
    }
    initializeAudio();
});

window.onload = () => {
    startGame();
    console.log("Pong Game Initialized and Running!");
};

// Listeners
document.addEventListener('keydown', handlePlayerInput);
window.addEventListener('resize', handleResize);
