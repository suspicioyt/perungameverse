// Gracz
let player = {
    name: "Gracz",
    health: 100,
    level: 1,
    experience: 0,
    gold: 0,
    attack: 20,
    potions: 3,
};

// Przeciwnik
let enemy = {
    name: "Goblin",
    health: 50,
    attack: 15
};

// Start gry
document.getElementById("startGameBtn").addEventListener("click", startGame);

function startGame() {
    openModal("statsModal");
}

// Otwarcie modala
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Zamknięcie modala
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Losowe zdarzenie
function triggerRandomEvent() {
    const event = Math.random();
    if (event < 0.33) {
        openNotification('Znalazłeś złoto! +50');
        player.gold += 50;
    } else if (event < 0.66) {
        openNotification("Spotkałeś wroga! Walka!");
        triggerFight();
    } else {
        openNotification("Nic się nie stało, przechodzisz dalej.");
    }
}

// Powiadomienie
function openNotification(message) {
    document.getElementById("notificationText").innerHTML = message;
    openModal("notificationModal");
}

// Sklep
function openShop() {
    openModal("shopModal");
}

function buyItem(item) {
    if (item === 'Miecz' && player.gold >= 100) {
        player.attack += 10;
        player.gold -= 100;
        openNotification("Kupiono Miecz! +10 do ataku");
    } else if (item === 'Zbroja' && player.gold >= 150) {
        player.health += 20;
        player.gold -= 150;
        openNotification("Kupiono Zbroję! +20 do zdrowia");
    } else if (item === 'Eliksir' && player.gold >= 50) {
        player.potions += 1;
        player.gold -= 50;
        openNotification("Kupiono Eliksir!");
    } else {
        openNotification("Nie masz wystarczająco złota.");
    }
}

// Walki
function triggerFight() {
    openModal("fightModal");
    document.getElementById("enemyName").textContent = enemy.name;
    document.getElementById("enemyHealth").textContent = enemy.health;
    document.getElementById("playerHealthFight").textContent = player.health;
}

function attackEnemy() {
    const damage = Math.floor(Math.random() * (player.attack / 2)) + 1;
    enemy.health -= damage;
    openNotification(`Zadałeś ${damage} obrażeń ${enemy.name}!`);
    if (enemy.health <= 0) {
        openNotification(`${enemy.name} został pokonany!`);
        player.experience += 10;
        player.gold += 20;
        closeModal("fightModal");
    } else {
        enemyAttack();
    }
}

function enemyAttack() {
    const damage = Math.floor(Math.random() * enemy.attack) + 5;
    player.health -= damage;
    openNotification(`${enemy.name} atakuje! Zadał Ci ${damage} obrażeń.`);
    if (player.health <= 0) {
        openNotification("Zostałeś pokonany... Game Over!");
        closeModal("fightModal");
    }
}

function defend() {
    openNotification("Bronisz się tarczą!");
    enemyAttack();
}

function heal() {
    if (player.potions > 0) {
        const healing = 30;
        player.health += healing;
        player.potions--;
        openNotification(`Używasz eliksiru! Odzyskałeś ${healing} zdrowia.`);
        enemyAttack();
    } else {
        openNotification("Brak eliksirów!");
    }
}

// Zakończenie gry
function endGame() {
    openNotification("Koniec gry!");
}
