export const elements = {
    gameBoard: document.getElementById('game-board'),
    playerPaddle: document.getElementById('player-paddle'),
    computerPaddle: document.getElementById('computer-paddle'),
    ball: document.getElementById('ball'),
    score: document.getElementById('score'),
};

export function render(gameState) {
    // Update paddle positions
    elements.playerPaddle.style.transform = `translateY(${gameState.playerPaddle.y}px)`;
    elements.computerPaddle.style.transform = `translateY(${gameState.computerPaddle.y}px)`;

    // Update ball position
    elements.ball.style.left = `${gameState.ball.x}px`;
    elements.ball.style.top = `${gameState.ball.y}px`;

    // Update score
    elements.score.textContent = `${gameState.playerScore} - ${gameState.computerScore}`;

}

export function initializeView() {
    const boardWidth = elements.gameBoard.clientWidth;
    const boardHeight = elements.gameBoard.clientHeight;
    return { boardWidth, boardHeight };
}