const games = [
    {
        id: "01",
        name: "Sandbox",
        link: "sandbox/index.html",
        status: "Beta",
        tooltip: "Stwórz własny świat",
        classes: ["beta"],
        ulubione: false
    },
    {
        id: "02",
        name: "Pet Simulator",
        link: "petsim/index.html",
        status: "Testy",
        tooltip: "Wykluwaj zwierzęta i niszcz sejfy",
        classes: ["testy"],
        ulubione: false
    },
    {
        id: "03",
        name: "RPG",
        link: "rpghtml/index.html",
        status: "Testy",
        tooltip: 'Gra RPG w której wcielasz się w bohatera',
        classes: ["testy"],
        ulubione: false
    },
    {
        id: "04",
        name: "Bloki 1",
        link: "game/bloki1.html",
        status: "",
        tooltip: "Strzelaj w bloki lub uciekaj przed nimi",
        classes: ["ukonczona"],
        ulubione: false
    },
    {
        id: "05",
        name: "Dino Game",
        link: "game/dino.html",
        status: "Konserwacje",
        tooltip: "Klasyczna gra Dino",
        classes: ["konserwacje"],
        ulubione: false
    },
    {
        id: "06",
        name: "DuoPlayer",
        link: "game/duoplayer.html",
        status: "Konserwacje",
        tooltip: "Rywalizuj z innym graczem",
        classes: ["konserwacje"],
        ulubione: false
    },
    {
        id: "07",
        name: "Snake",
        link: "snake/index.html",
        status: "Konserwacje",
        tooltip: "Klasyczny Snake",
        classes: ["konserwacje"],
        ulubione: false
    },
    {
        id: "08",
        name: "Zgadywanie Liczb",
        link: "game/zgadywanieliczb.html",
        status: "",
        tooltip: "Zgaduj liczby z zakresu 1-100",
        classes: ["ukonczona"],
        ulubione: false
    },
    {
        id: "09",
        name: "Rizz Party Tycoon",
        link: "rizzpartytycoon/index.html",
        status: "Beta",
        tooltip: "Stwórz imperium imprezowe",
        classes: ["beta"],
        ulubione: false
    },
    {
        id: "10",
        name: "Kółko-Krzyżyk",
        link: "game/kolkokrzyzyk.html",
        status: "",
        tooltip: "Rywalizuj z innym graczem lub botem w tej klasycznej grze",
        classes: ["ukonczona"],
        ulubione: false
    },
    {
        id: "11",
        name: "Tetris",
        link: "game/tetris.html",
        status: "",
        tooltip: "Klasyczny Tetris",
        classes: ["ukonczona"],
        ulubione: false
    },
    {
        id: "12",
        name: "Obby",
        link: "game/obby.html",
        status: "Beta",
        tooltip: "Przejdź tor przeszkód",
        classes: ["beta"],
        ulubione: false
    },
    {
        id: "13",
        name: "Bitcoin Miner",
        link: "game/bitcoinminer.html",
        status: "HOT",
        tooltip: "Klikaj i zdobywaj BitCoiny",
        classes: ["ukonczona","money","hot"],
        ulubione: false
    },
    {
        id: "14",
        name: "Memory",
        link: "game/memory.html",
        status: '',
        tooltip: "Szukaj podobnych kart",
        classes: ["ukonczona"],
        ulubione: false
    },
    {
        id: "15",
        name: "Nonogram",
        link: "game/nonogram.html",
        status: "Konserwacje",
        tooltip: "Rozwiąż te puzzle",
        classes: ["konserwacje"],
        ulubione: false
    },
    {
        id: "16",
        name: "Ping Pong",
        link: "game/pingpong.html",
        status: "",
        tooltip: "Odbijaj piłkę",
        classes: ["ukonczona"],
        ulubione: false
    },
    {
        id: "17",
        name: "Flappy Bird",
        link: "game/flappybird.html",
        status: "Beta",
        tooltip: "Skacz, aby przejść przez dziury",
        classes: ["beta"],
        ulubione: false
    },
    {
        id: "18",
        name: "Solitaire",
        link: "game/solitaire.html",
        status: "",
        tooltip: "Skacz, aby przejść przez dziury",
        classes: ["ukonczona","internet"],
        internet: "https://codepen.io/bfa/pen/ggGYeE",
        ulubione: false
    },
    {
        id: "19",
        name: "Bloki 2",
        link: "game/bloki2.html",
        status: "Beta",
        tooltip: "Odbijaj piłkę i niszcz bloki",
        classes: ["beta"],
        ulubione: false
    },
    {
        id: "20",
        name: "Wisielec",
        link: "wisielec/index.html",
        status: "Konserwacje",
        tooltip: "Odgaduj słowa",
        classes: ["konserwacje"],
        ulubione: false
    },
    {
        id: "21",
        name: "Pizza Tycoon",
        link: "pizza/index.html",
        status: "Beta",
        tooltip: "Stwórz fabrykę pizzy",
        classes: ["beta"],
        ulubione: false
    },
    {
        id: "22",
        name: "Cringe Party Tycoon",
        link: "rizzpartytycoon/index2.html",
        status: "Event",
        tooltip: "Sciringuj innych",
        classes: ["beta","event"],
        ulubione: false
    },
    {
        id: "23",
        name: "Automat",
        link: "game/machine.html",
        status: "Beta",
        tooltip: "Wylosuj 3 takie same ikony",
        classes: ["beta","money"],
        ulubione: false
    },
    {
        id: "24",
        name: "Black Jack",
        link: "game/blackjack.html",
        status: "Konserwacje",
        tooltip: "Dobieraj karty",
        internet: "https://www.youtube.com/watch?v=bMYCWccL-3U",
        classes: ["konserwacje","internet"],
        ulubione: false
    },
    {
        id: "25",
        name: "Scratch",
        link: "game/scratch.html",
        status: "Nowość",
        tooltip: "Stwórz algorytm dla duszka",
        classes: ["beta","nowosc"],
        ulubione: false
    },
    // {
    //     id: "26",
    //     name: "Wordle",
    //     link: "game/wordle.html",
    //     status: "Konserwacje",
    //     tooltip: "Zgaduj słowa",
    //     classes: ["nowosc","konserwacje"],
    //     ulubione: false
    // },
    // {
    //     id: "27",
    //     name: "2048",
    //     link: "game/2048.html",
    //     status: "Konserwacje",
    //     tooltip: "Łącz kafelki",
    //     classes: ["nowosc","konserwacje"],
    //     ulubione: false
    // },
        // {
    //     id: "27",
    //     name: "Block Blast",
    //     link: "game/blockblast.html",
    //     status: "Beta",
    //     tooltip: "Układaj bloki",
    //     classes: ["nowosc","beta"],
    //     ulubione: false
    // },
];

const switches = JSON.parse(localStorage.getItem("settingSwitches")) || defaultSwitches;

const heartLikeInner1 = '<input type="checkbox" id="check';
const heartLikeInner2 = '"><label for="check';
const heartLikeInner3 = '">    <svg class="unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" stroke="#fff" stroke-width="1.5" fill="none">        <path d="m17.5,29.71c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-10.18c0-.27.05-.52.16-.76.11-.24.25-.45.44-.64l5.43-5.4c.25-.23.55-.38.89-.42.34-.05.67,0,.99.17.32.17.55.4.69.7.14.3.17.61.09.92l-1.12,4.6h5.45c.53,0,1,.2,1.4.6.4.4.6.87.6,1.4v2c0,.12-.01.24-.04.38-.02.13-.06.26-.11.38l-3,7.05c-.15.33-.4.62-.75.85-.35.23-.72.35-1.1.35h-8Zm-6,0c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-9c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59s1.02.2,1.41.59c.39.39.59.86.59,1.41v9c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59Z"/>    </svg>    <svg class="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">        <circle class="circle-1" cx="8.85" cy="7.44" r="1.5"/>        <circle class="circle-2" cx="33.2" cy="33.67" r="1"/>        <circle class="circle-3" cx="32.08" cy="8.25" r=".75"/>        <circle class="circle-3" cx="8.33" cy="35.38" r=".75"/>        <path class="flower-1" d="m9.1,5.37c-.24.14-.54.06-.68-.18s-.06-.54.18-.68.54-.06.68.18.06.54-.18.68Zm-2.42.32c-.28,0-.5.22-.5.5,0,.28.22.5.5.5s.5-.22.5-.5c0-.28-.22-.5-.5-.5Zm-.43,2.75c-.14.24-.06.54.18.68s.54.06.68-.18.06-.54-.18-.68-.54-.06-.68.18Zm2.17,1.75c.14.24.44.32.68.18s.32-.44.18-.68-.44-.32-.68-.18-.32.44-.18.68Zm2.6-1c.28,0,.5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5Zm.43-2.75c.14-.24.06-.54-.18-.68s-.54-.06-.68.18-.06.54.18.68.54.06.68-.18Z"/>        <path class="flower-2" d="m7.83,33.13c0-.28.22-.5.5-.5s.5.22.5.5c0,.28-.22.5-.5.5s-.5-.22-.5-.5Zm-1.02,1.38c.14-.24.06-.54-.18-.68s-.54-.06-.68.18-.06.54.18.68.54.06.68-.18Zm0,1.75c-.14-.24-.44-.32-.68-.18s-.32.44-.18.68.44.32.68.18.32-.44.18-.68Zm1.52.88c-.28,0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5Zm1.52-.87c-.14.24-.06.54.18.68s.54.06.68-.18.06-.54-.18-.68-.54-.06-.68.18Zm0-1.75c.14.24.44.32.68.18s.32-.44.18-.68-.44-.32-.68-.18-.32.44-.18-.68Z"/>        <path class="flower-3" d="m32.7,36.17c0-.28.22-.5.5-.5s.5.22.5.5c0,.28-.22.5-.5.5s-.5-.22-.5-.5Zm3.1-1c.14-.24.06-.54-.18-.68s-.54-.06-.68.18-.06.54.18.68.54.06.68-.18Zm0-3c-.14-.24-.44-.32-.68-.18s-.32.44-.18.68.44.32.68.18.32-.44.18-.68Zm-2.6-1.5c-.28,0-.5.22-.5.5,0,.28.22.5.5.5s.5-.22.5-.5-.22-.5-.5-.5Zm-2.6,1.5c-.14.24-.06.54.18.68s.54.06.68-.18.06-.54-.18-.68-.54-.06-.68.18A-.5.5,0,0,0,30.1,33Z"/>        <path class="flower-2" d="m32.58,6c0,.28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5Zm-2.88.87c-.14.24-.06.54.18.68s.54.06.68-.18.06-.54-.18-.68-.54-.06-.68.18Zm0,2.75c.14.24.44.32.68.18s.32-.44.18-.68-.44-.32-.68-.18-.32.44-.18-.68Zm2.38,1.38c.28,0,.5-.22.5-.5,0-.28-.22-.5-.5-.5s-.5.22-.5.5c0,.28.22.5.5.5Zm2.38-1.37c.14-.24.06-.54-.18-.68s-.54-.06-.68.18-.06.54.18.68.54.06.68-.18Zm0-2.75c-.14-.24-.44-.32-.68-.18s-.32.44-.18.68.44.32.68.18.32-.44-.18-.68Z"/>        <line class="line line-1" x1="33.2" y1="33.67" x2="37.16" y2="37.63"/>        <line class="line line-4" x1="32.08" y1="8.25" x2="36.74" y2="3.59"/>        <line class="line line-3" x1="8.73" y1="7.3" x2="4.63" y2="3.2"/>        <line class="line line-2" x1="8.33" y1="35.38" x2="5.72" y2="37.99"/>        <path class="line line-2" d="m24.47,8.03c-1.32-1.84,1.6-5.11,2.06-2.97.37,1.74-4.2,0-2.68-2.97"/>        <path class="line line-6" d="m27.15,32.66c.75,1.37-2.07,5.62-2.82,3.96-.64-1.42,3.02-1.3,3.76,1.36"/>        <line class="line line-7" x1="33.46" y1="29.71" x2="37.97" y2="29.71"/>        <line class="line line-5" x1="7.56" y1="13.99" x2="2.91" y2="13.99"/>        <path class="hand" d="m17.5,29.71c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-10.18c0-.27.05-.52.16-.76.11-.24.25-.45.44-.64l5.43-5.4c.25-.23.55-.38.89-.42.34-.05.67,0,.99.17.32.17.55.4.69.7.14.3.17.61.09.92l-1.12,4.6h5.45c.53,0,1,.2,1.4.6.4.4.6.87.6,1.4v2c0,.12-.01.24-.04.38-.02.13-.06.26-.11.38l-3,7.05c-.15.33-.4.62-.75.85-.35.23-.72.35-1.1.35h-8Zm-6,0c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-9c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59s1.02.2,1.41.59c.39.39.59.86.59,1.41v9c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59Z"/>        </svg></label>';

function saveFavorites() {
    const favoriteGames = games.filter(game => game.ulubione).map(game => game.id);
    localStorage.setItem('favoriteGames', JSON.stringify(favoriteGames));
}

function loadFavorites() {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteGames')) || [];
    games.forEach(game => {
        game.ulubione = favoriteIds.includes(game.id);
    });
}

function toggleFavorite(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    game.ulubione = !game.ulubione;
    saveFavorites();
    // Czyścimy kontenery przed ponownym załadowaniem gier
    document.querySelectorAll(".game-container").forEach(container => {
        container.innerHTML = '<button class="refreshButton"><i class="fas fa-redo" onclick="reloadGames()"></i></button>';
    });
    loadGames();
}

function loadGames() {
    const containers = document.querySelectorAll(".game-container");
    const lastPlayedGameId = localStorage.getItem('lastPlayedGame');
    
    // Sortowanie: najpierw ostatnia grana, potem ulubione
    const sortedGames = games.sort((a, b) => {
        // Najwyższy priorytet: ostatnia grana gra
        if (a.id === lastPlayedGameId) return -1;
        if (b.id === lastPlayedGameId) return 1;
        // Drugi priorytet: ulubione
        if (a.ulubione && !b.ulubione) return -1;
        if (!a.ulubione && b.ulubione) return 1;
        // Pozostałe gry bez zmian
        return 0;
    });

    let gameIndex = 0;

    containers.forEach((container, containerIndex) => {
        const maxGames = parseInt(container.getAttribute("max"), 10) || sortedGames.length;

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
            game.classes.forEach(className => {
                gameBox.classList.add(className);
            });

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
                statusEnd.innerHTML = '<i class="fas fa-sack-dollar"></i>';
                statusEnd.classList.add("game-status-money");
                gameBox.appendChild(statusEnd);
            }
            if (game.classes.includes("internet")) {
                const statusEnd = document.createElement("span");
                statusEnd.innerHTML = '<i class="fas fa-globe-americas"></i>';
                statusEnd.title = "Kliknij, aby skopiować link";
                statusEnd.classList.add("game-status-internet");
                statusEnd.addEventListener('click', function () {
                    navigator.clipboard.writeText(game.internet);
                });
                gameBox.appendChild(statusEnd);
            }

            const DEVcontent = document.createElement("div");
            if (switches.find(s => s.switchId === "01")?.value) { // Tryb dewelopera
                DEVcontent.classList.add("DEVgame-content");
                DEVcontent.textContent = String(`#${game.id}` || "[Brak ID]");
                gameBox.appendChild(DEVcontent);
            }

            const title = document.createElement("h2");
            title.textContent = game.name;
            gameBox.appendChild(title);

            const link = document.createElement("a");
            link.href = game.link;
            link.textContent = "Zagraj";
            link.classList.add("game-link");
            link.addEventListener('click', function () {
                addPlayedGamesToStorage(game.id);
                localStorage.setItem('lastPlayedGame', game.id);
            });
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

        // Dodajemy "custom" tylko do ostatniego kontenera, jeśli switch "05" jest włączony
        if (containerIndex === containers.length - 1) {
            const customSwitch = switches.find(s => s.switchId === "05");
            if (customSwitch && customSwitch.value) {
                const customGame = document.createElement("div");
                customGame.classList.add("game-box");
                const title = document.createElement("h2");
                title.textContent = "???";
                customGame.appendChild(title);
                container.appendChild(customGame);
            }
        }
    });

    attachFavoriteEvents();
}

function attachFavoriteEvents() {
    document.querySelectorAll(".favorite-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", (event) => {
            const gameId = event.target.dataset.gameId;
            toggleFavorite(gameId);
        });
    });
}

function loadhotSlideshow() {
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

function loadeventSlideshow() {
    const hotGames = games.filter(game => game.classes.includes("event"));
    const slideshowContainer = document.getElementById("eventSlideshow");

    hotGames.forEach(game => {
        const slide = document.createElement("div");
        slide.classList.add("slide", "event", "game-box");
        slide.style.width = "50%";
        slide.style.height = "50%";

        if (hotGames.indexOf(game) === 0) {
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

function addPlayedGamesToStorage(gameId) {
    let gamesArray = JSON.parse(localStorage.getItem('playedGames')) || [];
    if (!gamesArray.includes(gameId)) {
        gamesArray.push(gameId);
    }
    localStorage.setItem('playedGames', JSON.stringify(gamesArray));
}

window.onload = function() {
    let gamesNumber = games.length;
    localStorage.setItem('gamesNumber', gamesNumber);
    loadFavorites();
    loadhotSlideshow();
    loadeventSlideshow();
    reloadGames();
};

function reloadGames() {
    const containers = document.querySelectorAll(".game-container");

    containers.forEach(container => {
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
                reloadGames();
            }, 1000);
        });
    });

    loadGames();
}