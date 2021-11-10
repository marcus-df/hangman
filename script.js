// Variabler som kopplas till de olika elementen i html:en 
const startField = document.getElementById("start-field"); // gör så att startfältet göms efter den avlyssnats. 
const startInput = document.getElementById("start-input");
const startBtn = document.getElementById("start-btn");

const gameField = document.getElementById("game-field");
const gameLetters = document.getElementById("game-letters"); // kolumnerna med det gömda ordet
const gameBtn = document.getElementById("game-btn");

// Gubben uppdelad
const ground = document.getElementById("ground");
const scaffold = document.getElementById("scaffold");
const head = document.getElementById("head");
const body = document.getElementById("body");
const arms = document.getElementById("arms");
const legs = document.getElementById("legs");

const displayTime = document.getElementById("display-time");

const guessInput = document.getElementById("guess-input"); // Input-fält för att gissningar
const usedLetters = document.getElementById("used-letters"); // Misslyckade försök

const endField = document.getElementById("end-field");
const endScore = document.getElementById("end-score");
const endTitle = document.getElementById("end-title");
const restartBtn = document.getElementById("restart-btn");

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
    let input = startInput.value.toUpperCase();
    theWord = input.split("");

    resetInput();
    hideHangman();
    // startTimer(90);

    for (let i = 0; i < theWord.length; i++) {
        let letter = theWord[i];
        let element = document.createElement("li");
        element.innerHTML = letter;

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
    let input = guessInput.value.toUpperCase();
    let result = theWord.filter(letter => letter == input);

    correctLetters.length = theWord.length;

    //Rensar guessInput fältet efter varje gissad bokstav
    guessInput.value = "";

    if (result[0] != undefined) {

        for (let i = 0; i < theWord.length; i++) {
            if (result[0] == theWord[i]) {
                gameLetter[i].classList.remove("hidden");
                correctLetters[i] = theWord[i];
            }
        }
    } else {
        let element = document.createElement("li");
        element.innerHTML = input;
        usedLetters.appendChild(element);
        failCount++;
    };

    // Switch case, som kollar på värdet av failCount och tar bort klasser efter failCounts värde.
    switch (failCount) {

        case 1:
            ground.classList.remove("hang-hidden");
            break;
        case 2:
            scaffold.classList.remove("hang-hidden");
            break;
        case 3:
            head.classList.remove("hang-hidden");
            break;
        case 4:
            body.classList.remove("hang-hidden");
            break;
        case 5:
            arms.classList.remove("hang-hidden");
            break;
        case 6:
            legs.classList.remove("hang-hidden");
            break;
    }

    // Gör om arrayernas olika delar till ett ord och jämför de med varandra
    if (correctLetters.join("") == theWord.join("")) {
        winCondition();
    }

    if (failCount >= 6) {
        loseCondition();
    }
};

// Detta händer när man klarat spelet
function winCondition() {
    // Scrollar ned till botten
    window.scrollTo(0, document.body.scrollHeight);
    let remainingGuesses = 6 - failCount;
    endTitle.innerHTML = "You completed the word!";

    if (remainingGuesses == 6) {
        endScore.innerHTML = "You won without any wrong guesses, <br>" + "that was perfect!";
    } else if (remainingGuesses > 3 && remainingGuesses < 6) {
        endScore.innerHTML = "You won with " + remainingGuesses + " attempts remaining! <br>" +
            "That was very good!";
    } else if (remainingGuesses > 2 && remainingGuesses < 5) {
        endScore.innerHTML = "You won with " + remainingGuesses + " attempts remaining! <br>" +
            "That was good!";
    } else if (remainingGuesses > 0 && remainingGuesses < 3) {
        endScore.innerHTML = "You won with " + remainingGuesses + " attempts remaining! <br>" +
            "That was close!";
    };
}

function loseCondition() {
    // Scrollar ned till botten

    window.scrollTo(0, document.body.scrollHeight);
    document.getElementById("end-title").innerHTML = "Oh no! You lost!";
    endScore.innerHTML = "You have no attempts remaining. <br> The word was " + theWord.join("");
}

// Restart
restartBtn.addEventListener('click', function () {

    document.getElementById("end-title").innerHTML = "You completed the word!";
});

function hideHangman() {
    ground.classList.add("hang-hidden");
    scaffold.classList.add("hang-hidden");
    head.classList.add("hang-hidden");
    body.classList.add("hang-hidden");
    arms.classList.add("hang-hidden");
    legs.classList.add("hang-hidden");
}

// Reset
function resetInput() {
    // Nollställer och tar bort ordet från input-fältet.
    startInput.value = "";
    // Nollställer och tar bort bokstav från guess-fältet.
    guessInput.value = "";
    // Nollställer och tar bort tidigare ord.
    gameLetters.innerHTML = "";
    usedLetters.innerHTML = "";
    // Nollställer antalet felaktiga gissningar
    failCount = 0;
    // Nollställer arrayen som spara rätta gissningar
    correctLetters = [];
}

// function startTimer(time) {

//     let second = setInterval(timer, 100);
//     let remainTime = time;

//     function timer() {
//         remainTime--;
//         displayTime.innerText = remainTime + "s remaining!";

//         if (remainTime <= 0) {
//             loseCondition();
//             clearInterval(second);
//         }
//     };
// };
