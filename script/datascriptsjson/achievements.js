// Funkcja pobierająca dane z pliku JSON
async function fetchAchievements() {
    try {
        const response = await fetch('https://suspicioyt.github.io/perungameverse/data/achievements.json'); // Zmień na odpowiedni URL, jeśli JSON jest hostowany gdzie indziej
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Błąd podczas pobierania achievements.json:', error);
        return [];
    }
}

async function loadAchievements() {
    const achievements = await fetchAchievements();
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

        // Add DEV content if DEVsettings is enabled
        const DEVcontent = document.createElement("div");
        if (localStorage.getItem('DEVsettings') === "true") {
            DEVcontent.classList.add("DEVachievement-content");
            DEVcontent.textContent = `#${achievement.id || "[Brak ID]"}`;
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

async function reloadAchievements() {
    const container = document.querySelector("#achievementModalContent");
    if (container) {
        container.innerHTML = '<button class="refreshButton"><i class="fas fa-redo" onclick="reloadAchievements()"></i></button>';
        await loadAchievements();
    }
}

// Load achievements after the page has loaded
document.addEventListener("DOMContentLoaded", async () => {
    await loadAchievements();
});