// --- 2. VIEW (Rendering to Canvas) ---
import {gameState, CANVAS_WIDTH_RATIO, CANVAS_HEIGHT_RATIO} from "./model.js";

/**
 * Draws all game elements onto the canvas.
 */
export function render() {
    const { ctx, gameBoardWidth, gameBoardHeight, ball, playerPaddle, computerPaddle, playerScore, computerScore } = gameState;

    // 1. Clear the canvas (Draw the black background)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, gameBoardWidth, gameBoardHeight);

    // 2. Draw the dividing line (center line)
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.setLineDash([15, 10]);
    ctx.moveTo(gameBoardWidth / 2, 0);
    ctx.lineTo(gameBoardWidth / 2, gameBoardHeight);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // 3. Draw the Score
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(playerScore, gameBoardWidth / 4, 50);
    ctx.fillText(computerScore, gameBoardWidth * 3 / 4, 50);

    // 4. Draw the Paddles
    ctx.fillStyle = '#FFFFFF';
    // Player Paddle
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    // Computer Paddle
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);

    // 5. Draw the Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    // 6. Draw Pause screen
    if (gameState.paused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, gameBoardWidth, gameBoardHeight);
        ctx.fillStyle = '#fef08a'; // Tailwind yellow-200
        ctx.font = '60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', gameBoardWidth / 2, gameBoardHeight / 2);
    }
}

/**
 * Handles canvas resizing to make it fully responsive.
 */
export function handleResize() {
    const container = document.getElementById('game-container');
    const containerWidth = container.clientWidth;

    // Maintain 16:9 aspect ratio
    const newWidth = containerWidth;
    const newHeight = containerWidth * (CANVAS_HEIGHT_RATIO / CANVAS_WIDTH_RATIO);

    gameState.canvas.width = newWidth;
    gameState.canvas.height = newHeight;

    gameState.gameBoardWidth = newWidth;
    gameState.gameBoardHeight = newHeight;

    // Re-position elements based on new size (if needed, but usually not required for pong)
    // Ensure paddles are clamped within new boundaries
    gameState.playerPaddle.y = Math.min(gameState.playerPaddle.y, gameState.gameBoardHeight - gameState.playerPaddle.height);
    gameState.computerPaddle.y = Math.min(gameState.computerPaddle.y, gameState.gameBoardHeight - gameState.computerPaddle.height);

    // Re-render to update drawing size immediately
    render();

    return { width: newWidth, height: newHeight };
}