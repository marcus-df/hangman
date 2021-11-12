// Variabler som kopplas till de olika elementen i html:en 
const startField = document.getElementById("start-field");
const startInput = document.getElementById("start-input");
const startBtn = document.getElementById("start-btn");

const gameField = document.getElementById("game-field");
const gameLetters = document.getElementById("game-letters"); // Kolumn som innehåller det gömda ordet
const gameBtn = document.getElementById("game-btn");

// SVGn's delar
const ground = document.getElementById("ground");
const scaffold = document.getElementById("scaffold");
const head = document.getElementById("head");
const body = document.getElementById("body");
const arms = document.getElementById("arms");
const legs = document.getElementById("legs");

const redoBtn = document.getElementById("redo-btn");
const displayTime = document.getElementById("display-time");

const guessInput = document.getElementById("guess-input"); // Input-fält för att gissningar
const usedLetters = document.getElementById("used-letters"); // Misslyckade försök

const endField = document.getElementById("end-field");
const endScore = document.getElementById("end-score");
const endTitle = document.getElementById("end-title");
const restartBtn = document.getElementById("restart-btn");

let theWord = [];
let correctLetters = [];
let failCount = 0;
let remainingGuesses;
let remainingTime;
let intervalID;
let timeBonus = 0;
let points = 0;

// Filterfunktion som lyssnar efter input som matchar alfabetet - annars raderas det sist inmatade värdet
startInput.addEventListener("keyup", function () {
    if (!startInput.value.match(/^[a-zA-z]+$/) && startInput.value != "") {
        startInput.value = startInput.value.slice(0, -1);
    }
});

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
    startTimer(70);

    for (let i = 0; i < theWord.length; i++) {
        let letter = theWord[i];
        let element = document.createElement("li");
        element.innerHTML = letter;

        element.classList.add("hidden", "game-letter");
        gameLetters.appendChild(element);
    }
}

// Filterfunktion som lyssnar efter input som matchar alfabetet - annars raderas det sist inmatade värdet
guessInput.addEventListener("keyup", function () {
    if (!guessInput.value.match(/^[a-zA-z]+$/) && guessInput.value.length != 0) {
        guessInput.value = guessInput.value.slice(0, -1);
    }
});

// Anropar gameBtn.addEventListener("click", compareLetter);
guessInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        gameBtn.click();
    }
});

gameBtn.addEventListener("click", compareLetter);

// Funktion som jämför det inmatade värdet med ordet (från startInput)
function compareLetter() {

    let gameLetter = document.getElementsByClassName("game-letter");
    let input = guessInput.value.toUpperCase();
    let result = theWord.filter(letter => letter == input);

    correctLetters.length = theWord.length;

    // Rensar guessInput fältet efter varje gissad bokstav
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

    // Switch case, kollar värdet av failCount och tar bort klasser baserat på failCounts värde.
    switch (failCount) {
        case 1:
            ground.classList.remove("hang-hidden");
            ground.classList.add("fade-in");
            break;
        case 2:
            scaffold.classList.remove("hang-hidden");
            scaffold.classList.add("fade-in");
            break;
        case 3:
            head.classList.remove("hang-hidden");
            head.classList.add("fade-in");
            break;
        case 4:
            body.classList.remove("hang-hidden");
            body.classList.add("fade-in");
            break;
        case 5:
            arms.classList.remove("hang-hidden");
            arms.classList.add("fade-in");
            break;
        case 6:
            legs.classList.remove("hang-hidden");
            legs.classList.add("fade-in");
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
    clearInterval(intervalID);

    // Scrollar ned till botten
    window.scrollTo(0, document.body.scrollHeight);
    remainingGuesses = 6 - failCount;
    endTitle.innerHTML = "You completed the word!";

    if (remainingTime > 60) {
        timeBonus = 7;
    } else if (remainingTime > 50) {
        timeBonus = 6;
    } else if (remainingTime > 40) {
        timeBonus = 5;
    } else if (remainingTime > 30) {
        timeBonus = 4;
    } else if (remainingTime > 20) {
        timeBonus = 3;
    } else if (remainingTime > 10) {
        timeBonus = 2;
    } else if (remainingTime < 10) {
        timeBonus = 1;
    }

    points = timeBonus + remainingGuesses;

    if (remainingGuesses == 6) {
        endScore.innerHTML = "You won without any wrong guesses, <br>" + "you got " + points + "  of 13 points!";
    } else if (remainingGuesses > 0 && remainingGuesses < 6) {
        endScore.innerHTML = "You won with " + remainingGuesses + " attempts remaining and <br>" +
            "you got " + points + " of 13 points!";
    }
}

function loseCondition() {
    clearInterval(intervalID);

    // Scrollar ned till botten
    window.scrollTo(0, document.body.scrollHeight);
    document.getElementById("end-title").innerHTML = "Oh no! You lost!";
    endScore.innerHTML = "You ran out of attempts or time. <br> The word was " + theWord.join("");
}

function hideHangman() {
    ground.classList.add("hang-hidden");
    scaffold.classList.add("hang-hidden");
    head.classList.add("hang-hidden");
    body.classList.add("hang-hidden");
    arms.classList.add("hang-hidden");
    legs.classList.add("hang-hidden");
    ground.classList.remove("fade-in");
    scaffold.classList.remove("fade-in");
    head.classList.remove("fade-in");
    body.classList.remove("fade-in");
    arms.classList.remove("fade-in");
    legs.classList.remove("fade-in");
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
};

function startTimer(time) {
    intervalID = setInterval(timer, 1000);
    remainingTime = time;

    function timer() {
        remainingTime--;
        displayTime.innerText = remainingTime + "s remaining!";

        if (remainingTime <= 0) {
            loseCondition();
            remainingTime = 9999;
        }
    };
};

// Restart
restartBtn.addEventListener('click', function () {
    document.getElementById("end-title").innerHTML = "You completed the word!";
});

redoBtn.addEventListener("click", function () {
    resetInput();
    clearInterval(intervalID);
    window.scrollTo(0, 0);
})

redoBtn.addEventListener("mouseover", function () {
    redoBtn.style.transform = 'rotate(360deg)';
})

redoBtn.addEventListener("mouseleave", function () {
    redoBtn.style.transform = 'rotate(0deg)';
})
