const API_URL = "https://script.google.com/macros/s/AKfycbwcRa8GwyPXsfzKPGcCdigMMJzlhHbIn6uMF96WziElMr8JnUOehKTCQHNNDoPH9G0T/exec"; // Wklej URL z Google Apps Script po wdrożeniu
let lastDate = "";
let lastScrollHeight = 0;
let replyingToMessageId = null;
let lastFetchedMessageId = null;

// Funkcje pomocnicze
function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
}

function toggleEmojiPicker() {
    const picker = document.getElementById("emojiPicker");
    picker.style.display = picker.style.display === "block" ? "none" : "block";
}

function addEmoji(emoji) {
    const input = document.getElementById("chatMessage");
    input.value += emoji;
    toggleEmojiPicker();
    input.focus();
}

function scrollToBottom() {
    const chatList = document.getElementById("chatMessages");
    setTimeout(() => {
        chatList.scrollTop = chatList.scrollHeight;
    }, 100); // Opóźnienie 100ms, aby DOM się zaktualizował
}

// Wysłanie wiadomości
async function sendChatMessage() {
    const username = localStorage.getItem("perunUsername") || "Anonim";
    const chatMessage = document.getElementById("chatMessage").value.trim();
    
    if (!chatMessage) {
        showError("Nie możesz wysłać pustej wiadomości!");
        return;
    }

    const timestamp = new Date().toISOString();
    const data = {
        username,
        message: sanitizeInput(chatMessage),
        timestamp,
        replyTo: replyingToMessageId,
        reactions: {}
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            mode: "no-cors"
        });

        document.getElementById("chatMessage").value = "";
        replyingToMessageId = null;
        updateReplyingTo(null);
        await loadChatMessages();
        scrollToBottom();
    } catch (error) {
        console.error("Błąd wysyłania wiadomości:", error);
        showError("Nie udało się wysłać wiadomości.");
    }
}

// Usuwanie wiadomości
async function deleteMessage(messageId) {
    const username = localStorage.getItem("perunUsername") || "Anonim";
    const data = {
        action: "delete",
        messageId,
        username
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            mode: "no-cors"
        });
        await loadChatMessages();
        scrollToBottom();
    } catch (error) {
        console.error("Błąd usuwania wiadomości:", error);
        showError("Nie udało się usunąć wiadomości.");
    }
}

// Edycja wiadomości
async function editMessage(messageId) {
    const messageElement = document.querySelector(`[data-id="${messageId}"] .message-content`);
    const currentText = messageElement.textContent;
    const newText = prompt("Edytuj wiadomość:", currentText);

    if (newText === null || newText.trim() === "" || newText === currentText) return;

    const username = localStorage.getItem("perunUsername") || "Anonim";
    const data = {
        action: "edit",
        messageId,
        username,
        message: sanitizeInput(newText)
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            mode: "no-cors"
        });
        await loadChatMessages();
        scrollToBottom();
    } catch (error) {
        console.error("Błąd edycji wiadomości:", error);
        showError("Nie udało się edytować wiadomości.");
    }
}

// Dodawanie reakcji
async function addReaction(messageId, reaction) {
    const username = localStorage.getItem("perunUsername") || "Anonim";
    const data = {
        action: "react",
        messageId,
        username,
        reaction
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            mode: "no-cors"
        });
        await loadChatMessages();
        scrollToBottom();
    } catch (error) {
        console.error("Błąd dodawania reakcji:", error);
        showError("Nie udało się dodać reakcji.");
    }
}

// Ładowanie wiadomości
async function loadChatMessages() {
    try {
        const response = await fetch(API_URL);
        const chatMessages = await response.json();
        const chatList = document.getElementById("chatMessages");

        if (chatMessages.error) {
            throw new Error(chatMessages.error);
        }

        if (!Array.isArray(chatMessages)) {
            throw new Error("Oczekiwano tablicy wiadomości, otrzymano: " + JSON.stringify(chatMessages));
        }

        chatList.innerHTML = "";
        lastDate = "";

        chatMessages.forEach(msg => {
            if (!msg.id) msg.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            displayChatMessage(msg, msg.username === localStorage.getItem("perunUsername"));
        });

        scrollToBottom();
        lastScrollHeight = chatList.scrollHeight;
        lastFetchedMessageId = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].id : null;
    } catch (error) {
        console.error("Błąd ładowania wiadomości:", error);
        showError("Nie udało się załadować wiadomości.");
    }
}

// Wyświetlanie wiadomości
function displayChatMessage(msg, isSelf) {
    const chatList = document.getElementById("chatMessages");
    let parsedDate;
    try {
        parsedDate = new Date(msg.timestamp);
    } catch (error) {
        console.warn(`Nieprawidłowy format daty dla timestampu: ${msg.timestamp}`);
        parsedDate = new Date();
    }

    const chatMessageDate = isNaN(parsedDate) ? "Nieznana data" : parsedDate.toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    if (chatMessageDate !== lastDate) {
        lastDate = chatMessageDate;
        const separator = document.createElement("li");
        separator.classList.add("date-separator");
        separator.innerHTML = `<span>${chatMessageDate}</span>`;
        chatList.appendChild(separator);
    }

    const li = document.createElement("li");
    li.classList.add("chatMessage", isSelf ? "self" : "other");
    li.dataset.id = msg.id;

    const usernameLabel = document.createElement("span");
    usernameLabel.classList.add("username-label");
    usernameLabel.textContent = String(msg.username || "Nieznany");

    if (msg.replyTo) {
        const replyDiv = document.createElement("div");
        replyDiv.classList.add("replying-to");
        replyDiv.innerHTML = `Odpowiada na: [Wiadomość #${msg.replyTo}] <span class="cancel-reply" onclick="cancelReply()">Anuluj</span>`;
        li.appendChild(replyDiv);
    }

    const content = document.createElement("div");
    content.classList.add("message-content");
    content.textContent = String(msg.message || "[Brak treści]");

    if (msg.username === "SUSpicio") {
        usernameLabel.classList.add("rainbowText");
    }
    if (msg.username === "DEV") {
        usernameLabel.style.color = "#ffd700";
    }

    const time = document.createElement("div");
    time.classList.add("timestamp");
    time.textContent = isNaN(parsedDate) ? "Nieznany czas" : parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const reactionsDiv = document.createElement("div");
    if (msg.reactions && typeof msg.reactions === "object") {
        for (const [reaction, users] of Object.entries(msg.reactions)) {
            if (Array.isArray(users)) {
                const reactionSpan = document.createElement("span");
                reactionSpan.classList.add("reaction");
                reactionSpan.textContent = `${reaction} ${users.length}`;
                reactionSpan.onclick = () => addReaction(msg.id, reaction);
                reactionsDiv.appendChild(reactionSpan);
            }
        }
    }

    const hasReactions = msg.reactions && Object.keys(msg.reactions).length > 0;
    const addReactionSpan = document.createElement("span");
    addReactionSpan.classList.add("reaction");
    addReactionSpan.textContent = hasReactions ? "👍" : "👍"; // Jeśli są reakcje, tylko ikona
    addReactionSpan.onclick = () => addReaction(msg.id, "👍");
    if (!hasReactions) reactionsDiv.appendChild(addReactionSpan);

    if (isSelf) {
        const editBtn = document.createElement("span");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "✏️";
        editBtn.onclick = (e) => {
            e.stopPropagation();
            editMessage(msg.id);
        };

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "🗑️";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteMessage(msg.id);
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
    }

    li.onclick = (e) => {
        if (e.target.classList.contains("reaction") || e.target.classList.contains("edit-btn") || e.target.classList.contains("delete-btn") || e.target.classList.contains("cancel-reply")) return;
        replyingToMessageId = msg.id;
        updateReplyingTo(msg);
    };

    li.appendChild(usernameLabel);
    li.appendChild(content);
    li.appendChild(time);
    li.appendChild(reactionsDiv);
    chatList.appendChild(li);
}

function updateReplyingTo(msg) {
    const input = document.getElementById("chatMessage");
    const container = document.getElementById("input-container");
    const existingReply = container.querySelector(".replying-to");
    if (existingReply) existingReply.remove();

    if (msg) {
        const replyDiv = document.createElement("div");
        replyDiv.classList.add("replying-to");
        replyDiv.innerHTML = `Odpowiadasz na wiadomość #${msg.id} <span class="cancel-reply" onclick="cancelReply()">Anuluj</span>`;
        container.insertBefore(replyDiv, input);
        input.placeholder = "";
    } else {
        input.placeholder = "Napisz wiadomość...";
    }
}

function cancelReply() {
    replyingToMessageId = null;
    updateReplyingTo(null);
}

function showError(message) {
    const chatList = document.getElementById("chatMessages");
    const errorLi = document.createElement("li");
    errorLi.classList.add("error-message");
    errorLi.textContent = message;
    chatList.appendChild(errorLi);
    scrollToBottom();
    setTimeout(() => errorLi.remove(), 3000);
}

// Inicjalizacja
// Inicjalizacja
loadChatMessages();
setInterval(loadChatMessages, 1000);

// Funkcja przewijania
function scrollToBottom() {
    const chatList = document.getElementById("chatMessages");
    setTimeout(() => {
        chatList.scrollTop = chatList.scrollHeight;
    }, 1100); // Opóźnienie 100ms, aby DOM się zaktualizował
}

// Przewiń do najnowszej wiadomości po załadowaniu strony
scrollToBottom();