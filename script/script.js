const settingSwitches = [
    { switchId: "01", value: false },//tryb dewelopera
    { switchId: "02", value: false },//zapis modali
    { switchId: "03", value: true },//ładowanie obrazów na Chacie
    { switchId: "04", value: true },//ukrywanie zbanowanych słów na Chacie
    { switchId: "05", value: false },//???
    { switchId: "06", value: true },//ostatnio grana gra
    { switchId: "07", value: true },//powiadomienia
    { switchId: "08", value: false },
    { switchId: "09", value: false },
    { switchId: "10", value: false },
];
var countDownDate = new Date("Apr 27, 2025 20:00:00").getTime();
const API_URL = "https://script.google.com/macros/s/AKfycbwel-hMu178BUi2a-1E4Phg9-Vm8rjGicaHxGbEc0dkiE2y6keeT2KDugUbwk2J9P1dVw/exec";


let isScrolling = false;
let lastScrollY = 0;
const threshold = 1;
const element = document.querySelector('#parallaxEnd');

function getElementPosition() {
    const rect = element.getBoundingClientRect();
    return rect.top + window.scrollY - 150;
}

function smoothScrollTo(target) {
    isScrolling = true;
    window.scrollTo({
        top: target,
        behavior: 'smooth',
    });

    setTimeout(() => {
        isScrolling = false;
    }, 100);
}

window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    const elementHeight = element.offsetHeight;

    if (currentScrollY >= 0 && currentScrollY <= (getElementPosition() + elementHeight)) {
        if (Math.abs(currentScrollY - lastScrollY) < threshold) {
            return;
        }

        if (!isScrolling && currentScrollY > lastScrollY) {
            smoothScrollTo(getElementPosition());
            var header = document.querySelector('header');
            header.classList.add('scrolled');
            document.getElementById('sidenav').classList.add('scrolled');
        }

        if (!isScrolling && currentScrollY < lastScrollY && currentScrollY > 0) {
            smoothScrollTo(0);
            var header = document.querySelector('header');
            header.classList.remove('scrolled');
            document.getElementById('sidenav').classList.remove('scrolled');
        }
        lastScrollY = currentScrollY;
    }
});
document.addEventListener('DOMContentLoaded', function () {
  const currentScrollY = window.scrollY;
  const elementHeight = element.offsetHeight;
  if (elementHeight <= currentScrollY) {
    var header = document.querySelector('header');
    header.classList.add('scrolled');
    document.getElementById('sidenav').classList.add('scrolled');
  }
})
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

          if (game.id === lastPlayedGameId && (lastPlayedSwitch && lastPlayedSwitch.value)) {
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
          favoriteCheckbox.addEventListener("change", () => {
              game.ulubione = favoriteCheckbox.checked;
              saveFavorites();
          });

          gameBox.appendChild(favoriteButton);

          container.appendChild(gameBox);
      }
  });

  attachFavoriteEvents();
}
document.getElementById('searchInput').onkeyup = function () {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();

  const filteredGames = games.filter(game => {
      const txtValue = game.name.toUpperCase();
      return txtValue.indexOf(filter) > -1;
  });

  updateGameContainers(filteredGames);
};

window.onclick = function(event) {
  const dropdown = document.getElementById("dropdownFiltres");

  if (!event.target.matches('.filterdropbtn') && !event.target.matches('.dropdownFiltres-content') && !event.target.closest('.dropdownFiltres-content')) {
      if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
      }
  }
};

function filterSelection(category) {
  const filteredGames = games.filter(game => {
      if (category === "all") return true;
      return game.classes.includes(category);
  });

  updateGameContainers(filteredGames);
}

function changeClass(element) {
  const buttons = document.getElementsByTagName('button');
  for (let button of buttons) {
    button.classList.remove("active");
  }
  if (!element.classList.contains('active')) {
    element.classList.add("active");
  }
}

function progressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
window.onscroll = function() { progressBar()};

function modalOpen(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement && !modalElement.classList.contains("show")) {
        modalElement.classList.add("show");
        saveModalState(); // Zapisz stan po otwarciu
    }
}

function modalClose(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement && modalElement.classList.contains("show")) {
        modalElement.classList.remove("show");
        saveModalState(); // Zapisz stan po zamknięciu
    }
}

function saveModalState() {
    const switches = JSON.parse(localStorage.getItem("settingSwitches")) || settingSwitches;
    const autoOpenSwitch = switches.find(s => s.switchId === "02");

    if (autoOpenSwitch && autoOpenSwitch.value) {
        const openModals = Array.from(document.querySelectorAll('.modal.show'))
            .map(modal => modal.id)
            .filter(id => id); // Filtrujemy, aby upewnić się, że zapisujemy tylko modale z ID
        sessionStorage.setItem("openModals", JSON.stringify(openModals));
    } else {
        sessionStorage.removeItem("openModals"); // Usuń zapis, jeśli switch jest wyłączony
    }
}

function restoreModalState() {
    const switches = JSON.parse(localStorage.getItem("settingSwitches")) || settingSwitches;
    const autoOpenSwitch = switches.find(s => s.switchId === "02");

    if (autoOpenSwitch && autoOpenSwitch.value) {
        const openModals = JSON.parse(sessionStorage.getItem("openModals")) || [];
        openModals.forEach(modalId => {
            const modalElement = document.getElementById(modalId);
            if (modalElement && !modalElement.classList.contains("show")) {
                modalOpen(modalId); // Otwieramy modal tylko jeśli istnieje i nie jest już otwarty
            }
        });
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.querySelector('.modal.show');
        if (modal) {
            modal.classList.remove("show");
            saveModalState();
        }
    }
});

document.addEventListener('click', (event) => {
    const modal = document.querySelector('.modal.show');
    if (modal && event.target === modal) {
        modal.classList.remove("show");
        saveModalState();
    }
});


function generateUUID() {
  if (crypto && crypto.randomUUID) {
      return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const storedUsername = localStorage.getItem("perunUsername");
  const storedUUID = localStorage.getItem("perunUUID");

  if (storedUsername && storedUUID) {
    document.getElementById("welcomeModal").style.display = 'none';
  } else {
    if(!storedUUID){
        localStorage.setItem("perunUUID", generateUUID());
        location.reload();
    }

    document.getElementById("welcomeModal").style.display = 'block';

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'effects/fireworks.css';
    link.id = 'fireworksStyles';
    document.head.appendChild(link);
}

  document.getElementById("saveUsernameBtn").addEventListener("click", function () {
    localStorage.setItem("DEVsettings","false");
    const username = document.getElementById("usernameInput").value.trim();
    if (username === 'SUSpicio' || username === 'SUSpicioDEV') {
      document.getElementById("errorMessage").style.display = 'block';
      return;
    }    
    if (username && username.length>3 && username.length<15) {
      localStorage.setItem("perunUsername", username);

      const linkToRemove = document.getElementById('fireworksStyles');
      if (linkToRemove) {
        linkToRemove.remove();
      }

      document.getElementById("welcomeModal").style.display = 'none';
      document.getElementById("player-name").textContent = username;
      
    } else {
      document.getElementById("errorMessage").style.display = 'block';
    }
  });
});

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
    
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Kliknij CTRL i przycisk odświeżenia strony, aby wymusić odświeżenie";
  }
}, 1000);

let slideIndex = 0;
showSlides(slideIndex);

function showSlides(n) {
    const slides = document.querySelectorAll('.slides');
    const dots = document.querySelectorAll('.dot');

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n - 1);
}

let autoSlide = setInterval(() => changeSlide(1), 3000);

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => changeSlide(1), 3000);
}

document.querySelector('.prev').addEventListener('click', () => {
    changeSlide(-1);
    resetAutoSlide();
});

document.querySelector('.next').addEventListener('click', () => {
    changeSlide(1);
    resetAutoSlide();
});

document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide(index + 1);
        resetAutoSlide();
    });
});

document.querySelectorAll('.slides').forEach(slide => {
    slide.addEventListener('mouseover', () => {
        clearInterval(autoSlide);
    });

    slide.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => changeSlide(1), 2000);
    });
});

const loader = document.getElementById('loader');
const hasLoaded = sessionStorage.getItem('hasLoaded');
if (hasLoaded) {
    loader.classList.add('hidden'); // Natychmiast ukryj, jeśli już wyświetlono
} else {
    setTimeout(() => {
        loader.classList.add('hidden'); // Płynne zanikanie po 5s
        sessionStorage.setItem('hasLoaded', 'true');
    }, 5000); // 5 sekund
}

const playerNameKey = "perunUsername";
const playerPLNKey = "perunPLN";
const playerRankKey = "perunRank";

function updatePlayerName() {
    const storedValue = localStorage.getItem(playerNameKey);
    const dynamicTextElement = document.getElementById("playerName");
    if(dynamicTextElement) {
        if (localStorage.getItem("perunUsername") === "SUSpicio" && localStorage.getItem("perunUUID") === "863718d4-8c34-4e02-9a5a-86563967124c") {
            dynamicTextElement.innerHTML = 'SUSpicio <i class="fas fa-check-circle verified-icon"></i>';
        } else {
            dynamicTextElement.textContent = storedValue || "?";
        }
    }
}

function updatePlayerPLN() {
  const storedValue = localStorage.getItem(playerPLNKey);
  const dynamicTextElement = document.getElementById("playerPLN");

  if (dynamicTextElement) {
      if (storedValue && !isNaN(storedValue)) {
          dynamicTextElement.textContent = parseFloat(storedValue).toFixed(2) + " zł";
      } else {
          dynamicTextElement.textContent = "0.00 zł";
      }
  }
}
function updatePlayerRank() {
  const storedValue = localStorage.getItem(playerRankKey);
  const dynamicTextElement = document.getElementById("playerRank");

     if (storedValue && !isNaN(storedValue)) {
        dynamicTextElement.innerHTML = parseInt(storedValue) + ' <i class="fas fa-star"></i>';
    } else {
        dynamicTextElement.innerHTML = '0 <i class="fas fa-star"></i>';
    }
}

window.addEventListener("storage", (event) => {
    if (event.key === playerNameKey) {
        updatePlayerName();
    }
    if (event.key === playerRankKey) { // poprawiony klucz
        updatePlayerRank();
    }
    if (event.key === playerPLNKey) {
        updatePlayerPLN();
    }

});

updatePlayerName();
updatePlayerPLN();
updatePlayerRank();

function changeTheme(theme) {
  localStorage.setItem('theme', theme);
  document.getElementById('themeStylesheet').setAttribute('href', `style/theme/${theme}.css`);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.getElementById('themeStylesheet').setAttribute('href', `style/theme/${savedTheme}.css`);
  
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
      themeSelect.value = savedTheme;
      themeSelect.addEventListener('change', function () {
          changeTheme(this.value);
      });
  }
});

document.getElementById('sidenavOpenButton').onclick = function() {
  const sidenav = document.getElementById('sidenav');
  
  if (sidenav.classList.contains('show')) {
      sidenav.classList.remove('show');
  } else {
      sidenav.classList.add('show');
  }
};

async function getAIResponse() {
    const userAiInput = document.getElementById("userAiInput").value.trim();
    if (!userAiInput) {
        alert("Proszę wpisz pytanie!");
        return;
    }

    const chatBox = document.getElementById("chatBox");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "user-message");
    userMessageDiv.textContent = userAiInput;
    chatBox.appendChild(userMessageDiv);

    document.getElementById("userAiInput").value = "";

    // Dodanie kółka ładowania
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("message", "loading-message");
    loadingDiv.innerHTML = '<span class="spinner"></span> Oczekiwanie na odpowiedź...';
    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    const apiKey = "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";
    const data = {
        inputs: userAiInput,
        parameters: {
            max_length: 50,
            temperature: 0.7,
            top_p: 0.9,
            return_full_text: false
        }
    };

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-3-27b-it", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Usunięcie kółka ładowania po otrzymaniu odpowiedzi
        chatBox.removeChild(loadingDiv);

        if (!response.ok) {
            const errorDetails = await response.json();
            alert(`Wystąpił błąd: ${errorDetails.error || 'Nieznany błąd'}`);
            return;
        }

        const result = await response.json();
        let aiResponse = result[0]?.generated_text?.trim() || "Brak odpowiedzi od AI";

        // Zamiana **tekst** na <b>tekst</b> i ''' na <br>
        aiResponse = aiResponse
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Pogrubienie
            .replace(/'''/g, "<br>"); // Nowa linia

        const aiMessageDiv = document.createElement("div");
        aiMessageDiv.classList.add("message", "ai-message");
        aiMessageDiv.innerHTML = aiResponse; // Użycie innerHTML, aby renderować tagi HTML
        chatBox.appendChild(aiMessageDiv);

    } catch (error) {
        // Usunięcie kółka ładowania w przypadku błędu
        chatBox.removeChild(loadingDiv);
        alert(`Wystąpił błąd: ${error.message}`);
    } finally {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

//const colors = [
//    "rgb(255, 0, 0)", 
//    "rgb(255, 127, 0)", 
//    "rgb(255, 255, 0)", 
//    "rgb(0, 255, 0)", 
//    "rgb(0, 127, 127)",
//    "rgb(0, 0, 255)", 
//    "rgb(255, 0, 255)"
//];
//let index = 0;
//function changeColor() {
//    document.documentElement.style.setProperty("--button-color", colors[index]);
//    document.documentElement.style.setProperty("--button-active-color", colors[index]);
//    document.documentElement.style.setProperty("--button-hover-color", colors[index]);
//    document.documentElement.style.setProperty("--highlight-bg-color", colors[index]);
//    document.documentElement.style.setProperty("--shadow-color", colors[index]);
//    document.documentElement.style.setProperty("--border-color", colors[index]);
//    index = (index + 1) % colors.length;
//}
//setInterval(changeColor, 1000); // Zmiana koloru co 500ms

function isUsernameDemoTimeExpired() {
  const lastChange = localStorage.getItem("lastChangeTime");
  const now = Date.now();
  const lockTime = 24 * 60 * 60 * 1000;

  if (!lastChange) return true;

  return now > parseInt(lastChange) + lockTime;
}

document.addEventListener("DOMContentLoaded", function () {
  if(!isUsernameDemoTimeExpired()) {
    const sendButton = document.getElementById('sendButton')
    sendButton.disabled = true;
    sendButton.textContent = "Zablokowane";
    const sendInput = document.getElementById('chatMessage')
    sendInput.disabled = true;
  }
})

const input = document.getElementById("usernameSettingsInput");
const storageKey = "perunUsername";
const lastChangeKey = "lastChangeTime";
const lockTime = 24 * 60 * 60 * 1000;
input.value = localStorage.getItem(storageKey) || "";
const changeButton = document.getElementById("usernameChangeButton");
const countdownDisplay = document.getElementById("usernameDemoContainer");

function handleUsernameChange() {
    const lastChange = localStorage.getItem(lastChangeKey);
    const now = Date.now();
    if (input.value!="SUSpicio") {
      if (lastChange && now - parseInt(lastChange) <= lockTime) {
          alert("Nie możesz zmienić nazwy użytkownika przez 24 godziny.");
          return;
      }

      if (!confirm("Czy na pewno chcesz zmienić nazwę użytkownika?")) {
          return;
      }

      const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
      const userCode = prompt(`Aby potwierdzić, wpisz kod: ${randomCode}`);

      if (userCode === randomCode) {
          localStorage.setItem(storageKey, input.value);
          localStorage.setItem(lastChangeKey, now.toString());
          alert("Nazwa użytkownika została zmieniona.");
          changeButton.disabled = true;
          changeButton.textContent = "Zmiana nazwy zablokowana na 24h";
          startCountdown(lockTime);
          location.reload();
      } else {
          alert("Niepoprawny kod. Zmiana anulowana.");
      }
  }
}

function startCountdown(remainingTime) {
  countdownDisplay.style.display="block";
    function updateCountdown() {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        countdownDisplay.textContent = `Czas do odblokowania: ${hours}h ${minutes}m ${seconds}s`;
        
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            changeButton.disabled = false;
            changeButton.textContent = "Zmień nazwę";
            countdownDisplay.textContent="";
            countdownDisplay.style.display="none";
        }
        remainingTime -= 1000;
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

(function initialize() {
    input.value = localStorage.getItem(storageKey) || "";
    const lastChange = localStorage.getItem(lastChangeKey);
    const now = Date.now();
    
    if (lastChange) {
        const elapsedTime = now - parseInt(lastChange);
        if (elapsedTime < lockTime) {
            changeButton.disabled = true;
            changeButton.textContent = "Zmiana nazwy zablokowana na 24h";
            startCountdown(lockTime - elapsedTime);
        }
    }
})();



function initializeSwitches() {
    let switches = JSON.parse(localStorage.getItem("settingSwitches")) || settingSwitches;
    if (!localStorage.getItem("settingSwitches")) {
        localStorage.setItem("settingSwitches", JSON.stringify(switches));
    }

    const checkboxes = document.querySelectorAll('input[type="checkbox"][switchId]');
    checkboxes.forEach(checkbox => {
        const switchId = checkbox.getAttribute("switchId");
        const switchData = switches.find(s => s.switchId === switchId);
        if (switchData) {
            checkbox.checked = switchData.value;
            checkbox.addEventListener("change", () => toggleSwitch(switchId));
        }
    });
}

// Przełączanie switcha
function toggleSwitch(switchId) {
    let switches = JSON.parse(localStorage.getItem("settingSwitches"));
    const switchIndex = switches.findIndex(s => s.switchId === switchId);

    notification("Zmiana ustawień wymaga odświeżenia strony", "reload", {
        actions: [{ label: "Odśwież stronę", callback: () => location.reload() }]
    });

    if (switchIndex !== -1) {
        switches[switchIndex].value = !switches[switchIndex].value;
        localStorage.setItem("settingSwitches", JSON.stringify(switches));

        if (switchId === "01") {
            localStorage.setItem("DEVsettings", switches[switchIndex].value.toString());
        }
        if (switchId === "02" && !switches[switchIndex].value) {
            sessionStorage.removeItem("openModals"); // Wyczyść zapis modalów w sessionStorage
        }
    }
}
function resetSwitches() {
    localStorage.setItem("settingSwitches", JSON.stringify(settingSwitches));
    localStorage.setItem("DEVsettings", "false")
}
// Inicjalizacja po załadowaniu strony
document.addEventListener("DOMContentLoaded", function () {
    const storedSwitches = JSON.parse(localStorage.getItem("settingSwitches")) || [];

    if (storedSwitches.length != settingSwitches.length) {
        localStorage.setItem("settingSwitches", JSON.stringify(settingSwitches));
        location.reload();
    }
    initializeSwitches();
    restoreModalState(); // Przywróć zapisane modale przy załadowaniu strony
    initializeFontSizeSlider();
});
function initializeFontSizeSlider() {
    const slider = document.getElementById("chatFontSizeSlider");

    // Odczytaj zapisaną wartość z localStorage lub ustaw domyślną (16px)
    const savedFontSize = localStorage.getItem("chatMessageFontSize") || "16";
    slider.value = savedFontSize;
    document.documentElement.style.setProperty("--chatMessageFontSize", `${savedFontSize}px`);

    // Listener na zmianę wartości suwaka
    slider.addEventListener("input", () => {
        const newSize = slider.value;
        document.documentElement.style.setProperty("--chatMessageFontSize", `${newSize}px`);
        localStorage.setItem("chatMessageFontSize", newSize);
    });
}


document.getElementById('ratingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    document.getElementById('opinionSubmit').disabled=true;
    const rating = document.querySelector('input[name="rating"]:checked');
    const whattodo = document.getElementById("whattodoratingform");

    if (!username || !rating) {
        document.getElementById('ratingFormErrorMessage').style.display = 'block';
        return;
    }

    const formData = {
        action: "addRating", // Nowa akcja dla oceny
        sessionId: localStorage.getItem("perunUUID") || "",
        username: localStorage.getItem("perunUsername") || "",
        rating: rating.value,
        whattodo: whattodo.value,
        timestamp: new Date().toISOString()
    };

    try {
        document.getElementById('opinionSubmit').textContent = 'Wysyłanie...';
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            mode: "no-cors" // Utrzymane dla zgodności z Twoim API
        });
        document.getElementById('ratingForm').reset();
        document.getElementById('ratingFormErrorMessage').style.display = "none";
    } catch (error) {
        document.getElementById('opinionSubmit').textContent = 'Wyślij';
        console.error("Błąd wysyłania:", error);
        alert("Wystąpił błąd podczas wysyłania oceny.");
        document.getElementById('opinionSubmit').disabled = false; // Add this
    }
});

const ratingLabels = document.querySelectorAll('.rating label');
ratingLabels.forEach(label => {
    label.addEventListener('mouseover', function() {
        const value = this.getAttribute('for').replace('star', '');
        for (let i = 1; i <= 10; i++) {
            const currentLabel = document.querySelector(`label[for="star${i}"]`);
            if (i <= value) {
                currentLabel.style.color = '#ffca08';
            } else {
                currentLabel.style.color = '#ddd';
            }
        }
    });

    label.addEventListener('mouseout', function() {
        const checked = document.querySelector('input[name="rating"]:checked');
        const checkedValue = checked ? checked.value : 0;
        for (let i = 1; i <= 10; i++) {
            const currentLabel = document.querySelector(`label[for="star${i}"]`);
            if (i <= checkedValue) {
                currentLabel.style.color = '#ffca08';
            } else {
                currentLabel.style.color = '#ddd';
            }
        }
    });
});

function toggleDropdown(dropdownId) {
    document.getElementById(dropdownId).classList.toggle("show");
  }
  
  // Zamknij dropdown, jeśli klikniesz poza nim
  window.onclick = function(event) {
    if (!event.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-content').forEach(menu => {
        menu.classList.remove("show");
      });
    }
  };

  function scrollToSection(sectionId, gameContainerId) {
    // Przewijanie na samą górę strony
    if (sectionId === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        modalClose('navigationModal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // Przewijanie na sam dół strony
    if (sectionId === 1) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        modalClose('navigationModal');
        return;
    }

    // Wybór elementu do przewinięcia
    let targetElement;
    if (sectionId === 'game-container' && gameContainerId) {
        targetElement = document.getElementById(`game-container-${gameContainerId}`);
    } else {
        targetElement = document.getElementById(sectionId);
    }

    // Przewijanie do elementu z przesunięciem 150px w górę
    if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 125; // Przesunięcie 150px w górę

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        modalClose('navigationModal');
    }
}

// Opcjonalnie: dodaj obsługę klas dla wielu kontenerów gier
document.querySelectorAll('.game-container').forEach((container, index) => {
    container.id = `game-container-${index}`;
});
function updateRanking() {
    fetch(`${API_URL}?action=getRankingData`, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Błąd sieci: ' + response.status);
      }
      return response.json();
    })
    .then(ranking => {
        ranking.sort((a, b) => {
            const rankDiff = parseInt(b.rank) - parseInt(a.rank);
            if (rankDiff !== 0) return rankDiff;
            const pointsDiff = parseInt(b.points) - parseInt(a.points);
            if (pointsDiff !== 0) return pointsDiff;
            return parseFloat(b.pln) - parseFloat(a.pln);
        });
  
        const tbody = document.getElementById('rankingBody');
        tbody.innerHTML = '';
        ranking.forEach((user, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.rank}</td>
            <td>${user.points}</td>
            <td>${parseFloat(user.pln).toFixed(2)}</td>
            <td>${user.doneAchievements || '0'}/${achievementsData.length}</td>
          `;
          tbody.appendChild(row);
        });
        document.getElementById("rankingMessage").innerHTML='Ranking zaktualizowany: ' + new Date().toLocaleString();
      })
      .catch(error => {
        console.error('Błąd podczas aktualizacji rankingu:', error);
      });
}

// Funkcja wysyłająca dane z localStorage
function sendLocalData() {
    const perunUUID = localStorage.getItem('perunUUID') || '';
    const perunUsername = localStorage.getItem('perunUsername') || 'Anonim';
    const perunPoints = localStorage.getItem('perunPoints') || '0';
    const perunRank = localStorage.getItem('perunRank') || '0';
    const perunPLN = localStorage.getItem('perunPLN') || '0';
    const doneAchievements = JSON.parse(localStorage.getItem('completedAchievementsIds') || '[]').length || 0;
  
    if (!perunUUID) {
      console.warn('Brak perunUUID w localStorage');
      return;
    }
  
    const payload = {
      action: "updateRankingFromLocal",
      perunUUID: perunUUID,
      perunUsername: perunUsername,
      perunPoints: perunPoints,
      perunRank: perunRank,
      perunPLN: perunPLN,
      doneAchievements: doneAchievements,
      timestamp: new Date().toISOString()
    };
  
    fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .catch(error => {
        console.error('Błąd podczas wysyłania danych:', error);
      });
}

// Inicjalizacja przy załadowaniu strony
document.addEventListener('DOMContentLoaded', function () {
    updateRanking();
    setInterval(updateRanking, 15000);
    sendLocalData();
    setInterval(sendLocalData, 5000);
});
document.addEventListener('DOMContentLoaded', function () {
    const developerSwitch = switches.find(s => s.switchId === "01");
    if (developerSwitch && developerSwitch.value) {
        document.getElementById("consoleButton").style.display="block";
    } else {
        document.getElementById("consoleButton").style.display="none";     
    }
});
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    quickNotification("Skopiowano do schowka!");
}

const pageBuilder = {
    currentSlide: 1,
    totalSlides: 4,
    storageKey: 'pageBuilder_pages',
    pages: [],
    lastSaveTime: null,
    previewWindow: null,

    init: function() {
        this.loadPage();
        this.addInputListeners();
        this.updateNavigation();
        this.updateStatus();
    },

    loadPage: function() {
        const savedPages = localStorage.getItem(this.storageKey);
        this.pages = savedPages ? JSON.parse(savedPages) : [this.createEmptyPage()];
        this.loadCurrentData();
    },

    createEmptyPage: function() {
        return { title: '', body: '', style: '', script: '' };
    },

    loadCurrentData: function() {
        const page = this.pages[0];
        document.getElementById('pageBuilderTitle').value = page.title;
        document.getElementById('pageBuilderBody').value = page.body;
        document.getElementById('pageBuilderStyle').value = page.style;
        document.getElementById('pageBuilderScript').value = page.script;
    },

    savePage: function() {
        this.pages[0] = {
            title: document.getElementById('pageBuilderTitle').value,
            body: document.getElementById('pageBuilderBody').value,
            style: document.getElementById('pageBuilderStyle').value,
            script: document.getElementById('pageBuilderScript').value
        };
        localStorage.setItem(this.storageKey, JSON.stringify(this.pages));
        this.lastSaveTime = new Date();
        this.updateStatus();
    },

    addInputListeners: function() {
        ['Title', 'Body', 'Style', 'Script'].forEach(field => {
            document.getElementById(`pageBuilder${field}`).addEventListener('input', () => {
                this.savePage();
            });
        });
    },

    updateNavigation: function() {
        document.getElementById('pageBuilderPrevBtn').disabled = this.currentSlide === 1;
        document.getElementById('pageBuilderNextBtn').disabled = this.currentSlide === this.totalSlides;
    },

    updateStatus: function() {
        const status = document.getElementById('pageBuilderStatus');
        status.textContent = this.lastSaveTime 
            ? `Zapisano: ${this.lastSaveTime.toLocaleTimeString()}`
            : 'Zapisano: Nigdy';
    }
};

function pageBuilderShowSlide(slideNum) {
    for (let i = 1; i <= pageBuilder.totalSlides; i++) {
        document.getElementById(`pageBuilderSlide${i}`).classList.remove('active');
    }
    document.getElementById(`pageBuilderSlide${slideNum}`).classList.add('active');
    pageBuilder.updateNavigation();
}

function pageBuilderNextSlide() {
    if (pageBuilder.currentSlide < pageBuilder.totalSlides) {
        pageBuilder.currentSlide++;
        pageBuilderShowSlide(pageBuilder.currentSlide);
    }
}

function pageBuilderPrevSlide() {
    if (pageBuilder.currentSlide > 1) {
        pageBuilder.currentSlide--;
        pageBuilderShowSlide(pageBuilder.currentSlide);
    }
}

function pageBuilderSaveAndPreview() {
    pageBuilder.savePage();
    
    const page = pageBuilder.pages[0];
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${page.title}</title>
            <style>${page.style}</style>
        </head>
        <body>
            ${page.body}
            <script>${page.script}<\/script>
        </body>
        </html>
    `;

    // Zamykamy poprzednie okno, jeśli istnieje
    if (pageBuilder.previewWindow && !pageBuilder.previewWindow.closed) {
        pageBuilder.previewWindow.close();
    }

    // Otwieramy nowe okno
    pageBuilder.previewWindow = window.open('', '_blank');
    if (pageBuilder.previewWindow) {
        pageBuilder.previewWindow.document.open();
        pageBuilder.previewWindow.document.write(htmlContent);
        pageBuilder.previewWindow.document.close();
    } else {
        alert('Nie udało się otworzyć podglądu. Sprawdź, czy przeglądarka nie blokuje wyskakujących okien.');
    }
}

function pageBuilderExport() {
    pageBuilder.savePage();
    const page = pageBuilder.pages[0];
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<title>${page.title}</title>
<style>${page.style}</style>
</head>
<body>
${page.body}
<script>${page.script}<\/script>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${page.title || 'strona'}.html`;
    a.click();
    URL.revokeObjectURL(url);
}

function pageBuilderClear() {
    if (confirm('Czy na pewno chcesz wyczyścić wszystkie dane?')) {
        pageBuilder.pages[0] = pageBuilder.createEmptyPage();
        pageBuilder.loadCurrentData();
        pageBuilder.savePage();
    }
}

// Initialize
pageBuilder.init();