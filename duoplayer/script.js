const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player1 = { x: 50, y: 50, width: 40, height: 40, color: 'blue', score: 0 };
const player2 = { x: 150, y: 50, width: 40, height: 40, color: 'red', score: 0 };
const diamonds = [];
const obstacles = [];
let wins1 = 0;
let wins2 = 0;
let scoreDisplay = document.getElementById('score');
let winDisplay = document.getElementById('wins');

function createDiamonds() {
    for (let i = 0; i < 5; i++) {
        diamonds.push({
            x: Math.random() * (canvas.width - 30),
            y: Math.random() * (canvas.height - 30),
            width: 30,
            height: 30
        });
    }
}

function createObstacles() {
    for (let i = 0; i < 5; i++) {
        obstacles.push({
            x: Math.random() * (canvas.width - 60),
            y: Math.random() * (canvas.height - 60),
            width: 60,
            height: 60
        });
    }
}

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawDiamonds() {
    ctx.fillStyle = 'gold';
    diamonds.forEach(diamond => {
        ctx.fillRect(diamond.x, diamond.y, diamond.width, diamond.height);
    });
}

function drawObstacles() {
    ctx.fillStyle = 'black';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function collectDiamonds(player) {
    diamonds.forEach((diamond, index) => {
        if (checkCollision(player, diamond)) {
            diamonds.splice(index, 1);
            player.score++;
            scoreDisplay.innerText = `Punkty: ${player1.score + player2.score}`;
            if (diamonds.length === 0) {
                if (player === player1) {
                    wins1++;
                } else {
                    wins2++;
                }
                winDisplay.innerText = `Wygrane: ${wins1} : ${wins2}`;
                resetGame();
            }
        }
    });
}

function resetGame() {
    diamonds.length = 0;
    createDiamonds();
    createObstacles();
}

function handleKeyDown(event) {
    const speed = 5;
    switch(event.key) {
        case 'w':
            if (player1.y > 0) player1.y -= speed;
            break;
        case 's':
            if (player1.y < canvas.height - player1.height) player1.y += speed;
            break;
        case 'a':
            if (player1.x > 0) player1.x -= speed;
            break;
        case 'd':
            if (player1.x < canvas.width - player1.width) player1.x += speed;
            break;
        case 'ArrowUp':
            if (player2.y > 0) player2.y -= speed;
            break;
        case 'ArrowDown':
            if (player2.y < canvas.height - player2.height) player2.y += speed;
            break;
        case 'ArrowLeft':
            if (player2.x > 0) player2.x -= speed;
            break;
        case 'ArrowRight':
            if (player2.x < canvas.width - player2.width) player2.x += speed;
            break;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDiamonds();
    drawObstacles();
    drawPlayer(player1);
    drawPlayer(player2);
    collectDiamonds(player1);
    collectDiamonds(player2);
    requestAnimationFrame(update);
}

document.getElementById('reset').addEventListener('click', () => {
    wins1 = 0;
    wins2 = 0;
    scoreDisplay.innerText = `Punkty: 0`;
    winDisplay.innerText = `Wygrane: 0`;
    resetGame();
});

document.addEventListener('keydown', handleKeyDown);
createDiamonds();
createObstacles();
update();
