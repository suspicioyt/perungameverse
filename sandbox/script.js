const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
const particles = [];
let selectedType = 'sand';
let isMouseDown = false;

document.querySelectorAll('.controls button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'clear') {
            particles.length = 0;
        } else {
            selectedType = button.id;
        }
    });
});

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    particles.push(new Particle(x, y, selectedType));
    
    // Obsługuje przeciąganie (dragging)
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', () => {
        canvas.removeEventListener('mousemove', onMouseMove);
    });

    function onMouseMove(event) {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        particles.push(new Particle(x, y, selectedType));
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        addParticles(event);
    }
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

canvas.addEventListener('click', (event) => {
    addParticles(event);
});

function addParticles(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    particles.push(new Particle(x, y, selectedType));
}

const particleTypes = {
    sand: { color: 'gold', density: 1, reactsWith: ['water'], transform: { water: 'mud' }, burnable: false, interaction: moveDown },
    water: { color: 'blue', density: 1, reactsWith: ['salt', 'iron'], transform: { salt: 'saltwater', iron: 'rust' }, burnable: false, interaction: moveDown },
    fire: { color: 'red', density: 0, reactsWith: ['wood', 'iron'], transform: { wood: 'ash', iron: 'rust' }, burnable: true, interaction: (p) => { moveUp(p); burnNearby(p); } },
    soil: { color: 'brown', density: 1.5, reactsWith: ['fire'], transform: { fire: 'ash' }, burnable: false, interaction: moveDown },
    salt: { color: 'lightyellow', density: 1, reactsWith: ['water'], transform: { water: 'saltwater' }, burnable: false, interaction: moveDown },
    saltwater: { color: 'lightblue', density: 1.2, burnable: false, interaction: moveDown },
    ash: { color: 'gray', density: 0.5, burnable: false, interaction: moveDown },
    stone: { color: 'gray', density: 2.5, burnable: false, interaction: moveStone },
    ice: { color: 'lightblue', density: 0.9, reactsWith: ['water'], transform: { water: 'snow' }, burnable: false, interaction: moveDown },
    iron: { color: 'silver', density: 7.8, burnable: false, reactsWith: ['fire', 'acid'], transform: { fire: 'rust', acid: 'rust' }, interaction: moveDown },
    oxygen: { color: 'lightgray', density: 1.4, burnable: false, interaction: moveUp, reactsWith: ['fire'], transform: { fire: 'intensefire' } },
    wood: { color: 'brown', density: 1, burnable: true, interaction: moveDown },
    coal: { color: 'black', density: 1.5, burnable: true, interaction: moveDown },
    acid: { color: 'green', density: 1.1, burnable: false, interaction: moveDown, reactsWith: ['iron'] },
    flower: { color: 'pink', density: 1, burnable: false, interaction: moveDown, reactsWith: ['water'], transform: { water: 'plant' } },
    plant: { color: 'green', density: 1, burnable: false, interaction: moveDown }
};

function moveDown(p) {
    if (p.y < canvas.height - p.size && !isOccupied(p.x, p.y + p.size)) {
        p.y += p.density;
    }
}

function moveUp(p) {
    if (p.y > 0 && !isOccupied(p.x, p.y - p.size)) {
        p.y -= 1;
    }
}

function moveStone(p) {
    // Kamień jest nieruchomy - nie reaguje na grawitację
    // W przypadku kamienia nie robimy żadnego ruchu
}

function isOccupied(x, y) {
    return particles.some(p => p.x === x && p.y === y);
}

// Dodanie parametru ograniczenia na odległość do reakcji
function checkForReactions(p) {
    const type = particleTypes[p.type];
    if (!type.reactsWith) return;
    
    particles.forEach((other, index) => {
        if (type.reactsWith.includes(other.type) && Math.abs(other.x - p.x) < 10 && Math.abs(other.y - p.y) < 10) {
            const newType = type.transform[other.type];
            if (newType) {
                // Usuń obie cząsteczki i stwórz nową
                particles.splice(index, 1);
                particles.push(new Particle(p.x, p.y, newType));
            }
        }
    });
}


function burnNearby(p) {
    particles.forEach((other, index) => {
        if (other.type !== 'fire' && Math.abs(other.x - p.x) < 5 && Math.abs(other.y - p.y) < 5) {
            // Spalanie tylko cząsteczek, które mają właściwość burnable
            if (particleTypes[other.type]?.burnable) {
                particles.splice(index, 1);
                particles.push(new Particle(other.x, other.y, 'fire'));
            }
        }
    });
}

function removeFire(p) {
    if (p.type === 'fire') {
        p.lifeTime--;
        if (p.lifeTime <= 0) {
            particles.splice(particles.indexOf(p), 1);
        }
    }
}

class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = particleTypes[type]?.color || 'black';
        this.density = particleTypes[type]?.density || 1;
        this.size = 4; // Zaczynamy od małego rozmiaru
        this.lifeTime = 300; // Czas życia ognia w milisekundach (3 sekundy)
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        // Cząsteczki, które mogą się spalić, są traktowane specjalnie
        if (particleTypes[this.type]?.burnable) {
            this.burn();
        }

        if (this.type === 'fire') {
            removeFire(this);
        }

        particleTypes[this.type]?.interaction(this);
        checkForReactions(this);
    }

    burn() {
        if (this.type === 'fire') {
            return; // Ogień nie spala samego siebie
        }

        // Prosty sposób na „spalenie” cząsteczki - usuń ją po pewnym czasie
        if (Math.random() < 0.01) {
            const newType = particleTypes[this.type]?.transform?.fire;
            if (newType) {
                this.type = newType;
                this.color = particleTypes[this.type]?.color || 'black';
            }
        }
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.draw());
}

let lastCheck = 0;
const reactionInterval = 5; // Sprawdzanie reakcji co 5 klatek

function updateParticles() {
    const now = Date.now();
    const timeElapsed = now - lastCheck;

    if (timeElapsed >= reactionInterval) {
        particles.forEach((particle, index) => {
            particle.update();
            if (particle.y > canvas.height) {
                particles.splice(index, 1);
            }
        });

        lastCheck = now; // Zaktualizuj czas
    } else {
        particles.forEach((particle) => {
            particle.update();
        });
    }
}


function gameLoop() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(gameLoop);
}

gameLoop();


// Pobranie przycisków
const clearButton = document.getElementById('clear');
const toggleThemeButton = document.getElementById('toggle-theme');

// Funkcja czyszczenia planszy
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Czyści canvas
});

// Funkcja zmiany motywu
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});