// import data
const startPage = document.getElementById("startPage");
const startButton = document.getElementById("startBtn");
const controls = document.getElementById("controls");
const gamePage = document.getElementById("gamePage");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

const winnerPage = document.getElementById("winnerPage");
const winnerText = document.getElementById("winnerText");
const restartBtn = document.getElementById("restartBtn");

let gameStarted = false;
const winningScore = 5;

// start the game
startButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    controls.classList.add("show");
    gamePage.classList.add("show");

    if(!gameStarted) {
        gameStarted = true;
        gameLoop();
    }
})

// game settings
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;

const player1 = {
    x: 20,
    y: canvasHeight / 2 - paddleHeight / 2,
    color: "#00E5FF",
};

const player2 = {
    x: canvasWidth - 20 - paddleWidth,
    y: canvasHeight / 2 - paddleHeight / 2,
    color: "#FF426D",
};

const ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    size: 12,
    color: "#ffffff",
    speedX: 4,
    speedY: 4,
};

// draw the paddles and ball
function drawPaddle(){
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);

    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = ball.color;

    ctx.fillRect(
        ball.x - ball.size / 2,
        ball.y - ball.size / 2,
        ball.size,
        ball.size
    );
}

function drawCenterLine() {
    ctx.fillStyle = "#252B45";

    for (let i = 0; i < canvasHeight; i += 25) {
        ctx.fillRect(canvasWidth / 2 - 2, i, 4, 12);
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawCenterLine();
    drawPaddle();
    drawBall();
}

// keyboard controls
const keys = {};

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    keys[key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function movePaddles() {
    const speed = 5;

    if(keys["w"]) player1.y -= speed;
    if(keys["s"]) player1.y += speed;

    if(keys["arrowup"]) player2.y -= speed;
    if(keys["arrowdown"]) player2.y += speed;

    player1.y = Math.max(0, Math.min(canvasHeight - paddleHeight, player1.y));
    player2.y = Math.max(0, Math.min(canvasHeight - paddleHeight, player2.y));
}

function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

function checkCollision() {
    if (ball.y - ball.size / 2 <= 0 || ball.y + ball.size / 2 >= canvasHeight) {
        ball.speedY *= -1;
    }
}

function checkPaddleCollision() {
    const ballTop = ball.y - ball.size / 2;
    const ballBottom = ball.y + ball.size / 2;
    const ballLeft = ball.x - ball.size / 2;
    const ballRight = ball.x + ball.size / 2;

    if(
        ballRight >= player2.x &&
        ballLeft <= player2.x + paddleWidth &&
        ballBottom >= player2.y &&
        ballTop <= player2.y + paddleHeight &&
        ball.speedX > 0
    ) {
        ball.speedX *= -1;
    }

    if(
        ballLeft <= player1.x + paddleWidth &&
        ballRight >= player1.x &&
        ballBottom >= player1.y &&
        ballTop <= player1.y + paddleHeight &&
        ball.speedX < 0
    ) {
        ball.speedX *= -1;
    }
}

function updateScore() {
    if (ball.x - ball.size / 2 <= 0) {
        score2.textContent = parseInt(score2.textContent) + 1;
        resetBall(-1);
    }
    if (ball.x + ball.size / 2 >= canvasWidth) {
        score1.textContent = parseInt(score1.textContent) + 1;
        resetBall(1);
    }
}

function resetBall(direction) {
    ball.x = canvasWidth / 2;
    ball.y = canvasHeight / 2;
    ball.speedX = 4 * direction;
    ball.speedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function gameLoop() {
    movePaddles();
    moveBall();
    checkCollision();
    checkPaddleCollision();
    updateScore();
    drawGame();

    requestAnimationFrame(gameLoop);
}