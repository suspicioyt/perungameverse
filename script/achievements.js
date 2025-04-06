// Statyczna tablica osiągnięć
const achievementsData = [
    {
        "id": "01",
        "name": "100 gier",
        "opis": "Zagraj we wszystkie dostępne gry w HUBIE",
        "classes": ["beta"],
        "status": ["playedGames", "gamesNumber"]
    },
    {
        "id": "02",
        "name": "Runner",
        "opis": "Zbierz 100 punktów w Dino",
        "classes": ["beta"],
        "status": ["dinoBestScore", 150]
    },
    {
        "id": "03",
        "name": "Mistrz odbijania",
        "opis": "Zbierz 10 punktów w Ping Pongu",
        "classes": ["beta"],
        "status": ["pingPong", 11]
    },
    {
        "id": "04",
        "name": "Wieże czy wierze?",
        "opis": "Zbierz 60 punktów w Flappy Bird",
        "classes": ["beta"],
        "status": ["flappyHighScore", 60]
    },
    {
        "id": "05",
        "name": "2048",
        "opis": "Zbierz 2048 punktów w 2048",
        "classes": ["beta"],
        "status": ["2048highScore", 2048]
    }
];

function getAchievements() {
    return achievementsData;
}

// Funkcja sprawdzająca ukończone osiągnięcia i zapisująca tylko ich ID
function checkCompletedAchievements() {
    const localStorageData = {};
    const completedAchievementsIds = [];

    // Zbieranie danych z localStorage
    achievementsData.forEach(achievement => {
        const storedProgress = localStorage.getItem(achievement.status[0]);
        if (storedProgress) {
            try {
                localStorageData[achievement.status[0]] = JSON.parse(storedProgress);
            } catch (e) {
                console.warn("Błąd podczas parsowania danych z localStorage:", e);
            }
        }
    });

    // Sprawdzanie ukończonych osiągnięć i zbieranie ich ID
    achievementsData.forEach(achievement => {
        let currentProgress = 0;
        if (localStorageData[achievement.status[0]]) {
            const storedData = localStorageData[achievement.status[0]];
            currentProgress = Array.isArray(storedData) ? storedData.length : storedData;
        }

        let maxProgress = achievement.status[1];
        if (typeof maxProgress === "string") {
            const storedMaxProgress = localStorage.getItem(maxProgress);
            maxProgress = storedMaxProgress ? parseInt(storedMaxProgress, 10) : 0;
        }

        maxProgress = isNaN(maxProgress) ? 0 : maxProgress;

        if (currentProgress >= maxProgress) {
            completedAchievementsIds.push(achievement.id);
        }
    });

    // Zapisanie tylko tablicy ID do localStorage
    localStorage.setItem('completedAchievementsIds', JSON.stringify(completedAchievementsIds));
    
    console.log(`Ukończono ${completedAchievementsIds.length} z ${achievementsData.length} osiągnięć`);
    
    return {
        count: completedAchievementsIds.length,
        ids: completedAchievementsIds
    };
}

async function loadAchievements() {
    const achievements = getAchievements();
    const container = document.querySelector("#achievementModalContent");

    if (!container) {
        console.error("Nie znaleziono elementu o ID 'achievementModalContent'.");
        return;
    }

    const localStorageData = {};

    achievements.forEach(achievement => {
        const storedProgress = localStorage.getItem(achievement.status[0]);
        if (storedProgress) {
            try {
                localStorageData[achievement.status[0]] = JSON.parse(storedProgress);
            } catch (e) {
                console.warn("Błąd podczas parsowania danych z localStorage:", e);
            }
        }
    });

    const button = document.createElement("button");
    button.classList.add("refreshButton");

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-redo");

    button.appendChild(icon);
    container.innerHTML = "";
    container.appendChild(button);

    button.addEventListener("click", function() {
        icon.classList.add("rotate");
        setTimeout(() => {
            icon.classList.remove("rotate");
            reloadAchievements();
        }, 1000);
    });

    achievements.forEach(achievement => {
        const gameBox = document.createElement("div");
        gameBox.classList.add("game-box");

        achievement.classes.forEach(className => {
            gameBox.classList.add(className);
        });

        let currentProgress = 0;
        if (localStorageData[achievement.status[0]]) {
            const storedData = localStorageData[achievement.status[0]];
            currentProgress = Array.isArray(storedData) ? storedData.length : storedData;
        }

        let maxProgress = achievement.status[1];
        if (typeof maxProgress === "string") {
            const storedMaxProgress = localStorage.getItem(maxProgress);
            maxProgress = storedMaxProgress ? parseInt(storedMaxProgress, 10) : 0;
        }

        maxProgress = isNaN(maxProgress) ? 0 : maxProgress;

        gameBox.style.backgroundColor = currentProgress >= maxProgress ? "#4CAF50" : "#FF4C4C";

        const title = document.createElement("h2");
        title.textContent = achievement.name;
        gameBox.appendChild(title);

        const description = document.createElement("p");
        description.textContent = achievement.opis;
        gameBox.appendChild(description);

        const DEVcontent = document.createElement("div");
        if (localStorage.getItem('DEVsettings') === "true") {
            DEVcontent.classList.add("DEVachievement-content");
            DEVcontent.textContent = `#${achievement.id || "[Brak ID]"}`;
            gameBox.appendChild(DEVcontent);
        }

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");

        const progressPercentage = Math.min(100, Math.max(0, (currentProgress / maxProgress) * 100));
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${currentProgress}/${maxProgress}`;

        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("aria-valuenow", currentProgress);
        progressBar.setAttribute("aria-valuemax", maxProgress);
        progressBar.setAttribute("aria-label", `Postęp: ${currentProgress} z ${maxProgress}`);

        gameBox.appendChild(progressBar);

        container.appendChild(gameBox);
    });
}

async function reloadAchievements() {
    const container = document.querySelector("#achievementModalContent");
    container.innerHTML = '<button class="refreshButton"><i class="fas fa-redo" onclick="reloadAchievements()"></i></button>';
    loadAchievements();
    checkCompletedAchievements(); // Aktualizacja po odświeżeniu
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadAchievements();
    checkCompletedAchievements(); // Wywołanie przy załadowaniu strony
});

window.onload = function() {
    let achievementNumber = achievementsData.length;
    localStorage.setItem('achievementsNumber', achievementNumber);
};