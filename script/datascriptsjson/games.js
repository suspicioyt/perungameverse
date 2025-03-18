// Stałe HTML dla przycisku "ulubione"
const heartLikeInner1 = '<input type="checkbox" id="check';
const heartLikeInner2 = '"><label for="check';
const heartLikeInner3 = '">    <svg class="unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" stroke="#fff" stroke-width="1.5" fill="none">        <path d="m17.5,29.71c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-10.18c0-.27.05-.52.16-.76.11-.24.25-.45.44-.64l5.43-5.4c.25-.23.55-.38.89-.42.34-.05.67,0,.99.17.32.17.55.4.69.7.14.3.17.61.09.92l-1.12,4.6h5.45c.53,0,1,.2,1.4.6.4.4.6.87.6,1.4v2c0,.12-.01.24-.04.38-.02.13-.06.26-.11.38l-3,7.05c-.15.33-.4.62-.75.85-.35.23-.72.35-1.1.35h-8Zm-6,0c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-9c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59s1.02.2,1.41.59c.39.39.59.86.59,1.41v9c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59Z"/>    </svg>    <svg class="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">        <circle class="circle-1" cx="8.85" cy="7.44" r="1.5"/>        <circle class="circle-2" cx="33.2" cy="33.67" r="1"/>        <circle class="circle-3" cx="32.08" cy="8.25" r=".75"/>        <circle class="circle-3" cx="8.33" cy="35.38" r=".75"/>        <path class="flower-1" d="m9.1,5.37c-.24.14-.54.06-.68-.18s-.06-.54.18-.68.54-.06.68.18.06.54-.18.68Zm-2.42.32c-.28,0-.5.22-.5.5,0,.28.22.5.5.5s.5-.22.5-.5c0-.28-.22-.5-.5-.5Zm-.43,2.75c-.14.24-.06.54.18.68s.54.06.68-.18.06-.54-.18-.68-.54-.06-.68.18Zm2.17,1.75c.14.24.44.32.68.18s.32-.44.18-.68-.44-.32-.68-.18-.32.44-.18.68Zm2.6-1c.28,0,.5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5Zm.43-2.75c.14-.24.06-.54-.18-.68s-.54-.06-.68.18-.06.54.18.68.54.06.68-.18Z"/>        <path class="flower-2" d="m7.83,33.13c0-.28.22-.5.5-.5s.5.22.5.5c0,.28-.22.5-.5.5s-.5-.22-.5-.5Zm-1.02,1.38c.14-.24.06-.54-.18-.68s-.54-.06-.68.18-.06.54.18.68.54.06.68-.18Zm0,1.75c-.14-.24-.44-.32-.68-.18s-.32.44-.18.68.44.32.68.18.32-.44.18-.68Zm1.52.88c-.28,0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5Zm1.52-.87c-.14.24-.06.54.18.68s.54.06.68-.18.06-.54-.18-.68-.54-.06-.68.18Zm0-1.75c.14.24.44.32.68.18s.32-.44.18-.68-.44-.32-.68-.18-.32.44-.18-.68Z"/>        <path class="flower-3" d="m32.7,36.17c0-.28.22-.5.5-.5s.5.22.5.5c0,.28-.22.5-.5.5s-.5-.22-.5-.5Zm3.1-1c.14-.24.06-.54-.18-.68s-.54-.06-.68.18-.06.54.18.68.54.06.68-.18Zm0-3c-.14-.24-.44-.32-.68-.18s-.32.44-.18.68.44.32.68.18.32-.44.18-.68Zm-2.6-1.5c-.28,0-.5.22-.5.5,0,.28.22.5.5.5s.5-.22.5-.5-.22-.5-.5-.5Zm-2.6,1.5c-.14.24-.06.54.18.68s.54.06.68-.18.06-.54-.18-.68-.54-.06-.68.18Zm0,3c.14.24.44.32.68.18s.32-.44.18-.68-.44-.32-.68-.18-.32.44-.18.68Z"/>        <path class="flower-2" d="m32.58,6c0,.28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5Zm-2.88.87c-.14.24-.06.54.18.68s.54.06.68-.18.06-.54-.18-.68-.54-.06-.68.18Zm0,2.75c.14.24.44.32.68.18s.32-.44.18-.68-.44-.32-.68-.18-.32.44-.18.68Zm2.38,1.38c.28,0,.5-.22.5-.5,0-.28-.22-.5-.5-.5s-.5.22-.5.5c0,.28.22.5.5.5Zm2.38-1.37c.14-.24.06-.54-.18-.68s-.54-.06-.68.18-.06.54.18.68.54.06.68-.18Zm0-2.75c-.14-.24-.44-.32-.68-.18s-.32.44-.18.68.44.32.68.18.32-.44.18-.68Z"/>        <line class="line line-1" x1="33.2" y1="33.67" x2="37.16" y2="37.63"/>        <line class="line line-4" x1="32.08" y1="8.25" x2="36.74" y2="3.59"/>        <line class="line line-3" x1="8.73" y1="7.3" x2="4.63" y2="3.2"/>        <line class="line line-2" x1="8.33" y1="35.38" x2="5.72" y2="37.99"/>        <path class="line line-2" d="m24.47,8.03c-1.32-1.84,1.6-5.11,2.06-2.97.37,1.74-4.2,0-2.68-2.97"/>        <path class="line line-6" d="m27.15,32.66c.75,1.37-2.07,5.62-2.82,3.96-.64-1.42,3.02-1.3,3.76,1.36"/>        <line class="line line-7" x1="33.46" y1="29.71" x2="37.97" y2="29.71"/>        <line class="line line-5" x1="7.56" y1="13.99" x2="2.91" y2="13.99"/>        <path class="hand" d="m17.5,29.71c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-10.18c0-.27.05-.52.16-.76.11-.24.25-.45.44-.64l5.43-5.4c.25-.23.55-.38.89-.42.34-.05.67,0,.99.17.32.17.55.4.69.7.14.3.17.61.09.92l-1.12,4.6h5.45c.53,0,1,.2,1.4.6.4.4.6.87.6,1.4v2c0,.12-.01.24-.04.38-.02.13-.06.26-.11.38l-3,7.05c-.15.33-.4.62-.75.85-.35.23-.72.35-1.1.35h-8Zm-6,0c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-9c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59s1.02.2,1.41.59c.39.39.59.86.59,1.41v9c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59Z"/>        </svg></label>';

// Globalna zmienna przechowująca gry
let games = [];

// Funkcja pobierająca dane z pliku JSON
async function fetchGames() {
    if(localStorage.getItem("DEVsettings") === "true") {
        try {
            console.error('dev');
            const url = 'https://suspicioyt.github.io/perungameverse/data/datatest/games.json'
    
            // Wykonaj żądanie fetch
            const response = await fetch(url);
    
            // Sprawdź, czy odpowiedź jest poprawna
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Parsuj dane JSON
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Błąd podczas pobierania games.json:', error);
            return [];
        }
    } else {
        try {
        
            const url = 'https://suspicioyt.github.io/perungameverse/data/games.json'
    
            // Wykonaj żądanie fetch
            const response = await fetch(url);
    
            // Sprawdź, czy odpowiedź jest poprawna
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Parsuj dane JSON
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Błąd podczas pobierania games.json:', error);
            return [];
        }
    }
    
}

// Funkcja zapisująca ulubione gry w localStorage
function saveFavorites() {
    const favoriteGames = games.filter(game => game.ulubione).map(game => game.id);
    localStorage.setItem('favoriteGames', JSON.stringify(favoriteGames));
}

// Funkcja ładująca ulubione gry z localStorage
async function loadFavorites() {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteGames')) || [];
    games.forEach(game => {
        game.ulubione = favoriteIds.includes(game.id);
    });
}

// Funkcja przełączająca status ulubionych
function toggleFavorite(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    game.ulubione = !game.ulubione;
    saveFavorites();
    loadGames();
}

// Funkcja dodająca eventy do checkboxów ulubionych
function attachFavoriteEvents() {
    document.querySelectorAll(".favorite-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", (event) => {
            const gameId = event.target.dataset.gameId;
            toggleFavorite(gameId);
        });
    });
}

// Funkcja zapisująca grane gry do localStorage
function addPlayedGamesToStorage(gameId) {
    localStorage.setItem('lastPlayedGame', gameId);
    let gamesArray = JSON.parse(localStorage.getItem('playedGames')) || [];
    if (!gamesArray.includes(gameId)) {
        gamesArray.push(gameId);
    }
    localStorage.setItem('playedGames', JSON.stringify(gamesArray));
}

// Funkcja aktualizująca kontenery gier
function updateGameContainers(filteredGames) {
    const containers = document.querySelectorAll(".game-container");
    const lastPlayedGameId = localStorage.getItem('lastPlayedGame');

    const sortedGames = filteredGames.sort((a, b) => {
        if (a.id === lastPlayedGameId) return -1;
        if (a.ulubione && !b.ulubione) return -1;
        if (!a.ulubione && b.ulubione) return 1;
        return 0;
    });

    let gameIndex = 0;
    containers.forEach(container => {
        const maxGames = parseInt(container.getAttribute("max"), 10) || sortedGames.length;
        const refreshButton = container.querySelector(".refreshButton");
        container.innerHTML = "";
        if (refreshButton) container.appendChild(refreshButton);

        for (let i = 0; i < maxGames && gameIndex < sortedGames.length; i++) {
            const game = sortedGames[gameIndex];
            gameIndex++;

            const gameBox = document.createElement("div");
            gameBox.classList.add("game-box");
            gameBox.setAttribute('gameId', game.id);

            if (game.id === lastPlayedGameId) {
                gameBox.classList.add("lastPlayed");
                const status = document.createElement("span");
                status.innerHTML = "Ostatnio grane";
                status.classList.add("lastPlayedLabel");
                gameBox.appendChild(status);
            }

            game.classes.forEach(className => gameBox.classList.add(className));

            if (game.ulubione) {
                gameBox.style.backgroundColor = "#FF4C4C";
            }

            if (game.status) {
                const status = document.createElement("span");
                status.innerHTML = game.status;
                status.classList.add("game-label");
                gameBox.appendChild(status);
            }
            if (game.classes.includes("ukonczona")) {
                const statusEnd = document.createElement("span");
                statusEnd.textContent = "Ukończona";
                statusEnd.classList.add("game-status");
                gameBox.appendChild(statusEnd);
            }
            if (game.classes.includes("money")) {
                const statusEnd = document.createElement("span");
                statusEnd.innerHTML = '<i class="fas fa-dollar-sign"></i>';
                statusEnd.classList.add("game-status-money");
                gameBox.appendChild(statusEnd);
            }
            if (game.classes.includes("internet")) {
                const statusEnd = document.createElement("span");
                statusEnd.innerHTML = '<i class="fas fa-globe"></i>';
                statusEnd.classList.add("game-status-internet");
                gameBox.appendChild(statusEnd);
            }

            const DEVcontent = document.createElement("div");
            if (localStorage.getItem('DEVsettings') === "true") {
                DEVcontent.classList.add("DEVgame-content");
                DEVcontent.textContent = `#${game.id || "[Brak ID]"}`;
                gameBox.appendChild(DEVcontent);
            }

            const title = document.createElement("h2");
            title.textContent = game.name;
            gameBox.appendChild(title);

            const link = document.createElement("a");
            link.href = game.link;
            link.textContent = "Zagraj";
            link.classList.add("game-link");
            link.addEventListener('click', () => addPlayedGamesToStorage(game.id));
            link.target = "_blank";

            if (game.tooltip) {
                const tooltip = document.createElement("span");
                tooltip.innerHTML = game.tooltip;
                tooltip.classList.add("tooltiptext");
                link.appendChild(tooltip);
            }

            gameBox.appendChild(link);

            const favoriteButton = document.createElement("div");
            favoriteButton.classList.add("favorite-button");
            favoriteButton.innerHTML = heartLikeInner1 + game.id + heartLikeInner2 + game.id + heartLikeInner3;

            const favoriteCheckbox = favoriteButton.querySelector("input");
            favoriteCheckbox.checked = game.ulubione;
            favoriteCheckbox.dataset.gameId = game.id;
            favoriteCheckbox.classList.add("favorite-checkbox");

            gameBox.appendChild(favoriteButton);

            container.appendChild(gameBox);
        }
    });

    attachFavoriteEvents();
}

// Funkcja ładowania gier
async function loadGames() {
    updateGameContainers(games);
}

// Funkcja ładowania slajdów HOT
async function loadhotSlideshow() {
    const hotGames = games.filter(game => game.classes.includes("hot"));
    const slideshowContainer = document.getElementById("hotSlideshow");

    hotGames.forEach(game => {
        const slide = document.createElement("div");
        slide.classList.add("slide", "hot", "game-box");
        slide.style.width = "50%";
        slide.style.height = "50%";

        if (hotGames.indexOf(game) === 0) {
            slide.classList.add("active");
        }

        const title = document.createElement("h2");
        title.textContent = game.name;
        slide.appendChild(title);

        const hotBadge = document.createElement("span");
        hotBadge.classList.add("hot-badge");
        slide.appendChild(hotBadge);

        const link = document.createElement("a");
        link.href = game.link;
        link.textContent = "Zagraj";
        link.classList.add("game-link");
        link.target = "_blank";
        slide.appendChild(link);

        slideshowContainer.appendChild(slide);
    });
}

// Funkcja ładowania slajdów eventowych
async function loadeventSlideshow() {
    const eventGames = games.filter(game => game.classes.includes("event"));
    const slideshowContainer = document.getElementById("eventSlideshow");

    eventGames.forEach(game => {
        const slide = document.createElement("div");
        slide.classList.add("slide", "event", "game-box");
        slide.style.width = "50%";
        slide.style.height = "50%";

        if (eventGames.indexOf(game) === 0) {
            slide.classList.add("active");
        }

        const title = document.createElement("h2");
        title.textContent = game.name;
        slide.appendChild(title);

        const link = document.createElement("a");
        link.href = game.link;
        link.textContent = "Zagraj";
        link.classList.add("game-link");
        link.target = "_blank";
        slide.appendChild(link);

        slideshowContainer.appendChild(slide);
    });
}

// Funkcja przeładowująca gry
async function reloadGames() {
    const containers = document.querySelectorAll(".game-container");

    containers.forEach(container => {
        const button = document.createElement("button");
        button.classList.add("refreshButton");

        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-redo");
        button.appendChild(icon);

        container.innerHTML = "";
        container.appendChild(button);

        button.addEventListener("click", async () => {
            icon.classList.add("rotate");
            setTimeout(async () => {
                icon.classList.remove("rotate");
                await reloadGames();
            }, 1000);
        });
    });

    await loadGames();
}

// Inicjalizacja strony
window.onload = async function() {
    games = await fetchGames(); // Pobierz gry i zapisz do globalnej zmiennej
    localStorage.setItem('gamesNumber', games.length);
    await loadFavorites();
    await loadhotSlideshow();
    await loadeventSlideshow();
    await reloadGames();
};

// Wyszukiwanie gier
document.getElementById('searchInput').onkeyup = function () {
    const filter = this.value.toUpperCase();
    const filteredGames = games.filter(game => game.name.toUpperCase().includes(filter));
    updateGameContainers(filteredGames);
};

// Zamykanie dropdownu
window.onclick = function(event) {
    const dropdown = document.getElementById("dropdownFiltres");
    if (!event.target.matches('.filterdropbtn') && !event.target.matches('.dropdownFiltres-content') && !event.target.closest('.dropdownFiltres-content')) {
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        }
    }
};

// Filtrowanie gier
function filterSelection(category) {
    const filteredGames = category === "all" ? games : games.filter(game => game.classes.includes(category));
    updateGameContainers(filteredGames);
}

// Zmiana klasy aktywnego przycisku
function changeClass(element) {
    const buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
        button.classList.remove("active");
    }
    if (!element.classList.contains('active')) {
        element.classList.add("active");
    }
}