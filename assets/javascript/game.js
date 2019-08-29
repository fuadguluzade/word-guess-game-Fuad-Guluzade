var winCount = 0;
var curWord = ["Michael Jackson"]; //"Madonna", "Queen", "Aerosmith"
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
    document.getElementById("panelElements").style.display = 'inherit';
    showHidden();
    document.onkeyup = function (event) {
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
            }
        }
        if (!(underscores.includes('_'))) {
            winCount++;
            document.getElementById("winsCount").style.display = 'inherit';
            document.getElementById("winsCount").innerHTML = winCount;
            document.getElementById("songName").style.display = 'inherit';
            document.getElementById("songName").innerHTML = songsArray[curWordIndex] + ' by ' + curWord[curWordIndex];
            changeQuestion();
        } else if (remGuess === 0) {
            changeQuestion();
        }
    }
}

function changeQuestion() {
    curWordIndex++;
    if (curWordIndex < curWord.length) {
        remGuess = 13;
        document.querySelector("#numOfGuesses").innerHTML = 13;
        guessedArray = [];
        underscores = [];
        document.querySelector("#guessedLetters").innerHTML = guessedArray;
        beginGame();
    }
    else {
        endGame();
    }

    function endGame() {
        document.getElementById("panelElements").style.display = 'none';
        var p = document.createElement("p");
        var n = document.createTextNode(`GAME OVER! You have won ${winCount} times`);
        p.appendChild(n);
        document.getElementById("gameOver").appendChild(p);
        document.onkeyup = beginGame();
    }

}

beginGame();



