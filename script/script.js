let isScrolling = false;
let lastScrollY = 0;
const threshold = 1;
const element = document.querySelector('#parallaxEnd');

function getElementPosition() {
    const rect = element.getBoundingClientRect();
    return rect.top + window.scrollY - 150; // Pozycja elementu względem całej strony
}
function checkadfree() {
  console.log(window.location.href);
  if(window.location.href != 'https://suspicioyt.github.io/perungameverse') {
    document.getElementById('noadversionContainer').innerHTML='<div id="noadversion">Wersja bez reklam: <a href="https://suspicioyt.github.io/perungameverse">suspicioyt.github.io/perungameverse</a></div>'
  }
  
}
// Funkcja płynnego przewijania
function smoothScrollTo(target) {
    isScrolling = true;
    window.scrollTo({
        top: target,
        behavior: 'smooth',
    });

    // Odblokowanie przewijania po animacji
    setTimeout(() => {
        isScrolling = false;
    }, 100); // Czas dopasowany do długości animacji
}

// Obsługa zdarzenia scrolla
window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    const elementHeight = element.offsetHeight;

    // Sprawdzenie, czy scroll mieści się w przedziale 0 a wysokość elementu
    if (currentScrollY >= 0 && currentScrollY <= (getElementPosition() + elementHeight)) {
        // Sprawdzamy, czy różnica w przewijaniu jest wystarczająca, aby wykonać akcję
        if (Math.abs(currentScrollY - lastScrollY) < threshold) {
            return; // Ignorujemy małe zmiany w przewinięciu
        }

        // Przewijanie w dół
        if (!isScrolling && currentScrollY > lastScrollY) {
            smoothScrollTo(getElementPosition()); // Przewiń do elementu docelowego
            var header = document.querySelector('header');
            header.classList.add('scrolled');
        }

        // Przewijanie w górę
        if (!isScrolling && currentScrollY < lastScrollY && currentScrollY > 0) {
            smoothScrollTo(0); // Przewiń na początek strony
            var header = document.querySelector('header');
            header.classList.remove('scrolled');
        }
        lastScrollY = currentScrollY; // Zaktualizuj ostatnią pozycję
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

document.getElementById('searchInput').onkeyup = function(){
  var input, filter, containers, box, a, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  containers = document.getElementsByClassName("game-container");

  // Iteracja przez wszystkie kontenery
  for (i = 0; i < containers.length; i++) {
      box = containers[i].getElementsByClassName("game-box");  // Pobierz wszystkie "game-box" w danym kontenerze

      // Iteracja przez wszystkie "game-box" w kontenerze
      for (let j = 0; j < box.length; j++) {
          a = box[j].getElementsByTagName("h2")[0];  // Pobierz pierwszy tag <h2>
          if (a) {  // Sprawdzenie, czy tag <h2> istnieje
              txtValue = a.textContent || a.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  box[j].style.display = "";  // Jeśli pasuje, pokaż element
              } else {
                  box[j].style.display = "none";  // Jeśli nie pasuje, ukryj element
              }
          }
      }
  }
}

window.onclick = function(event) {
  const dropdown = document.getElementById("dropdownFiltres");

  // Jeśli kliknięto poza przyciskiem lub menu
  if (!event.target.matches('.filterdropbtn') && !event.target.matches('.dropdownFiltres-content') && !event.target.closest('.dropdownFiltres-content')) {
      if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
      }
  }
};


function filterSelection(category) {
  const boxes = document.querySelectorAll(".game-box");

  boxes.forEach((box) => {
    // Pobierz listę kategorii przypisaną do elementu
    const boxCategories = box.className.split(" ");

    if (category === "all" || boxCategories.includes(category)) {
      box.style.display = ""; // Pokaż element
    } else {
      box.style.display = "none"; // Ukryj element
    }
  });
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

// Zamknięcie modalu po naciśnięciu Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      const modal = document.querySelector('.modal.show');
      if (modal) {
          modal.classList.remove("show");
      }
  }
});

// Zamknięcie modalu po kliknięciu w tło
document.addEventListener('click', (event) => {
  const modal = document.querySelector('.modal.show');
  if (modal && event.target === modal) {
      modal.classList.remove("show");
  }
});




document.addEventListener('DOMContentLoaded', function () {
  // Sprawdzanie, czy nazwa użytkownika jest zapisana w localStorage
  const storedUsername = localStorage.getItem("perunUsername");
  let points = parseFloat(localStorage.getItem('perunPoints')) || 0;

  if (storedUsername) {
    // Jeśli nazwa użytkownika jest zapisana, ukrywamy ekran powitalny (modal)
    document.getElementById("welcomeModal").style.display = 'none';

    // Wyświetlanie nazwy użytkownika na stronie (można to zrobić np. w nagłówku)
    document.getElementById("usernameDisplay").textContent = storedUsername;
  } else {
    // Jeśli nie ma zapisanej nazwy, wyświetlamy ekran powitalny (modal)
    document.getElementById("welcomeModal").style.display = 'block';

    // Dynamicznie dodaj plik CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'effects/fireworks.css';
    link.id = 'fireworksStyles'; // Nadaj unikalne id
    document.head.appendChild(link);
}

  // Funkcja zapisu nazwy użytkownika do localStorage
  document.getElementById("saveUsernameBtn").addEventListener("click", function () {
    localStorage.setItem("DEVsettings","false");
    const username = document.getElementById("usernameInput").value.trim();
    if (username === 'SUSpicio' || username === 'DEV') {
      document.getElementById("errorMessage").style.display = 'block';
      return;
    }    
    if (username) {
      // Zapisanie nazwy użytkownika w localStorage
      localStorage.setItem("perunUsername", username);

      const linkToRemove = document.getElementById('fireworksStyles');
      if (linkToRemove) {
        linkToRemove.remove(); // Usuwa element z DOM
      }

      // Ukrycie formularza i pokazanie wiadomości powitalnej
      document.getElementById("welcomeModal").style.display = 'none';

      // Wyświetlanie nazwy użytkownika na stronie
      document.getElementById("usernameDisplay").textContent = `Witaj, ${username}!`;
      document.getElementById("player-name").textContent = username;
      
    } else {
      // Jeśli nazwa nie została wprowadzona, pokazujemy komunikat o błędzie
      document.getElementById("errorMessage").style.display = 'block';
    }
  });
});

// When the user clicks on the button, scroll to the top of the document
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

// Wywołanie funkcji po załadowaniu strony
window.onload = function() {
  loadPlayerData();
};


let slideIndex = 0; // Ustawienie na 0, bo indeksy zaczynają się od 0
showSlides(slideIndex);

// Funkcja do zmiany slajdów na podstawie indeksu
function showSlides(n) {
    const slides = document.querySelectorAll('.slides');
    const dots = document.querySelectorAll('.dot');

    if (n >= slides.length) slideIndex = 0; // Jeśli przekroczyliśmy liczbę slajdów, wracamy do 0
    if (n < 0) slideIndex = slides.length - 1; // Jeśli n jest mniejsze niż 0, idziemy do ostatniego slajdu

    slides.forEach(slide => slide.style.display = "none"); // Ukryj wszystkie slajdy
    dots.forEach(dot => dot.classList.remove("active")); // Usuń aktywne klasy z wszystkich punktów

    slides[slideIndex].style.display = "block"; // Wyświetl bieżący slajd
    dots[slideIndex].classList.add("active"); // Dodaj aktywną klasę do bieżącego punktu
}

// Funkcja do zmiany slajdów za pomocą przycisków
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Funkcja do zmiany slajdów na podstawie wybranego punktu
function currentSlide(n) {
    showSlides(slideIndex = n - 1); // Indeksowanie w tablicach zaczyna się od 0, więc odejmujemy 1
}

// Obsługa automatycznego pokazu slajdów
let autoSlide = setInterval(() => changeSlide(1), 3000);

// Pauzowanie automatycznego pokazu podczas interakcji użytkownika
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => changeSlide(1), 3000); // Restartujemy automatyczny pokaz
}

// Dodanie obsługi kliknięć dla przycisków i punktów
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
        currentSlide(index + 1); // Przesuwamy o 1, bo punkty zaczynają się od 1, a tablica od 0
        resetAutoSlide();
    });
});

// Zatrzymanie automatycznego przewijania, gdy użytkownik najedzie na slajd
document.querySelectorAll('.slides').forEach(slide => {
    slide.addEventListener('mouseover', () => {
        clearInterval(autoSlide); // Zatrzymujemy automatyczne przewijanie
    });

    // Wznawianie automatycznego przewijania, gdy użytkownik opuści slajd
    slide.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => changeSlide(1), 2000); // Wznawiamy automatyczne przewijanie
    });
});
// script.js
window.addEventListener("load", () => {
  const loaderContainer = document.querySelector(".loader-container");

  // Sprawdzenie, czy strona została załadowana wcześniej w tej sesji
  if (!sessionStorage.getItem("loaded")) {
      // Jeśli nie, ustawiamy flagę w sessionStorage
      sessionStorage.setItem("loaded", "true");
      loaderContainer.style.display = "flex";  // Pokazuje loadera
      // Wyświetlenie loadera przez 5 sekund, jeśli strona nie była wcześniej załadowana
      setTimeout(() => {
          loaderContainer.style.display = "none";  // Znika loader
          location.reload();
      }, 4000); // Animacja trwa 5 sekund
  } else {
      // Jeśli strona została już załadowana w tej sesji, ukrywamy loader natychmiast
      loaderContainer.style.display = "none";
  }
});

// Klucze używane w localStorage
const playerNameKey = "perunUsername";
const playerPLNKey = "perunPLN";

// Funkcja do aktualizacji dynamicznego napisu
function updateDynamicText(key, elementId, defaultMessage) {
    const storedValue = localStorage.getItem(key);
    const dynamicTextElement = document.getElementById(elementId);

    if (dynamicTextElement) {
        dynamicTextElement.textContent = storedValue || defaultMessage;
    }
}

// Funkcje specyficzne dla gracza
function updatePlayerName() {
    updateDynamicText(playerNameKey, "playerName", "?");
}

function updatePlayerPLN() {
  const storedValue = localStorage.getItem(playerPLNKey);
  const dynamicTextElement = document.getElementById("playerPLN");

  if (dynamicTextElement) {
      // Sprawdzenie, czy wartość jest liczbą, a jeśli tak, to zaokrąglenie do 2 miejsc po przecinku
      if (storedValue && !isNaN(storedValue)) {
          dynamicTextElement.textContent = parseFloat(storedValue).toFixed(2) + " zł"; // Zaokrąglenie do 2 miejsc po przecinku
      } else {
          dynamicTextElement.textContent = "0.00 zł";
      }
  }
}
function updatePlayerPoints() {
  const storedValue = localStorage.getItem(playerPLNKey);
  const dynamicTextElement = document.getElementById("playerPLN");

  if (dynamicTextElement) {
      // Sprawdzenie, czy wartość jest liczbą, a jeśli tak, to zaokrąglenie do 2 miejsc po przecinku
      if (storedValue && !isNaN(storedValue)) {
          dynamicTextElement.textContent = parseFloat(storedValue).toFixed(2) + " zł"; // Zaokrąglenie do 2 miejsc po przecinku
      } else {
          dynamicTextElement.textContent = "-";
      }
  }
}

// Automatyczne odświeżanie napisów po zmianie w localStorage
window.addEventListener("storage", (event) => {
    if (event.key === playerNameKey) {
        updatePlayerName();
    } else if (event.key === playerPLNKey) {
        updatePlayerPLN();
    }
});

// Wywołanie początkowe
updatePlayerName();
updatePlayerPLN();

// Funkcja zmiany motywu
function changeTheme(theme) {
  localStorage.setItem('theme', theme);
  document.getElementById('themeStylesheet').setAttribute('href', `style/theme/${theme}.css`);
}

// Funkcja inicjalizująca motyw po załadowaniu strony
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.getElementById('themeStylesheet').setAttribute('href', `style/theme/${savedTheme}.css`);
  
  // Ustawienie wartości selecta
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
      themeSelect.value = savedTheme;
      themeSelect.addEventListener('change', function () {
          changeTheme(this.value);
      });
  }
});

// Funkcja otwierająca/zamykająca sidenav
document.getElementById('sidenavOpenButton').onclick = function() {
  const sidenav = document.getElementById('sidenav');
  
  // Zmieniamy klasę 'show' na elemencie sidenav
  if (sidenav.classList.contains('show')) {
      sidenav.classList.remove('show');  // Zamknij menu
  } else {
      sidenav.classList.add('show');     // Otwórz menu
  }
};

document.getElementById('perunAIbuttonOpen').onclick = function() {
  const aiDiv = document.getElementById('perunAI');
  const aiButton = document.getElementById('perunAIbuttonOpen');
  
  // Zmieniamy klasę 'show' na elemencie sidenav
  if (aiDiv.classList.contains('show')) {
      aiDiv.classList.remove('show');  // Zamknij menu
      aiButton.classList.remove('active');
  } else {
      aiDiv.classList.add('show');     // Otwórz menu
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
  const lockTime = 24 * 60 * 60 * 1000; // 24 godziny w milisekundach

  if (!lastChange) return true; // Jeśli nie ma zapisu, uznajemy, że czas wygasł

  return now > parseInt(lastChange) + lockTime;
}
function toggleDevMode() {
  const currentMode = localStorage.getItem("DEVsettings") === "true";
  localStorage.setItem("DEVsettings", currentMode ? "false" : "true");
  loadChatMessages(); // Odśwież wiadomości, aby pokazać/zakryć ID
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

// Inicjalizacja po załadowaniu strony
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