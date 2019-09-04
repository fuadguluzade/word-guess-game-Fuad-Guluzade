var winCount = 0;
var curWord = ["Michael Jackson", "Madonna", "Queen", "Aerosmith"]; 
var imagesArray = [];
var songsNameArray = ["Billy Jean", "Crazy for you", "I want to break free", "Rag Doll"];
var curWordIndex = 0;
var remGuess = 13;
var guessedArray = [];
var underscores = [];

var mj = document.getElementById("mj");
mj.muted = false;
var aerosmith = document.getElementById("aerosmith");
aerosmith.muted = false;
var queen = document.getElementById("queen");
queen.muted = false;
var madonna = document.getElementById("madonna");
madonna.muted = false;

var songsArray = [mj, madonna, queen, aerosmith];


imagesArray[0] = "../word-guess-game-Fuad-Guluzade/assets/images/mj.jpg";
imagesArray[1] = "../word-guess-game-Fuad-Guluzade/assets/images/madonna.jpg";
imagesArray[2] = "../word-guess-game-Fuad-Guluzade/assets/images/queen.jpg";
imagesArray[3] = "../word-guess-game-Fuad-Guluzade/assets/images/aerosmith.jpg";

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
            document.querySelector('.songImg').src = imagesArray[curWordIndex];
            document.getElementById("songName").innerHTML = songsNameArray[curWordIndex] + ' by ' + curWord[curWordIndex];
            if (curWordIndex > 0) {
                var v = curWordIndex;
                stopAudio(songsArray[--v]);
            }
            songsArray[curWordIndex].play();
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
    stopAudio(songsArray[--curWordIndex]);
    showGamePanel();
    beginGame();
}

function stopAudio(song) {
    song.pause();
    song.currentTime = 0;
}

function showGamePanel() {
    document.getElementById("gameOver").style.display = 'none';
    document.getElementById("panelElements").style.display = 'inherit';
    document.getElementById("songImg").src = ""
    document.getElementById("songName").innerHTML = "If you correctly guess the name of the artist, his, her or their song will be played";
    curWordIndex = 0;
    winCount = 0;
    document.getElementById("winsCount").style.display = 'none';
    underscores = [];
    document.getElementById("currentWord").innerHTML = "../word-guess-game-Fuad-Guluzade/assets/images/80img.jpg";
    remGuess = 13;
    document.getElementById("numOfGuesses").innerHTML = 13;
    guessedArray = [];
    document.getElementById("guessedLetters").innerHTML = guessedArray;
}

beginGame();


