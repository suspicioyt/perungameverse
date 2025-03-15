const gameArea = document.getElementById('gameArea');
const glove = document.getElementById('glove');
const scoreboard = document.getElementById('scoreboard');
const timerDisplay = document.getElementById('timer');
const expansionItem = document.getElementById('expansionItem');
const gameWidth = gameArea.clientWidth;
const gameHeight = gameArea.clientHeight;

const game = {
    score: 0,
    timeLeft: 30,
    gloveSize: 50,
    snowflakes: [],
    icicles: [],
    glovePositionX: (gameWidth - 50) / 2,
    gloveSpeed: 20,
    gloveWidth: 50,
    gameInterval: null,
    snowflakeInterval: null,
    expansionItemInterval: null
};

function updateScoreboard() {
    const perunPLN = (game.score * 0.01).toFixed(2);
    scoreboard.textContent = `Wynik: ${game.score} (${perunPLN} perunPLN)`;
    timerDisplay.textContent = `Czas: ${game.timeLeft}s`;
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * (gameWidth - 20) + 'px';
    snowflake.style.top = '-20px';
    gameArea.appendChild(snowflake);
    game.snowflakes.push(snowflake);
}

function createIcicle() {
    const icicle = document.createElement('div');
    icicle.classList.add('icicle');
    icicle.style.left = Math.random() * (gameWidth - 10) + 'px';
    icicle.style.top = '-40px';
    gameArea.appendChild(icicle);
    game.icicles.push(icicle);
}

function moveGlove(event) {
    if (event.key === 'ArrowLeft' && game.glovePositionX > 0) {
        game.glovePositionX -= game.gloveSpeed;
    } else if (event.key === 'ArrowRight' && game.glovePositionX < gameWidth - game.gloveWidth) {
        game.glovePositionX += game.gloveSpeed;
    }
    glove.style.left = game.glovePositionX + 'px';
}

function activateExpansionItem() {
    expansionItem.style.left = Math.random() * (gameWidth - 30) + 'px';
    expansionItem.style.top = '-30px';
    expansionItem.style.display = 'block';

    let itemPosition = -30;
    let fallSpeed = 4;

    function fall() {
        itemPosition += fallSpeed;
        expansionItem.style.top = itemPosition + 'px';

        if (itemPosition > gameHeight - 50) {
            const gloveRect = glove.getBoundingClientRect();
            const itemRect = expansionItem.getBoundingClientRect();

            if (itemRect.bottom >= gloveRect.top &&
                itemRect.top <= gloveRect.bottom &&
                itemRect.right >= gloveRect.left &&
                itemRect.left <= gloveRect.right) {
                    game.gloveSize += 20;
                    glove.style.width = game.gloveSize + 'px';

                    setTimeout(() => {
                        game.gloveSize -= 20;
                        glove.style.width = game.gloveSize + 'px';
                    }, 5000);
            }
            expansionItem.remove();
        }
    }
    setInterval(fall, 20);
}

function endGame() {
    // Zapisanie wyników do localStorage
    let perunPLN = parseFloat(localStorage.getItem("perunPLN")) || 0;
    perunPLN += game.score * 0.01;
    localStorage.setItem("perunPLN", perunPLN);

    // Zakończenie interwałów
    clearInterval(game.gameInterval);
    clearInterval(game.snowflakeInterval);
    clearInterval(game.expansionItemInterval);

    // Wyświetl komunikat o końcu gry
    alert(`Koniec gry! Twój wynik to: ${game.score}`);

    // Ustawienie cooldownu na 10 minut (600000 ms)
    let cooldownTime = Date.now() + 30000; // 10 minut od teraz
    localStorage.setItem("cooldownTime", cooldownTime);

    // Sprawdzenie czy gracz może ponownie rozpocząć grę
    checkCooldown();
}

function checkCooldown() {
    let cooldownTime = localStorage.getItem("cooldownTime");
    if (cooldownTime) {
        cooldownTime = parseInt(cooldownTime);
        const remainingTime = cooldownTime - Date.now();
        
        if (remainingTime > 0) {
            // Jeśli cooldown jest aktywny
            alert(`Nie możesz rozpocząć gry jeszcze przez ${Math.ceil(remainingTime / 1000)} sekund.`);
            return;
        }
    }

    // Jeśli cooldown minął lub nie istnieje
    startGame();
}

function updateFallingElements() {
    game.snowflakes.forEach((snowflake, index) => {
        let snowflakePosition = parseFloat(snowflake.style.top.replace('px', '')) + (Math.random() * 3 + 2);
        snowflake.style.top = snowflakePosition + 'px';

        if (snowflakePosition > gameHeight - 50) {
            const gloveRect = glove.getBoundingClientRect();
            const snowflakeRect = snowflake.getBoundingClientRect();

            if (
                snowflakeRect.bottom >= gloveRect.top &&
                snowflakeRect.top <= gloveRect.bottom &&
                snowflakeRect.right >= gloveRect.left &&
                snowflakeRect.left <= gloveRect.right
            ) {
                game.score++;
                updateScoreboard();
            }

            snowflake.remove();
            game.snowflakes.splice(index, 1);
        }
    });

    game.icicles.forEach((icicle, index) => {
        let iciclePosition = parseFloat(icicle.style.top.replace('px', '')) + 4; // Szybkość opadania
        icicle.style.top = iciclePosition + 'px';

        const gloveRect = glove.getBoundingClientRect();
        const icicleRect = icicle.getBoundingClientRect();

        if (
            icicleRect.bottom >= gloveRect.top &&
            icicleRect.top <= gloveRect.bottom &&
            icicleRect.right >= gloveRect.left &&
            icicleRect.left <= gloveRect.right
        ) {
            endGame();
        }

        if (iciclePosition > gameHeight) {
            icicle.remove();
            game.icicles.splice(index, 1);
        }
    });
}

function countdown() {
    if (game.timeLeft <= 0) {
        endGame();
        return;
    }
    game.timeLeft--;
    updateScoreboard();
}

function startGame() {
    // Jeśli cooldown nie minął, wyświetl komunikat i zakończ funkcję
    let cooldownTime = localStorage.getItem("cooldownTime");
    if (cooldownTime) {
        cooldownTime = parseInt(cooldownTime);
        const remainingTime = cooldownTime - Date.now();
        
        if (remainingTime > 0) {
            alert(`Nie możesz rozpocząć gry jeszcze przez ${Math.ceil(remainingTime / 1000)} sekund.`);
            return;
        }
    }

    // Rozpocznij nową grę
    game.score = 0;
    game.timeLeft = 30;
    updateScoreboard();
    game.snowflakes = [];
    game.icicles = [];
    game.glovePositionX = (gameWidth - 50) / 2;
    glove.style.left = game.glovePositionX + 'px';

    game.gameInterval = setInterval(() => {
        if (Math.random() < 0.02) {  // Tylko połowa interwałów generuje nową śnieżynkę lub sopel
            createSnowflake();
            createIcicle();
        }
        updateFallingElements();
    }, 20); 
    

    game.snowflakeInterval = setInterval(countdown, 1000);
    game.expansionItemInterval = setInterval(activateExpansionItem, 5000);
    document.addEventListener('keydown', moveGlove);
}

startGame();