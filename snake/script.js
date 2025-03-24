// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 20;
canvas.width = canvas.height = box * canvasSize;

let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box,
};
let score = 0;
let warning = false;

// Rysowanie obiektów
function draw() {
    // Wyczyść planszę
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rysowanie węża
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Rysowanie jedzenia
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Przesunięcie głowy
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Sprawdzenie kolizji z jedzeniem
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box,
        };
    } else {
        // Usuń ogon
        snake.pop();
    }

    // Nowa głowa
    const newHead = { x: snakeX, y: snakeY };

    // Ostrzeżenie przy kolizji ze sobą
    if (collision(newHead, snake)) {
        if (!warning) {
            alert("Ostrzeżenie! Uważaj, nie uderz w siebie.");
            warning = true;
        }
    } else {
        warning = false;
    }

    // Sprawdzenie kolizji ze ścianami i zakończenie gry
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        (collision(newHead, snake) && warning)
    ) {
        clearInterval(game);
        alert("Koniec gry! Twój wynik to: " + score);
        location.reload();
    }

    snake.unshift(newHead);

    // Aktualizacja wyniku
    document.getElementById("score").textContent = score;
}

// Funkcja sprawdzająca kolizję
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Sterowanie wężem
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Ustawienie częstotliwości gry (wolniejsza prędkość)
const game = setInterval(draw, 150);
