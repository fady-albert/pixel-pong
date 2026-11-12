// import data
const startPage = document.getElementById("startPage");
const startButton = document.getElementById("startBtn");
const controls = document.getElementById("controls");
const gamePage = document.getElementById("gamePage");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

// start the game
startButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    controls.classList.add("show");
    gamePage.classList.add("show");
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
    color: "#ffffff"
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

drawGame();