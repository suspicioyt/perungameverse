// script.js

// Initial stats
let rizz = 0;
let guests = 0;
let money = 100;

// Update stats display
function updateStats() {
    document.getElementById('rizz').textContent = rizz;
    document.getElementById('guests').textContent = guests;
    document.getElementById('money').textContent = money;
}

// Log messages
function logEvent(message) {
    const logEntries = document.getElementById('logEntries');
    const newLog = document.createElement('div');
    newLog.textContent = message;
    logEntries.prepend(newLog);
}

// Actions
function throwParty() {
    if (money >= 20) {
        const newGuests = Math.floor(Math.random() * (10 + rizz / 10)) + 5;
        const rizzBoost = Math.floor(Math.random() * 5) + 1;
        const earnings = newGuests * 5; // Każdy gość płaci 5 monet za wstęp

        guests += newGuests;
        rizz += rizzBoost;
        money += earnings - 20; // Zarabiasz od gości i odejmujesz koszty imprezy

        logEvent(`Zorganizowałeś imprezę! Przybyło ${newGuests} gości i zarobiłeś ${earnings} monet. Twoja charyzma wzrosła o ${rizzBoost}!`);
        updateStats();
    } else {
        logEvent('Nie masz wystarczająco pieniędzy, aby zorganizować imprezę!');
    }
}


function buyUpgrade() {
    if (money >= 50) {
        rizz += 10;
        money -= 50;
        logEvent('Kupiłeś ulepszenie, twoja charyzma wzrosła o 10!');
        updateStats();
    } else {
        logEvent('Nie masz wystarczająco pieniędzy, aby kupić ulepszenie!');
    }
}

function advertise() {
    if (money >= 30) {
        const newGuests = Math.floor(Math.random() * 15) + 5;
        guests += newGuests;
        money -= 30;
        logEvent(`Zareklamowałeś imprezę i przybyło ${newGuests} nowych gości!`);
        updateStats();
    } else {
        logEvent('Nie masz wystarczająco pieniędzy na reklamę!');
    }
}
let sponsorCooldown = false;

function getSponsor() {
    if (!sponsorCooldown) {
        const sponsorMoney = Math.floor(Math.random() * 50) + 50; // Losowa kwota od sponsora
        money += sponsorMoney;

        logEvent(`Zdobyłeś sponsora! Otrzymałeś ${sponsorMoney} monet.`);
        updateStats();

        sponsorCooldown = true;
        setTimeout(() => {
            sponsorCooldown = false;
            logEvent('Sponsorzy są ponownie dostępni.');
        }, 300000); // 5 minut (300 000 ms)
    } else {
        logEvent('Musisz poczekać, zanim znajdziesz kolejnego sponsora!');
    }
}
function generateIncome() {
    const income = Math.floor(guests * 2); // Każdy gość przynosi 2 monety co 30 sekund
    if (income > 0) {
        money += income;
        logEvent(`Twoja impreza przyniosła ${income} monet dochodu!`);
        updateStats();
    }
}

// Uruchom generowanie dochodów co 30 sekund
setInterval(generateIncome, 30000); // 30 sekund (30 000 ms)
let upgradeCost = 100; // Cena ulepszenia
let guestMultiplier = 1; // Mnożnik gości

function upgradeParty() {
    if (money >= upgradeCost) {
        guestMultiplier *= 1.5; // Zwiększamy liczbę gości o 50% przy każdym ulepszeniu
        money -= upgradeCost;
        upgradeCost = Math.floor(upgradeCost * 1.2); // Cena ulepszenia rośnie o 20%
        logEvent(`Ulepszyłeś imprezę! Twoja impreza może teraz przyjąć ${Math.floor(guestMultiplier * 10)} gości!`);
        updateStats();
    } else {
        logEvent('Nie masz wystarczająco pieniędzy, aby ulepszyć imprezę!');
    }
}
let entryFee = 5; // Początkowa opłata za wstęp

function upgradeEntryFee() {
    if (money >= 50) {
        entryFee += 2; // Zwiększamy opłatę o 2 monety
        money -= 50; // Koszt ulepszenia
        logEvent(`Podniosłeś opłatę za wstęp! Teraz każdy gość płaci ${entryFee} monet.`);
        updateStats();
    } else {
        logEvent('Nie masz wystarczająco pieniędzy, aby podnieść opłatę za wstęp!');
    }
}
function randomEvent() {
    const eventChance = Math.random();
    if (eventChance < 0.3) {
        // Pozytywne wydarzenie
        const bonus = Math.floor(Math.random() * 100) + 50;
        money += bonus;
        logEvent(`Wydarzenie! Otrzymałeś bonus ${bonus} monet za dobrą recenzję!`);
    } else if (eventChance < 0.6) {
        // Negatywne wydarzenie
        const penalty = Math.floor(Math.random() * 50) + 20;
        money -= penalty;
        logEvent(`Wydarzenie! Straciłeś ${penalty} monet z powodu złej organizacji imprezy.`);
    } else {
        logEvent('Wydarzenie! Nic specjalnego się nie wydarzyło.');
    }
    updateStats();
}
// Uruchom losowe wydarzenie co 60 sekund
setInterval(randomEvent, 60000); // 60 sekund (60 000 ms)
let rank = 1; // Początkowy poziom rankingu

function checkRank() {
    if (guests >= 1000) {
        rank = 5;
    } else if (guests >= 500) {
        rank = 4;
    } else if (guests >= 200) {
        rank = 3;
    } else if (guests >= 100) {
        rank = 2;
    }

    logEvent(`Twój ranking: ${rank}`);
}
setInterval(checkRank, 10000); // Co 30 sekund sprawdzamy ranking
let loyaltyPoints = 0; // Punkty lojalnościowe

function earnLoyaltyPoints() {
    const pointsEarned = Math.floor(Math.random() * 5) + 1; // Losowa liczba punktów lojalnościowych
    loyaltyPoints += pointsEarned;
    logEvent(`Zdobyłeś ${pointsEarned} punktów lojalnościowych! Masz teraz ${loyaltyPoints} punktów.`);
}

// Uruchom zdobywanie punktów co 10 minut
setInterval(earnLoyaltyPoints, 60000); // 10 minut (600 000 ms)
function randomEvent() {
    const eventChance = Math.random();
    let eventMessage = "";
    let monetaryImpact = 0;

    if (eventChance < 0.2) {
        // Pozytywne wydarzenie: Celebryta
        const celebrityImpact = Math.floor(Math.random() * 200) + 100; // Więcej gości
        guests += celebrityImpact;
        monetaryImpact = celebrityImpact * entryFee; // Więcej zarobków
        eventMessage = `Wydarzenie! Celebryta odwiedził Twoją imprezę! Przyciągnął ${celebrityImpact} nowych gości.`;
    } else if (eventChance < 0.4) {
        // Negatywne wydarzenie: Awaria
        const penalty = Math.floor(Math.random() * 100) + 50; // Koszt naprawy
        money -= penalty;
        eventMessage = `Wydarzenie! Twoja impreza miała awarię sprzętu. Koszt naprawy wynosi ${penalty} monet.`;
    } else {
        eventMessage = "Wydarzenie! Nic specjalnego się nie wydarzyło.";
    }

    logEvent(eventMessage);
    money += monetaryImpact; // Zwiększamy lub zmniejszamy pieniądze
    updateStats();
}
let sponsors = [
    { name: "Coca-Cola", payout: 50 },
    { name: "Nike", payout: 100 },
    { name: "Red Bull", payout: 150 }
];

let activeSponsor = null;

function signSponsor() {
    const sponsor = sponsors[Math.floor(Math.random() * sponsors.length)];
    activeSponsor = sponsor;
    logEvent(`Podpisałeś umowę sponsorską z ${sponsor.name}. Będziesz otrzymywać ${sponsor.payout} monet za każdą imprezę.`);
    updateStats();
}

function getSponsorshipRevenue() {
    if (activeSponsor) {
        money += activeSponsor.payout;
        logEvent(`Otrzymałeś ${activeSponsor.payout} monet od sponsora: ${activeSponsor.name}.`);
    }
}


// Initial display
updateStats();
