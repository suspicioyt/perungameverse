let animalHatched = false;
let animal = null;
let animalDiv;
let safes = [];
let gameArea = document.getElementById('gameArea');
const egg = document.getElementById("egg");
const hatchEggBtn = document.getElementById("hatchEggBtn");
const animals = ["🐣", "🐶", "🐱", "🐰", "🦄"];
let targetSafe = null;
let money = 100;  // Gracz zaczyna z 100 pieniędzmi
const moneyDisplay = document.getElementById("moneyAmount");
const buyEggBtn = document.getElementById("buyEggBtn");

// HP sejfów
const safeHealth = {};

moneyDisplay.textContent = money;  // Wyświetlamy początkową ilość pieniędzy

function moveToSafe(safe) {
    let animalPos = animalDiv.getBoundingClientRect();
    let safePos = safe.getBoundingClientRect();
    let dx = safePos.left + safePos.width / 2 - animalPos.left - animalPos.width / 2;
    let dy = safePos.top + safePos.height / 2 - animalPos.top - animalPos.height / 2;
    let angle = Math.atan2(dy, dx);
    let speed = 3;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
        animalDiv.style.left = animalPos.left + Math.cos(angle) * speed + "px";
        animalDiv.style.top = animalPos.top + Math.sin(angle) * speed + "px";

        if (distance < 50) {
            damageSafe(safe);
        }

        requestAnimationFrame(() => moveToSafe(safe));
    } else {
        animalDiv.style.left = safePos.left + safePos.width / 2 - animalPos.width / 2 + "px";
        animalDiv.style.top = safePos.top + safePos.height / 2 - animalPos.height / 2 + "px";
    }
}

function damageSafe(safe) {
    const safeId = safes.indexOf(safe);
    if (safeHealth[safeId] > 0) {
        let damage = Math.floor(Math.random() * 5) + 1;
        safeHealth[safeId] -= damage;
        console.log(`${animal} zadał ${damage} obrażeń sejfowi! HP sejfu: ${safeHealth[safeId]}`);
    }

    if (safeHealth[safeId] <= 0) {
        alert(`${animal} zniszczył sejf!`);
        money += 10;  // Dodajemy pieniądze za zniszczenie sejfu
        moneyDisplay.textContent = money;
        safes.splice(safeId, 1);
        gameArea.removeChild(safe);
        dropMoney(safe);  // Wypadające pieniądze
    }
}

function dropMoney(safe) {
    let moneyDiv = document.createElement("div");
    moneyDiv.textContent = "$";
    moneyDiv.style.position = "absolute";
    moneyDiv.style.top = safe.style.top;
    moneyDiv.style.left = safe.style.left;
    moneyDiv.style.fontSize = "24px";
    moneyDiv.style.color = "gold";
    gameArea.appendChild(moneyDiv);

    let interval = setInterval(() => {
        let moneyPos = moneyDiv.getBoundingClientRect();
        moneyDiv.style.top = moneyPos.top - 5 + "px";

        if (moneyPos.top < 0) {
            clearInterval(interval);
            gameArea.removeChild(moneyDiv);
        }
    }, 50);
}

function hatchEgg() {
    if (money >= 100) {
        money -= 100;  // Odejmuje 100 pieniędzy za wyklucie jajka
        moneyDisplay.textContent = money;
        hatchEggBtn.disabled = true;
        egg.classList.add("hatching");
        setTimeout(() => {
            egg.classList.remove("hatching");
            animal = animals[Math.floor(Math.random() * animals.length)];
            animalDiv = document.createElement('div');
            animalDiv.textContent = animal;
            animalDiv.classList.add('animal');
            animalDiv.style.position = 'absolute';
            animalDiv.style.left = '0px';
            animalDiv.style.top = '50vh';
            gameArea.appendChild(animalDiv);
            animalHatched = true;
            generateSafes();  // Generowanie sejfów po wykluciu zwierzaka
        }, 1000);
    } else {
        alert("Nie masz wystarczająco pieniędzy!");
    }
}

function generateSafes() {
    for (let i = 0; i < 5; i++) {
        const safe = document.createElement('div');
        safe.classList.add('safe');
        let x = Math.random() * 70 + 10;
        let y = Math.random() * 70 + 10;

        safe.style.left = `${x}vw`;
        safe.style.top = `${y}vh`;
        safe.addEventListener('click', function() { targetSafe = safe; });

        safes.push(safe);
        safeHealth[safes.length - 1] = 50;  // Każdy sejf ma 50 HP
        gameArea.appendChild(safe);
    }
}

buyEggBtn.addEventListener("click", function() {
    if (money >= 100) {
        hatchEgg();  // Wykonujemy funkcję hatchEgg po kliknięciu przycisku "Kup Jajko"
    } else {
        alert("Nie masz wystarczająco pieniędzy!");
    }
});
