const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 117.5;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 3;
let playerScore = 0, aiScore = 0;

const speedIncreaseFactor = 0.1;  // Slower increase in ball speed
const winningScore = 10; // Set the score to win the game

// Load the highest score from localStorage
let highestScore = localStorage.getItem("pingPong") || 0;

document.addEventListener("mousemove", (e) => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    playerY = e.clientY - rect.top - root.scrollTop - paddleHeight / 2;
    
    // Prevent the player's paddle from going out of bounds
    if (playerY < 0) playerY = 0;
    if (playerY + paddleHeight > canvas.height) playerY = canvas.height - paddleHeight;
});

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawText(text, x, y, fontSize = 24) {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(text, x, y);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddleWidth) {
        if (ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            aiScore++;
            if (aiScore === winningScore) {
                alert("AI wins! Game Over.");
                resetGame();
            } else {
                resetBall();
            }
        }
    }

    if (ballX >= canvas.width - paddleWidth) {
        if (ballY > aiY && ballY < aiY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++;
            if (playerScore === winningScore) {
                alert("Player wins! Game Over.");
                resetGame();
            } else {
                increaseSpeed();
                resetBall();
            }
        }
    }

    // Easier AI movement (AI follows the ball more slowly)
    aiY += (ballY - (aiY + paddleHeight / 2)) * 0.05;  // Slow AI response
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5 * (ballSpeedX > 0 ? 1 : -1);
    ballSpeedY = 3 * (ballSpeedY > 0 ? 1 : -1);
}

function increaseSpeed() {
    // Increase the speed based on total score (combined player and AI score)
    let totalScore = playerScore + aiScore;
    let speedFactor = totalScore * speedIncreaseFactor;
    ballSpeedX += speedFactor * (ballSpeedX > 0 ? 1 : -1);
    ballSpeedY += speedFactor * (ballSpeedY > 0 ? 1 : -1);
}

function resetGame() {
    playerScore = 0;
    aiScore = 0;
    resetBall();
}

function drawGame() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawRect(0, playerY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "white");
    drawCircle(ballX, ballY, 10, "white");

    // Draw scores
    drawText("Gracz: " + playerScore, 50, 30);
    drawText("AI: " + aiScore, canvas.width - 120, 30);

    // Draw highest score
    drawText("Najwyższy wynik: " + highestScore, canvas.width / 2 - 100, 30);
}

function updateHighestScore() {
    if (playerScore > highestScore) {
        highestScore = playerScore;
        localStorage.setItem("pingPong", highestScore);
    }
}

function gameLoop() {
    moveBall();
    drawGame();
    updateHighestScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();
