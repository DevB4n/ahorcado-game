let start = document.getElementById('start');
const keyboard = document.getElementById('keyboard');
const words = document.getElementById('words');
let mistakeCounter = 0;
let counter = document.querySelector('h2');
counter.textContent = `mistakes = ${mistakeCounter}`;


let restartButton = document.createElement('button');
restartButton.textContent = 'Reiniciar';
restartButton.id = 'restart';
restartButton.style.display = 'none'; 
document.body.insertBefore(restartButton, keyboard);

const wordsbox = [
    "gato", "perro", "raton", "elefante", "jirafa", "murcielago", "leon", "tigre", 
    "oso", "lobo", "zorro", "panda", "koala", "canguro", "wallaby", "delfin", "ballena", 
    "tiburon", "pingüino", "aguila", "halcon", "buho", "paloma", "pavo", "cebra", "caballo", 
    "burro", "vaca", "cabra", "oveja", "cerdo", "gallo", "pato", "ganso", "gallina", "pescado", 
    "tortuga", "sapo", "rana", "serpiente", "camaleon", "iguana", "loro", "perico", "canario", 
    "gaviota", "pelicano", "foca", "leonmarino", "lince", "zebra", "pantera", "orca", "bisonte", 
    "ciervo", "alce", "gacela", "rinoceronte", "hipopotamo", "flamenco", "cisne", "dromedario", 
    "cocodrilo", "caiman", "tiburonblanco", "mantarraya", "estrellademar", "langosta", "cangrejo", 
    "pulpo", "medusa", "calamar", "pezpayaso", "pezespada", "pezgato", "anguilla", "bacalao", 
    "sardina", "trucha", "atun", "salmon", "corvina", "blanquillo", "lambari", "lucio", "perca", 
    "coral", "mejorana", "camaron", "erizodemar", "mantarayas", "pelusa", "crustaceo", "molusco", 
    "mariposa", "libelula", "catarina", "grillo", "saltamontes", "arana", "escorpion", "alacran", 
    "cucaracha", "mosca", "mosquito", "abeja", "avispón", "mariposanoturna", "polilla", "escarabajo"
];



let word = wordsbox[Math.floor(Math.random() * wordsbox.length)].toLowerCase();
let wordArray = word.split("");
let displayArray = Array(word.length).fill("_");

function initGame() {
    console.log("Palabra seleccionada:", word);
    words.innerHTML = '';
    
    for (let i = 0; i < word.length; i++) {
        words.insertAdjacentHTML('beforeend', `<span class="unknownword">_</span>`);
    }
    
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        keyboard.insertAdjacentHTML('beforeend', `<button>${letter}</button>`);
    }
}


function resetGame() {
    
    keyboard.innerHTML = '';
    words.innerHTML = '';
    
    
    const imageSection = document.getElementById('image');
    imageSection.innerHTML = '';
    
    
    mistakeCounter = 0;
    counter.textContent = `mistakes = ${mistakeCounter}`;
    
    
    word = wordsbox[Math.floor(Math.random() * wordsbox.length)].toLowerCase();
    wordArray = word.split("");
    displayArray = Array(word.length).fill("_");
    
    
    initGame();
}

start.addEventListener('click', () => {
    start.remove();
    restartButton.style.display = 'inline-block';
    initGame();
});

restartButton.addEventListener('click', resetGame);

keyboard.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const letter = event.target.textContent.toLowerCase();
        let letterIsInWord = false;
        
        wordArray.forEach((char, index) => {
            if (char === letter) {
                displayArray[index] = letter;
                letterIsInWord = true;
            }
        });
        
        const spans = document.querySelectorAll('.unknownword');
        spans.forEach((span, index) => {
            span.textContent = displayArray[index];
        });
        
        if (!letterIsInWord) {
            console.log('Letra incorrecta');
            mistakeCounter += 1;
            counter.textContent = `mistakes = ${mistakeCounter}`;
            console.log(mistakeCounter);
        }
        
        event.target.disabled = true;
        
        if (displayArray.join("") === word) {
            console.log("¡Has ganado!");
            const imageSection = document.getElementById('image');
            imageSection.insertAdjacentHTML('beforeend', `<p class="result-message">¡Has ganado!</p>`);
        }
        
        if (mistakeCounter == 6){
            document.querySelectorAll('#keyboard button').forEach(button => {
                button.disabled = true;
            });
            let image = document.getElementById('image');
            image.insertAdjacentHTML('beforeend', `<img src='descarga.jpg'>`);
            image.insertAdjacentHTML('beforeend', `<p class="result-message">¡Has perdido! La palabra era: ${word}</p>`);
        }
    }
});