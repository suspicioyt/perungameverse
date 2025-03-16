const achievements = [
    {
        id: "01",
        name: "Prezenty 2024",
        opis: "Zbierz wszystkie prezenty w evencie bożonarodzeniowym 2024",
        classes: ["beta"],
        status: ["clickedButtons", 15]
    },
    {
        id: "02",
        name: "100 gier",
        opis: "Zagraj we wszystkie dostępne gry w HUBIE",
        classes: ["beta"],
        status: ["playedGames", "gamesNumber"]
    },
    {
        id: "03",
        name: "Mistrz odbijania",
        opis: "Zbierz 250 punktów w Ping Pongu",
        classes: ["beta"],
        status: ["pingPong", 20]
    },
    {
        id: "04",
        name: "Wieże czy wierze?",
        opis: "Zbierz 60 punktów w Flappy Bird",
        classes: ["beta"],
        status: ["flappyHighScore", 60]
    }
];

function loadAchievements() {
    const container = document.querySelector("#achievementModalContent");

    if (!container) {
        console.error("Nie znaleziono elementu o ID 'achievementModalContent'.");
        return;
    }

    // Caching all localStorage values for performance
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

    achievements.forEach(achievement => {
        const gameBox = document.createElement("div");
        gameBox.classList.add("game-box");
    
        // Add custom classes to gameBox
        achievement.classes.forEach(className => {
            gameBox.classList.add(className);
        });
    
        // Get current progress
        let currentProgress = 0;
        if (localStorageData[achievement.status[0]]) {
            const storedData = localStorageData[achievement.status[0]];
            
            // Check if stored data is an array
            if (Array.isArray(storedData)) {
                currentProgress = storedData.length;  // Count the number of elements in the array
            } else {
                currentProgress = storedData;  // Otherwise, use the stored value directly
            }
        }
    
        // Determine max progress
        let maxProgress = achievement.status[1];
    
        // Check if maxProgress is a string or number
        if (typeof maxProgress === "string") {
            const storedMaxProgress = localStorage.getItem(maxProgress);
            maxProgress = storedMaxProgress ? parseInt(storedMaxProgress, 10) : 0;
        }
    
        // Ensure maxProgress is a valid number
        maxProgress = isNaN(maxProgress) ? 0 : maxProgress;
    
        // Debugging: Check values for maxProgress and currentProgress
        console.log(`Osiągnięcie: ${achievement.name} Max Progress: ${maxProgress} Current Progress: ${currentProgress}`);
    
        // Set background color based on progress
        gameBox.style.backgroundColor = currentProgress >= maxProgress ? "#4CAF50" : "#FF4C4C";
    
        // Create title
        const title = document.createElement("h2");
        title.textContent = achievement.name;
        gameBox.appendChild(title);
    
        // Add description
        const description = document.createElement("p");
        description.textContent = achievement.opis;
        gameBox.appendChild(description);
        const DEVcontent = document.createElement("div");
        if (localStorage.getItem('DEVsettings') === "true") {
            DEVcontent.classList.add("DEVachievement-content");
            DEVcontent.textContent = String(`#${achievement.id}` || "[Brak ID]"); // Dodano # przed msg.id
            gameBox.appendChild(DEVcontent);
        }
        // Create progress bar
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
    
        // Calculate progress percentage
        const progressPercentage = Math.min(100, Math.max(0, (currentProgress / maxProgress) * 100));
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${currentProgress}/${maxProgress}`;
    
        // Add accessibility attributes
        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("aria-valuenow", currentProgress);
        progressBar.setAttribute("aria-valuemax", maxProgress);
        progressBar.setAttribute("aria-label", `Postęp: ${currentProgress} z ${maxProgress}`);
    
        // Append progress bar to the game box
        gameBox.appendChild(progressBar);
    
        // Add the game box to the container
        container.appendChild(gameBox);
    });    
}

// Load achievements after the page has loaded
document.addEventListener("DOMContentLoaded", loadAchievements);

function reloadAchievements() {
    document.querySelector("#achievementModalContent").innerHTML='<button class="refreshButton"><i class="fas fa-redo" onclick="reloadGames()"></i></button>';
    loadAchievements();
}