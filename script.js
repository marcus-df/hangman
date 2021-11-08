//variabler som kopplas till de olika elementen i html:en 
let startField = document.getElementById("start-field"); // gör så att startfältet göms efter den avlyssnats. 
let startInput = document.getElementById("start-input");
let startBtn = document.getElementById("start-btn");

let gameField = document.getElementById("game-field");
let gameBtn = document.getElementById("game-btn");
let gameLetters = document.getElementById("game-letters"); //kolumnerna med det gömda ordet

let guessInput = document.getElementById("guess-input"); //inputfältet för att gissa
let usedLetters = document.getElementById("used-letters"); //failed attempts

let endField = document.getElementById("end-field");
let endScore = document.getElementById("end-score");
let resetBtn = document.getElementById("reset-btn");

let theWord = [];

// Anropar startBtn.addEventListener("click", generateWord);
startInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        startBtn.click();
    }
});

startBtn.addEventListener("click", generateWord);

//ordet som spelaren skall gissa på, det kommer tilldelas ett värde via en splitmetod

function generateWord() {
    let input = startInput.value.split("");
    theWord = input;
    console.log(theWord);

    gameLetters.innerHTML = "";

    for (let i = 0; i < theWord.length; i++) {
        let letter = theWord[i];
        let element = document.createElement("li");
        element.innerHTML = letter;
        gameLetters.appendChild(element);
    }
    //delar upp ordet i enskilda bokstäver och sätter in dem i arrayen theWord
}

guessInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        gameBtn.click();
    }
});

gameBtn.addEventListener("click", compareLetter);

//funktion som jämför det inmatade värdet med Ordet (från startInput)
function compareLetter() {

    let input = guessInput.value;

    let result = theWord.filter(letter => letter == input);
    console.log(result);

    //en for loop som loopar igenom ordet och jämför med det inputade gissningen
    for (i = 0; i < theWord.length; i++) {
        if (input == theWord[i]) {
            console.log(`${i}: ${theWord[i]}`);
        }
    };
};

// Lyssnare som lyssnar efter knapptryckningar och då skall den kalla på : funktion som skriver bokstaven
// i spelfältet om den finns, annars i en lista vid sidan. 