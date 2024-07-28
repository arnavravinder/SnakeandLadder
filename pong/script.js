const gameArea = document.getElementById('game-area');
const player1Paddle = document.getElementById('player1-paddle');
const player2Paddle = document.getElementById('player2-paddle');
const ball = document.getElementById('ball');
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

const gameAreaWidth = gameArea.clientWidth;
const gameAreaHeight = gameArea.clientHeight;
const paddleHeight = player1Paddle.clientHeight;
const ballDiameter = ball.clientWidth;

let player1Score = 0;
let player2Score = 0;
let ballX = gameAreaWidth / 2 - ballDiameter / 2;
let ballY = gameAreaHeight / 2 - ballDiameter / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let player1Y = gameAreaHeight / 2 - paddleHeight / 2;
let player2Y = gameAreaHeight / 2 - paddleHeight / 2;
let isGameRunning = false;
let player1Direction = 0;
let player2Direction = 0;
let player2MovementInterval;

startButton.addEventListener('click', () => {
    if (!isGameRunning) {
        isGameRunning = true;
        player2MovementInterval = setInterval(movePlayer2Paddle, 50);
        updateGame();
    }
});

resetButton.addEventListener('click', resetGame);

window.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        player1Direction = -1;
    } else if (event.key === 's') {
        player1Direction = 1;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 's') {
        player1Direction = 0;
    }
});

function updateGame() {
    if (!isGameRunning) return;

    movePaddle(player1Paddle, player1Direction, player1Y);
    moveBall();
    detectCollision();

    requestAnimationFrame(updateGame);
}

function movePaddle(paddle, direction, y) {
    y += direction * 10;
    y = Math.max(0, Math.min(gameAreaHeight - paddleHeight, y));
    paddle.style.top = `${y}px`;

    if (paddle === player1Paddle) {
        player1Y = y;
    } else {
        player2Y = y;
    }
}

function movePlayer2Paddle() {
    const paddleCenter = player2Y + paddleHeight / 2;
    const ballCenter = ballY + ballDiameter / 2;

    if (ballCenter < paddleCenter) {
        player2Direction = -1;
    } else if (ballCenter > paddleCenter) {
        player2Direction = 1;
    } else {
        player2Direction = 0;
    }

    movePaddle(player2Paddle, player2Direction, player2Y);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= gameAreaHeight - ballDiameter) {
        ballSpeedY *= -1;
    }

    if (ballX <= 0) {
        player2Score++;
        updateScore();
        resetBall();
    } else if (ballX >= gameAreaWidth - ballDiameter) {
        player1Score++;
        updateScore();
        resetBall();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function detectCollision() {
    if (
        ballX <= player1Paddle.clientWidth &&
        ballY >= player1Y &&
        ballY <= player1Y + paddleHeight
    ) {
        ballSpeedX *= -1;
        ballX = player1Paddle.clientWidth;
    }

    if (
        ballX >= gameAreaWidth - player2Paddle.clientWidth - ballDiameter &&
        ballY >= player2Y &&
        ballY <= player2Y + paddleHeight
    ) {
        ballSpeedX *= -1;
        ballX = gameAreaWidth - player2Paddle.clientWidth - ballDiameter;
    }
}

function resetBall() {
    ballX = gameAreaWidth / 2 - ballDiameter / 2;
    ballY = gameAreaHeight / 2 - ballDiameter / 2;
    ballSpeedX = 4;
    ballSpeedY = 4;
}

function updateScore() {
    player1ScoreElement.textContent = player1Score;
    player2ScoreElement.textContent = player2Score;
}

function resetGame() {
    isGameRunning = false;
    clearInterval(player2MovementInterval);
    player1Score = 0;
    player2Score = 0;
    updateScore();
    resetBall();
    player1Y = gameAreaHeight / 2 - paddleHeight / 2;
    player2Y = gameAreaHeight / 2 - paddleHeight / 2;
    player1Paddle.style.top = `${player1Y}px`;
    player2Paddle.style.top = `${player2Y}px`;
}
