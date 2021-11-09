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

    for (let i = 0; i < theWord.length; i++) {
        let letter = theWord[i].toUpperCase();
        let element = document.createElement("li");
        element.innerHTML = letter;
        element.classList.add("indv-letter");
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

// Funktion som jämför det inmatade värdet med Ordet (från startInput)
function compareLetter() {

    let input = guessInput.value;
    let result = theWord.filter(letter => letter == input);

    if (result[0] != undefined) {
        console.log(result);
    } else {
        let element = document.createElement("li");
        element.innerHTML = input.toUpperCase();
        usedLetters.appendChild(element);
    }

    //en for loop som loopar igenom ordet och jämför med det inputade gissningen
    for (i = 0; i < theWord.length; i++) {
        if (input == theWord[i]) {
            console.log(`${i}: ${theWord[i]}`);
        }
    };
};

// Lyssnare som lyssnar efter knapptryckningar och då skall den kalla på : funktion som skriver bokstaven
// i spelfältet om den finns, annars i en lista vid sidan. 
