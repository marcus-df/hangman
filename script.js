// Variabler som kopplas till de olika elementen i html:en 
const startField = document.getElementById("start-field"); // gör så att startfältet göms efter den avlyssnats. 
const startInput = document.getElementById("start-input");
const startBtn = document.getElementById("start-btn");

const gameField = document.getElementById("game-field");
const gameLetters = document.getElementById("game-letters"); // kolumnerna med det gömda ordet
const gameBtn = document.getElementById("game-btn");

const guessInput = document.getElementById("guess-input"); // inputfältet för att gissa
const usedLetters = document.getElementById("used-letters"); // Failed attempts

const endField = document.getElementById("end-field");
const endScore = document.getElementById("end-score");
const resetBtn = document.getElementById("reset-btn");

let theWord = [];

// Anropar startBtn.addEventListener("click", generateWord);
startInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        startBtn.click();
    }
});

startBtn.addEventListener("click", generateWord);

// Ordet som spelaren skall gissa på, det kommer tilldelas ett värde via en splitmetod

function generateWord() {
    let input = startInput.value.split("");
    theWord = input;
    console.log(theWord);

    // Nollställer och tar bort ordet från input-fältet.
    startInput.value = "";
    // Nollställer och tar bort tidigare ord.
    gameLetters.innerHTML = "";
    usedLetters.innerHTML = "";

    for (let i = 0; i < theWord.length; i++) {
        let letter = theWord[i].toUpperCase();
        let element = document.createElement("li");
        element.innerHTML = letter;

        // element.innerText = "";

        element.classList.add("hidden", "game-letter");
        gameLetters.appendChild(element);
    }
    // Delar upp ordet i enskilda bokstäver och sätter in dem i arrayen theWord
}

guessInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        gameBtn.click();
    }
});

gameBtn.addEventListener("click", compareLetter);

let correctLetters = [];
let failCount = 0;

// Funktion som jämför det inmatade värdet med Ordet (från startInput)
function compareLetter() {

    let gameLetter = document.getElementsByClassName("game-letter");
    let input = guessInput.value;
    let result = theWord.filter(letter => letter == input);

    correctLetters.length = theWord.length;

    if (result[0] != undefined) {
        console.log(result);
        for (let i = 0; i < theWord.length; i++) {
            if (result[0] == theWord[i]) {
                gameLetter[i].classList.remove("hidden");
                correctLetters[i] = theWord[i];
            }
        }
    } else {
        let element = document.createElement("li");
        element.innerHTML = input.toUpperCase();
        usedLetters.appendChild(element);
        failCount++;
    };

    //gör om arrayernas olika delar till ett ord och jämför de med varandra
    if (correctLetters.join("") == theWord.join("")) {
        winCondition();
    }

    if (failCount >= 8) {
        loseCondition();
    }
};

// Detta händer när man klarat spelet
function winCondition() {
    //scrollar ned till botten
    window.scrollTo(0, document.body.scrollHeight);
    document.getElementById("end-title").innerHTML = "You completed the word!";
}

function loseCondition() {
    //scrollar ned till botten
    window.scrollTo(0, document.body.scrollHeight);
    // Tillfälligt
    document.getElementById("end-title").innerHTML = "You lost! Try again";
}

//Reset
resetBtn.addEventListener('click', function () {
    startInput.value = "";
    guessInput.value = "";
    gameLetters.innerHTML = "";
    usedLetters.innerHTML = "";
    failCount = 0;
    document.getElementById("end-title").innerHTML = "You completed the word!";
});
