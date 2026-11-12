// import data
const startPage = document.getElementById("startPage");
const startButton = document.getElementById("startBtn");
const controls = document.getElementById("controls");
const gamePage = document.getElementById("gamePage");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

startButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    controls.classList.add("show");
    gamePage.classList.add("show");
})


