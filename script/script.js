let isScrolling = false;
let lastScrollY = 0;
const threshold = 1;
const element = document.querySelector('#parallaxEnd');

function getElementPosition() {
    const rect = element.getBoundingClientRect();
    return rect.top + window.scrollY - 150;
}

function checkadfree() {
  console.log(window.location.href);
  if(window.location.href != 'https://suspicioyt.github.io/perungameverse' || window.location.href != 'https://suspicioyt.github.io/perungameverse/') {
    document.getElementById('noadversionContainer').innerHTML='<div id="noadversion">Wersja bez reklam: <a href="https://suspicioyt.github.io/perungameverse">suspicioyt.github.io/perungameverse</a></div>'
  }
}
checkadfree();
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
        }

        if (!isScrolling && currentScrollY < lastScrollY && currentScrollY > 0) {
            smoothScrollTo(0);
            var header = document.querySelector('header');
            header.classList.remove('scrolled');
        }
        lastScrollY = currentScrollY;
    }
});
document.addEventListener('DOMContentLoaded', function () {
  checkadfree();

  const currentScrollY = window.scrollY;
  const elementHeight = element.offsetHeight;
  if (elementHeight <= currentScrollY) {
    var header = document.querySelector('header');
    header.classList.add('scrolled');
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
  }
}

function modalClose(modalId) {
  const modalElement = document.getElementById(modalId);
  if (modalElement) {
      modalElement.classList.remove("show");
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      const modal = document.querySelector('.modal.show');
      if (modal) {
          modal.classList.remove("show");
      }
  }
});

document.addEventListener('click', (event) => {
  const modal = document.querySelector('.modal.show');
  if (modal && event.target === modal) {
      modal.classList.remove("show");
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

    document.getElementById("usernameDisplay").textContent = storedUsername;
  } else {
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
    if (username === 'SUSpicio' || username === 'DEV') {
      document.getElementById("errorMessage").style.display = 'block';
      return;
    }    
    if (username) {
      localStorage.setItem("perunUsername", username);
      localStorage.setItem("perunUUID", generateUUID());

      const linkToRemove = document.getElementById('fireworksStyles');
      if (linkToRemove) {
        linkToRemove.remove();
      }

      document.getElementById("welcomeModal").style.display = 'none';

      document.getElementById("usernameDisplay").textContent = `Witaj, ${username}!`;
      document.getElementById("player-name").textContent = username;
      
    } else {
      document.getElementById("errorMessage").style.display = 'block';
    }
  });
});

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function downFunction() {
  document.body.scrollTop = 1000000000;
  document.documentElement.scrollTop = 1000000000;
}

var countDownDate = new Date("Mar 13, 2025 18:00:00").getTime();
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

window.onload = function() {
  loadPlayerData();
};


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
window.addEventListener("load", () => {
  const loaderContainer = document.querySelector(".loader-container");

  if (!sessionStorage.getItem("loaded")) {
      sessionStorage.setItem("loaded", "true");
      loaderContainer.style.display = "flex";
      setTimeout(() => {
          loaderContainer.style.display = "none";
          location.reload();
      }, 4000); 
  } else {
      loaderContainer.style.display = "none";
  }
});

const playerNameKey = "perunUsername";
const playerPLNKey = "perunPLN";

function updateDynamicText(key, elementId, defaultMessage) {
    const storedValue = localStorage.getItem(key);
    const dynamicTextElement = document.getElementById(elementId);

    if (dynamicTextElement) {
        dynamicTextElement.textContent = storedValue || defaultMessage;
    }
}

function updatePlayerName() {
    updateDynamicText(playerNameKey, "playerName", "?");
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
function updatePlayerPoints() {
  const storedValue = localStorage.getItem(playerPLNKey);
  const dynamicTextElement = document.getElementById("playerPLN");

  if (dynamicTextElement) {
      if (storedValue && !isNaN(storedValue)) {
          dynamicTextElement.textContent = parseFloat(storedValue).toFixed(2) + " zł";
      } else {
          dynamicTextElement.textContent = "-";
      }
  }
}

window.addEventListener("storage", (event) => {
    if (event.key === playerNameKey) {
        updatePlayerName();
    } else if (event.key === playerPLNKey) {
        updatePlayerPLN();
    }
});

updatePlayerName();
updatePlayerPLN();

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

document.getElementById('perunAIbuttonOpen').onclick = function() {
  const aiDiv = document.getElementById('perunAI');
  const aiButton = document.getElementById('perunAIbuttonOpen');
  
  if (aiDiv.classList.contains('show')) {
      aiDiv.classList.remove('show');
      aiButton.classList.remove('active');
  } else {
      aiDiv.classList.add('show');
      aiButton.classList.add('active');
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

  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "block";

  const apiKey = "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";

  const data = {
      inputs: userAiInput,
      options: {
          use_cache: false,
          max_length: 30,  
          temperature: 0.2,  
          top_p: 0.8,
          no_repeat_ngram_size: 2, 
      }
  };

  try {
      const response = await fetch("https://api-inference.huggingface.co/models/distilgpt2", {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          const errorDetails = await response.json();
          alert(`Wystąpił błąd: ${errorDetails.error || 'Nieznany błąd'}`);
          return;
      }

      const result = await response.json();
      const aiResponse = result[0]?.generated_text?.trim() || 'Brak odpowiedzi od AI';

      const aiMessageDiv = document.createElement("div");
      aiMessageDiv.classList.add("message", "ai-message");
      aiMessageDiv.textContent = aiResponse;
      chatBox.appendChild(aiMessageDiv);

  } catch (error) {
      alert(`Wystąpił błąd: ${error.message}`);
  } finally {
      loadingDiv.style.display = "none"; 
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
function toggleDevMode() {
  const currentMode = localStorage.getItem("DEVsettings") === "true";
  localStorage.setItem("DEVsettings", currentMode ? "false" : "true");
  loadChatMessages();
  document.getElementById("devToggle").checked = currentMode ? false : true;
}
document.addEventListener("DOMContentLoaded", function () {
  if(localStorage.getItem("DEVsettings") === "true") {
    document.getElementById("devToggle").checked=true;
  }
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