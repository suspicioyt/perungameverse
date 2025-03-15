let isJumping = false;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0; // Pobranie najlepszego wyniku z localStorage
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const bestScoreDisplay = document.createElement("div"); // Utworzenie elementu dla najlepszego wyniku

bestScoreDisplay.classList.add("best-score"); // Dodanie klasy do elementu
bestScoreDisplay.innerText = "Najlepszy wynik: " + bestScore; // Ustawienie tekstu dla najlepszego wyniku
document.body.appendChild(bestScoreDisplay); // Dodanie elementu do DOM

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let jumpHeight = 100; // Wysokość skoku
    let currentHeight = 0;
    
    const jumpInterval = setInterval(function() {
        if (currentHeight < jumpHeight) {
            currentHeight += 10;
            dino.style.bottom = `${20 + currentHeight}px`; // Zmiana wysokości dinozaura
        } else {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(function() {
                if (currentHeight > 0) {
                    currentHeight -= 10;
                    dino.style.bottom = `${20 + currentHeight}px`;
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.x < cactusRect.x + cactusRect.width &&
        dinoRect.x + dinoRect.width > cactusRect.x &&
        dinoRect.y < cactusRect.y + cactusRect.height &&
        dinoRect.y + dinoRect.height > cactusRect.y
    ) {
        alert("Koniec gry! Twój wynik: " + score);
        resetGame();
    }
}

function resetGame() {
    if (score > bestScore) {
        bestScore = score; // Zaktualizowanie najlepszego wyniku
        localStorage.setItem("bestScore", bestScore); // Zapisanie najlepszego wyniku w localStorage
        bestScoreDisplay.innerText = "Najlepszy wynik: " + bestScore; // Aktualizacja wyświetlanego najlepszego wyniku
    }
    score = 0;
    scoreDisplay.innerText = "Wynik: " + score;
    cactus.style.animation = "none"; // Zatrzymanie kaktusa
    cactus.offsetHeight; // Trik do restartu animacji
    cactus.style.animation = ""; // Ponowne włączenie animacji
}

setInterval(function() {
    score++;
    scoreDisplay.innerText = "Wynik: " + score;
    checkCollision();
}, 100);
