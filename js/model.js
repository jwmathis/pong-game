export const gameState = {
    gameBoardWidth: 0,
    gameBoardHeight: 0,
    playerScore: 0,
    computerScore: 0,
    ball: {
        x: 0,
        y: 0,
        radius: 8,
        dx: 0,
        dy: 0,
        speed: 5,
    },
    playerPaddle: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        speed: 3,
    },
    computerPaddle: {
        x: 0,
        y: 0,
        width: 16,
        height: 96,
        speed: 3,
    },
};

export function initGame(boardWidth, boardHeight) {
    gameState.gameBoardWidth = boardWidth;
    gameState.gameBoardHeight = boardHeight;
}

export function resetBall() {
    gameState.ball.x = gameState.gameBoardWidth / 2;
    gameState.ball.y = gameState.gameBoardHeight / 2;
    gameState.ball.dx = Math.random() > 0.5 ? gameState.ball.speed : -gameState.ball.speed;
    gameState.ball.dy = Math.random() > 0.5 ? gameState.ball.speed : -gameState.ball.speed;
}

export function updateState() {
    // Move the ball
    gameState.ball.x += gameState.ball.dx;
    gameState.ball.y += gameState.ball.dy;

    // Computer AI
    const computerCenter = gameState.computerPaddle.y + gameState.computerPaddle.height / 2;
    if (computerCenter < gameState.ball.y) {
        gameState.computerPaddle.y += gameState.computerPaddle.speed;
    } else if (computerCenter > gameState.ball.y) {
        gameState.computerPaddle.y -= gameState.computerPaddle.speed;
    }

    // Collision with top/bottom walls
    if (gameState.ball.y - gameState.ball.radius < 0 || gameState.ball.y + gameState.ball.radius > gameState.gameBoardHeight) {
        gameState.ball.dy *= -1;
    }

    // Collision with paddles
    const playerPaddleHit = gameState.ball.x - gameState.ball.radius < gameState.playerPaddle.x + gameState.playerPaddle.width &&
        gameState.ball.y + gameState.ball.radius > gameState.playerPaddle.y &&
        gameState.ball.y - gameState.ball.radius < gameState.playerPaddle.y + gameState.playerPaddle.height;

    const computerPaddleHit = gameState.ball.x - gameState.ball.radius < gameState.computerPaddle.x + gameState.computerPaddle.width &&
        gameState.ball.y + gameState.ball.radius > gameState.computerPaddle.y &&
        gameState.ball.y - gameState.ball.radius < gameState.computerPaddle.y + gameState.computerPaddle.height;

    if (playerPaddleHit || computerPaddleHit) {
        gameState.ball.dx *= -1;
        gameState.ball.speed += 0.5; // increase the speed on hit
    }

    // Score
    if (gameState.ball.x < 0) {
        gameState.computerScore++;
        resetBall();
    } else if (gameState.ball.x > gameState.gameBoardWidth) {
        gameState.playerScore++;
        resetBall();
    }
}