// Funkcja pobierająca dane z pliku JSON
async function fetchTabsData() {
    try {
        const response = await fetch('https://suspicioyt.github.io/perungameverse/data/changes.json'); // Zmień na odpowiedni URL, jeśli JSON jest hostowany gdzie indziej
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Błąd podczas pobierania tabsData.json:', error);
        return [];
    }
}

async function loadTabs() {
    const tabsData = await fetchTabsData();
    const tabsContainer = document.getElementById("tabsContainer");
    const tabContentsContainer = document.getElementById("tabContentsContainer");

    if (!tabsContainer || !tabContentsContainer) {
        console.error("Brak wymaganych elementów DOM: tabsContainer lub tabContentsContainer.");
        return;
    }

    tabsData.forEach((tab, index) => {
        const tabButton = document.createElement("button");
        tabButton.textContent = tab.name;
        tabButton.classList.add("tablinks");
        tabButton.setAttribute("onclick", `openTab(event, 'tab${index}')`);
        tabsContainer.appendChild(tabButton);

        const tabContent = document.createElement("div");
        tabContent.id = `tab${index}`;
        tabContent.classList.add("tabcontent", "scrollable");
        
        if (tab.backgroundImage) {
            tabContent.style.backgroundImage = `url(${tab.backgroundImage})`;
        }

        if (tab.date) {
            tabContent.innerHTML = `
                <h1>${tab.name} (${tab.version})</h1>
                <p><strong>Data publikacji:</strong> ${tab.date || "Brak"}</p>
                <cite>${tab.quote}</cite>
            `;
        } else {
            tabContent.innerHTML = `
                <h1>${tab.name} (${tab.version})</h1>
                <cite>${tab.quote}</cite>
            `;
        }
        
        tab.paragraphs.forEach(paragraph => {
            if (typeof paragraph === "object" && paragraph.title && paragraph.content) {
                const section = document.createElement("div");
                section.innerHTML = `<h2>${paragraph.title}</h2>`;
                paragraph.content.forEach(item => {
                    const p = document.createElement("cite");
                    p.innerHTML = item;
                    section.appendChild(p);
                });
                tabContent.appendChild(section);
            } else {
                const p = document.createElement("cite");
                p.innerHTML = paragraph;
                tabContent.appendChild(p);
            }
        });

        tabContentsContainer.appendChild(tabContent);
    });

    if (tabsContainer.querySelector(".tablinks")) {
        tabsContainer.querySelector(".tablinks").click();
    }
}

function openTab(evt, tabId) {
    document.querySelectorAll(".tabcontent").forEach(tab => tab.style.display = "none");
    document.querySelectorAll(".tablinks").forEach(tab => tab.classList.remove("active"));
    document.getElementById(tabId).style.display = "block";
    evt.currentTarget.classList.add("active");
}

async function loadUpdateSlideshow() {
    const tabsData = await fetchTabsData();
    const slide = document.getElementById('updateSlideshow');
    if (!slide) {
        console.error('Nie znaleziono elementu #updateSlideshow');
        return;
    }

    const tab = tabsData[0];
    slide.innerHTML = `
        <h2>${tab.name} (${tab.version})</h2>
        <p>${tab.date || "Brak daty"}</p>
        <cite>${tab.quote}</cite>
    `;
    tab.paragraphs.forEach(paragraph => {
        if (typeof paragraph === "object" && paragraph.title && paragraph.content) {
            const section = document.createElement("div");
            section.innerHTML = `<h2>${paragraph.title}</h2>`;
            paragraph.content.forEach(item => {
                const p = document.createElement("cite");
                p.innerHTML = item + "<br>";
                section.appendChild(p);
            });
            slide.appendChild(section);
        } else {
            const p = document.createElement("cite");
            p.innerHTML = paragraph + "<br>";
            slide.appendChild(p);
        }
    });
    const space = document.createElement('br');
    slide.appendChild(space);
    const button = document.createElement('a');
    button.id = "updateModalBtn";
    button.classList = "game-link feedback-button";
    button.style.cursor = "pointer";
    button.innerHTML = "Czytaj więcej - Dziennik zmian";
    button.onclick = function () { modalOpen('updateModal'); };
    slide.appendChild(button);
}

async function loadVersion() {
    const tabsData = await fetchTabsData();
    const footerElement = document.getElementById('footerText');
    if (footerElement && tabsData[0]?.version) {
        footerElement.innerHTML = `© 2025 Perun Studios & ChatGPT. Wszelkie prawa zastrzeżone. Wersja ${tabsData[0].version}`;
    } else {
        console.warn("Nie udało się załadować wersji. Sprawdź, czy tabsData[0].version jest poprawnie zdefiniowane.");
    }
}

// Wywołanie funkcji po załadowaniu strony
loadTabs();
loadUpdateSlideshow();
loadVersion();