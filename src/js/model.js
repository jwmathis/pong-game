// --- 1. MODEL (Game State and Logic) ---
// Constants
import {handleResize} from "./view.js";

export const CANVAS_WIDTH_RATIO = 16;
export const CANVAS_HEIGHT_RATIO = 9;
export const DIFFICULTY = {
    EASY: 0.5,
    MEDIUM: 3.5,
    HARD: 10.0,
}
export const gameState = {
    canvas: document.getElementById('pongCanvas'),
    ctx: null,
    gameBoardWidth: 0,
    gameBoardHeight: 0,
    playerScore: 0,
    computerScore: 0,
    paused: false,
    currentDifficultyLabel: "Medium",
    ball: {
        x: 0,
        y: 0,
        radius: 8,
        dx: 0,
        dy: 0,
        speed: 5,
    },
    playerPaddle: {
        x: 10,
        y: 0,
        width: 10,
        height: 70,
        speed: 7,
    },
    computerPaddle: {
        x: 0,
        y: 0,
        width: 10,
        height: 70,
        speed: DIFFICULTY.MEDIUM, // AI Default difficulty
    },
};

/**
 * Initializes the game state, canvas context, and sets initial positions.
 */
export function initGame() {
    gameState.ctx = gameState.canvas.getContext('2d');
    handleResize(); // Set initial canvas dimensions
    gameState.playerPaddle.y = (gameState.gameBoardHeight - gameState.playerPaddle.height) / 2;
    resetBall();
    // Set computer paddle initial x position (right side)
    gameState.computerPaddle.x = gameState.gameBoardWidth - gameState.computerPaddle.width - 10;
    gameState.computerPaddle.y = (gameState.gameBoardHeight - gameState.computerPaddle.height) / 2;
}

/**
 * Resets the ball to the center with a random initial direction.
 */
export function resetBall() {
    // Set ball back in middle of board
    gameState.ball.x = gameState.gameBoardWidth / 2;
    gameState.ball.y = gameState.gameBoardHeight / 2;
    gameState.ball.speed = 5; // Reset speed

    // Random horizontal direction (left or right)
    gameState.ball.dx = (Math.random() > 0.5 ? 1 : -1) * gameState.ball.speed;

    // Random vertical direction, ensures it's not perfectly horizontal
    let angle = Math.random() * Math.PI / 3 - Math.PI / 6; // Angle between -30 and +30 degrees
    gameState.ball.dy = (Math.random() > 0.5 ? 1 : -1) * Math.sin(angle) * gameState.ball.speed;

    // Ensure ball has some vertical movement
    if (Math.abs(gameState.ball.dy) < 1) {
        gameState.ball.dy = gameState.ball.dy < 0 ? -1 : 1;
    }
}

/**
 * Handles all game logic, movement, and collision detection.
 */
export function updateState() {
    if (gameState.paused) return;

    // 1. Move the ball
    gameState.ball.x += gameState.ball.dx;
    gameState.ball.y += gameState.ball.dy;

    // 2. Computer AI Movement (simple tracking)
    const computerCenter = gameState.computerPaddle.y + gameState.computerPaddle.height / 2;
    if (computerCenter < gameState.ball.y - 10) {
        gameState.computerPaddle.y += Math.min(gameState.computerPaddle.speed, gameState.ball.y - computerCenter);
    } else if (computerCenter > gameState.ball.y + 10) {
        gameState.computerPaddle.y -= Math.min(gameState.computerPaddle.speed, computerCenter - gameState.ball.y);
    }

    // Clamp computer paddle position to stay on board
    gameState.computerPaddle.y = Math.max(0, Math.min(gameState.computerPaddle.y, gameState.gameBoardHeight - gameState.computerPaddle.height));

    // 3. Wall Collision (Top/Bottom)
    if (gameState.ball.y - gameState.ball.radius < 0 || gameState.ball.y + gameState.ball.radius > gameState.gameBoardHeight) {
        gameState.ball.dy *= -1;
    }

    // 4. Paddle Collisions
    // Function to check collision and calculate new angle/speed
    const checkCollision = (paddle, isPlayer) => {
        const paddleHit = gameState.ball.x + gameState.ball.radius > paddle.x &&
            gameState.ball.x - gameState.ball.radius < paddle.x + paddle.width &&
            gameState.ball.y + gameState.ball.radius > paddle.y &&
            gameState.ball.y - gameState.ball.radius < paddle.y + paddle.height;

        if (paddleHit) {
            // Determine collision side based on paddle position
            const isHittingPlayer = isPlayer && gameState.ball.dx < 0;
            const isHittingComputer = !isPlayer && gameState.ball.dx > 0;

            if (isHittingPlayer || isHittingComputer) {
                gameState.ball.dx *= -1; // Reverse direction
                gameState.ball.speed += 0.2; // Increase speed slightly

                // Calculate hit point relative to paddle center
                const relativeIntersectY = (paddle.y + (paddle.height / 2)) - gameState.ball.y;
                const normalizedRelativeIntersectionY = relativeIntersectY / (paddle.height / 2);
                const bounceAngle = normalizedRelativeIntersectionY * (Math.PI / 4); // Max 45 degrees

                // Update direction based on hit angle
                gameState.ball.dx = gameState.ball.speed * Math.cos(bounceAngle) * (isPlayer ? 1 : -1);
                gameState.ball.dy = gameState.ball.speed * -Math.sin(bounceAngle);
            }
        }
    };

    checkCollision(gameState.playerPaddle, true);
    checkCollision(gameState.computerPaddle, false);


    // 5. Score Update (Ball missed a paddle)
    if (gameState.ball.x < 0) {
        gameState.computerScore++;
        resetBall();
    } else if (gameState.ball.x > gameState.gameBoardWidth) {
        gameState.playerScore++;
        resetBall();
    }
}

export function resetGame() {
    gameState.playerScore = 0;
    gameState.computerScore = 0;

    initGame();
}