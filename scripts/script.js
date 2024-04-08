const wordsAndHints = [
    { word: 'apple', hint: 'A red fruit' },
    { word: 'computer', hint: 'An electronic device' },
    { word: 'banana', hint: 'A yellow fruit' },
    { word: 'carrot', hint: 'An orange vegetable' },
    { word: 'elephant', hint: 'A large mammal with tusks' },
    { word: 'guitar', hint: 'A musical instrument with strings' },
    { word: 'umbrella', hint: 'Used to shield from rain or sun' },
    { word: 'oxygen', hint: 'A gas necessary for life' },
    { word: 'volcano', hint: 'A mountain that erupts' },
    { word: 'bicycle', hint: 'A two-wheeled vehicle' },
    { word: 'telescope', hint: 'Used to view distant objects' },
    { word: 'sunflower', hint: 'A tall yellow flower' },
    { word: 'penguin', hint: 'A flightless bird found in Antarctica' },
    { word: 'keyboard', hint: 'Input device for typing on a computer' },
    { word: 'astronaut', hint: 'A person who travels to space' },
    { word: 'telephone', hint: 'Used for communication over long distances' },
    { word: 'butterfly', hint: 'An insect with colorful wings' },
    { word: 'tornado', hint: 'A violent rotating column of air' },
    { word: 'octopus', hint: 'A sea creature with eight arms' },
    { word: 'dragon', hint: 'A mythical creature with wings and fire-breathing abilities' },
    { word: 'cucumber', hint: 'A green vegetable often used in salads' },
    { word: 'rhinoceros', hint: 'A large mammal with a horn on its nose' },


];

let selectedWord, displayedWord, wrongGuesses, usedLetters;

function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsAndHints.length);
    const selection = wordsAndHints[randomIndex];
    selectedWord = selection.word.toUpperCase();
    document.getElementById('hint').querySelector('span').textContent = selection.hint;
    displayedWord = Array(selectedWord.length).fill('_');
}

function updateDisplay() {
    document.getElementById('wordContainer').textContent = displayedWord.join(' ');
    document.getElementById('wrongGuesses').textContent = `${wrongGuesses}/6`;
}

function handleGuess(letter) {
    if (usedLetters.has(letter)) return;

    document.getElementById(`letter-${letter}`).disabled = true;
    usedLetters.add(letter);

    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((l, i) => {
            if (l === letter) displayedWord[i] = l;
        });
    } else {
        wrongGuesses++;
        updateHangmanImage();
    }
    updateDisplay();

    if (!displayedWord.includes('_') || wrongGuesses >= 6) {
        endGame();
    }
}

function setupLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = '';

    letters.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.id = `letter-${letter}`;
        button.onclick = () => handleGuess(letter);
        lettersContainer.appendChild(button);
    });
}

function resetGame() {
    wrongGuesses = 0;
    usedLetters = new Set();
    selectRandomWord();
    setupLetters();
    updateDisplay();
    document.querySelector('main').style.backgroundImage = "url('images/untitled1.png')";
    document.querySelectorAll('#letters button').forEach(button => button.disabled = false);
    document.getElementById('gameOverPopup').style.display = 'none';
}

function endGame() {
    document.querySelectorAll('#letters button').forEach(button => button.disabled = true);

    const gameOverPopup = document.getElementById('gameOverPopup');
    const gameOverContent = document.querySelector('.popup-content');
    const gameOverMessage = document.getElementById('gameOverMessage');

    if (!displayedWord.includes('_')) {

        gameOverMessage.textContent = `You won! The word was "${selectedWord}".`;
    } else {
        gameOverMessage.textContent = `You lost, The word was "${selectedWord}".`;
    }

    gameOverPopup.style.display = 'flex';
}

function updateHangmanImage() {
    let mainElement = document.querySelector('main');
    if (wrongGuesses > 0 && wrongGuesses <= 7) {
        mainElement.style.backgroundImage = `url('images/untitled${wrongGuesses + 1}.png')`;
    }
}

function updatePopupSize() {
    const popup = document.getElementById('gameOverPopup');
    const popupContent = popup.querySelector('.popup-content');
    const backgroundImage = new Image();
    backgroundImage.onload = function () {
        const popupWidth = this.width;
        const popupHeight = this.height;
        popupContent.style.width = popupWidth + 'px';
        popupContent.style.height = popupHeight + 'px';
        popup.style.width = popupWidth + 'px';
        popup.style.height = popupHeight + 'px';
    };
    backgroundImage.src = popupContent.style.backgroundImage.replace(/url\(['"]?([^'"]*)['"]?\)/g, '$1');
}

document.addEventListener('DOMContentLoaded', function () {
    resetGame();
    updatePopupSize();
});

window.addEventListener('resize', updatePopupSize);
