var winCount = 0;
var curWord = ["Michael Jackson", "Madonna", "Queen", "Aerosmith"]; //
var songsArray = ["Billy Jean", "Crazy for you", "I want to break free", "Rag Doll"]
var curWordIndex = 0;
var remGuess = 13;
var guessedArray = [];
var underscores = [];

function showHidden() {
    for (var i = 0; i < curWord[curWordIndex].length; i++) {
        if (curWord[curWordIndex][i] == " ") {
            underscores.push("&nbsp;");
        } else {
            underscores.push('_');
        }
    }
    document.querySelector('#currentWord').innerHTML = underscores.join(' ');

}

function beginGame() {
    showHidden();
    document.onkeyup = function (event) {
        if (event.keyCode === 32) {
            return false;
        }
        word = curWord[curWordIndex].toUpperCase();
        guessedLetter = event.key.toUpperCase();
        var letterIndex = 0;
        if (word.includes(guessedLetter)) {
            while (letterIndex < word.length) {
                if (guessedLetter === word[letterIndex]) {
                    underscores[letterIndex] = guessedLetter;
                    document.querySelector('#currentWord').innerHTML = underscores.join(' ');
                }
                letterIndex++;
            }
        } else {
            if (!(guessedArray.includes(guessedLetter))) {
                guessedArray.push(guessedLetter);
                document.querySelector("#guessedLetters").innerHTML = guessedArray;
                remGuess--;
                document.querySelector("#numOfGuesses").innerHTML = remGuess;

                if (remGuess === 0) {
                    curWordIndex++;
                    if (curWordIndex < curWord.length) {
                        changeQuestion();
                    } else {
                        endGame();
                    }
                }
            }
        }
        if (!(underscores.includes('_'))) {
            winCount++;
            document.getElementById("winsCount").style.display = 'inherit';
            document.getElementById("winsCount").innerHTML = winCount;
            document.getElementById("songName").style.display = 'inherit';
            document.getElementById("songName").innerHTML = songsArray[curWordIndex] + ' by ' + curWord[curWordIndex];
            curWordIndex++;
            if (curWordIndex < curWord.length) {
                changeQuestion();
            } else {
                endGame();
            }
        }
    }
}

function changeQuestion() {
    remGuess = 13;
    document.querySelector("#numOfGuesses").innerHTML = 13;
    guessedArray = [];
    underscores = [];
    document.querySelector("#guessedLetters").innerHTML = guessedArray;
    beginGame();
}

function endGame() {
    document.getElementById("panelElements").style.display = 'none';
    document.getElementById("userHelp").textContent = 'Press <r> key to restart';
    var p = document.createElement("p");
    var n = document.createTextNode(`GAME OVER! You have won ${winCount} times`);
    p.appendChild(n);
    document.getElementById("gameOver").appendChild(p);
    document.onkeyup = function (event) {
        if (event.keyCode === 82) {
            restartGame();
        }
        else {
            return false;
        }
    }
}

function restartGame() {
    document.getElementById("userHelp").textContent = 'Press any key to begin';
    showGamePanel();
    beginGame();
}

function showGamePanel() {
    document.getElementById("gameOver").style.display = 'none';
    document.getElementById("panelElements").style.display = 'inherit';
    curWordIndex = 0;
    winCount = 0;
    document.getElementById("winsCount").innerHTML = winCount;
    underscores = [];
    document.getElementById("currentWord").innerHTML = "";
    remGuess = 13;
    document.getElementById("numOfGuesses").innerHTML = 13;
    guessedArray = [];
    document.getElementById("guessedLetters").innerHTML = guessedArray;
}

beginGame();



