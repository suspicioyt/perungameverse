const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const maxPlatforms = 10; // Liczba platform
const platformSpacing = 200; // Odległość między platformami na osi X
const jumpStrength = -15; // Maksymalny skok gracza
const gravity = 0.5;
const speed = 5;

let playerPosition = { top: 0, left: 0 };
let velocity = { x: 0, y: 0 };
let isOnGround = false;
const platforms = [];

// Rozmiary kontenera gry
const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

// Generowanie platform
function generatePlatforms() {
    let lastTop = gameHeight - 100; // Wysokość pierwszej platformy

    for (let i = 0; i < maxPlatforms; i++) {
        const platform = document.createElement("div");
        platform.classList.add("platform");

        // Pozycja platformy na osi X
        const left = i * platformSpacing;

        // Losowa wysokość platformy
        const maxJumpHeight = Math.abs(jumpStrength * 10);
        const top = Math.min(
            Math.max(lastTop - Math.random() * maxJumpHeight, 50),
            gameHeight - 100
        );

        platform.style.width = "150px";
        platform.style.left = `${left}px`;
        platform.style.top = `${top}px`;

        gameContainer.appendChild(platform);
        platforms.push(platform);

        lastTop = top; // Ustaw nową wysokość dla kolejnej platformy
    }

    // Ustaw cel na ostatniej platformie
    const lastPlatform = platforms[platforms.length - 1];
    const goalLeft = parseInt(lastPlatform.style.left) + 50;
    const goalTop = parseInt(lastPlatform.style.top) - 30;

    goal.style.left = `${goalLeft}px`;
    goal.style.top = `${goalTop}px`;
}

// Funkcja sprawdzająca kolizje
function isColliding(player, platform) {
    const playerRect = {
        top: player.top,
        bottom: player.top + 20,
        left: player.left,
        right: player.left + 20,
    };

    const platformRect = {
        top: parseInt(platform.style.top),
        bottom: parseInt(platform.style.top) + 20,
        left: parseInt(platform.style.left),
        right: parseInt(platform.style.left) + 150,
    };

    return (
        playerRect.bottom >= platformRect.top &&
        playerRect.top <= platformRect.bottom &&
        playerRect.right >= platformRect.left &&
        playerRect.left <= platformRect.right
    );
}

// Sterowanie graczem
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") velocity.x = speed;
    if (e.key === "ArrowLeft") velocity.x = -speed;
    if (e.key === "ArrowUp" && isOnGround) velocity.y = jumpStrength;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") velocity.x = 0;
});

// Główna pętla gry
function gameLoop() {
    // Grawitacja
    velocity.y += gravity;
    playerPosition.top += velocity.y;
    playerPosition.left += velocity.x;

    // Kolizje z platformami
    isOnGround = false;
    platforms.forEach((platform) => {
        if (isColliding(playerPosition, platform)) {
            if (velocity.y > 0) {
                playerPosition.top = parseInt(platform.style.top) - 20; // Ustaw gracza na platformie
                velocity.y = 0;
                isOnGround = true;
            }
        }
    });

    // Ograniczenia pola gry
    if (playerPosition.top > gameHeight - 20) {
        playerPosition.top = gameHeight - 20;
        velocity.y = 0;
        isOnGround = true;
    }

    if (playerPosition.left < 0) playerPosition.left = 0;

    // Sprawdzenie wygranej
    const goalRect = {
        top: parseInt(goal.style.top),
        left: parseInt(goal.style.left),
        bottom: parseInt(goal.style.top) + 20,
        right: parseInt(goal.style.left) + 50,
    };

    if (
        playerPosition.top + 20 >= goalRect.top &&
        playerPosition.top <= goalRect.bottom &&
        playerPosition.left + 20 >= goalRect.left &&
        playerPosition.left <= goalRect.right
    ) {
        document.getElementById("status").textContent = "You win!";
        return; // Zatrzymanie gry
    }

    // Aktualizacja pozycji gracza
    player.style.top = `${playerPosition.top}px`;
    player.style.left = `${playerPosition.left}px`;

    requestAnimationFrame(gameLoop);
}

// Inicjalizacja
function initGame() {
    playerPosition = { top: gameHeight - 120, left: 50 }; // Początkowa pozycja gracza
    player.style.top = `${playerPosition.top}px`;
    player.style.left = `${playerPosition.left}px`;

    generatePlatforms();
    gameLoop();
}

initGame();
