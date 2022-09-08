/**/
let startbutton = document.getElementById("bttn-start");
let buttonNewGame = document.getElementById("bttnnewGame");
let usedLettersContainer = document.getElementById("usedLetters");
let wordContainer = document.getElementById("wordContainer");
let buttons = document.getElementById("buttons");
let gameOver = document.getElementById("game-over");
let youWin = document.getElementById("you-win");
let usedLetters;
let secretWord;
let hitcounter;
let errores;
let everyLetters = [];
let random;
console.log(document.cookie);
let words =
  document.cookie.length === 0
    ? ["JAVA", "PROGRAMA", "GITHUB"]
    : document.cookie.substring(6, document.cookie.length).split("%2C");

function game() {
  usedLetters = [];
  errores = 0;
  hitcounter = 0;
  usedLettersContainer.innerHTML = "";
  wordContainer.innerHTML = "";
  randomWord();
  document.addEventListener("keydown", validletter);
}

function addWord() {
  let addWord = document.getElementById("newWord");

  if (addWord.value.length > 8) {
    alert("the word must have max 8 letters");
    addWord.value = "";
  } else {
    if (addWord.value == "") {
      alert("Input new word");
    } else {
      if (words.includes(addWord.value.toUpperCase())) {
        alert("This word exist   " + addWord.value);
      } else {
        words.push(addWord.value.toUpperCase());
        document.cookie = "words=" + encodeURIComponent(words);
        alert("Your word " + addWord.value + " has been added");
        addWord.value = "";
      }
    }
  }
}

function drawHangmang() {
  let pantalla = document.getElementById("darw-hangman");
  let pincel = pantalla.getContext("2d");
  //dibujo del muñeco
  //piso
  if (errores == 1) {
    pincel.lineWidth = 5;
    pincel.strokeStyle = "black";
    pincel.beginPath();
    pincel.moveTo(50, 450);
    pincel.lineTo(350, 450);
    pincel.stroke();
  }
  //palo
  if (errores == 2) {
    pincel.beginPath();
    pincel.moveTo(100, 150);
    pincel.lineTo(100, 450);
    pincel.stroke();
  }
  //techo
  if (errores == 3) {
    pincel.beginPath();
    pincel.moveTo(100, 150);
    pincel.lineTo(250, 150);
    pincel.stroke();
  }
  //cuerda
  if (errores == 4) {
    pincel.beginPath();
    pincel.moveTo(250, 150);
    pincel.lineTo(250, 200);
    pincel.stroke();
  }

  //muñeco cabeza
  if (errores == 5) {
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.arc(250, 225, 25, 0, 2 * 3.14);
    pincel.stroke();
  }
  //muñecho cuerpo
  if (errores == 6) {
    pincel.beginPath();
    pincel.moveTo(250, 250);
    pincel.lineTo(250, 350);
    pincel.stroke();
  }
  //muñecho pie 1
  if (errores == 7) {
    pincel.beginPath();
    pincel.moveTo(250, 350);
    pincel.lineTo(215, 400);
    pincel.stroke();
  }
  //muñeco pie2
  if (errores == 8) {
    pincel.beginPath();
    pincel.moveTo(250, 350);
    pincel.lineTo(285, 400);
    pincel.stroke();
  }
  //muñecho brazo 1
  if (errores == 9) {
    pincel.beginPath();
    pincel.moveTo(250, 275);
    pincel.lineTo(215, 300);
    pincel.stroke();
  }
  //muñecho brazo 2
  if (errores == 10) {
    pincel.beginPath();
    pincel.moveTo(250, 275);
    pincel.lineTo(285, 300);
    pincel.stroke();
  }
}
function randomWord() {
  random = words[Math.floor(Math.random() * words.length)].toUpperCase();
  secretWord = random.split("");

  drawLetters();
}
function drawLetters() {
  secretWord.forEach((letter) => {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter.toUpperCase();
    letterElement.classList.add("letter");
    letterElement.classList.add("hidden");
    wordContainer.appendChild(letterElement);
  });
}

function validletter(evento) {
  let newLetter = evento.key.toUpperCase();

  if (newLetter.match(/^[a-zñ]$/i) && !everyLetters.includes(newLetter)) {
    letterInput(newLetter);
  }
}

function letterInput(letter) {
  if (secretWord.includes(letter)) {
    correctLetter(letter);
  } else {
    errores++;
    viewLetter(letter);
    usedLetters.push(letter);
    letterFalse();
    //viewLetter(letter);
  }
  everyLetters.push(letter);
}

function viewLetter(letter) {
  const letterElement = document.createElement("span");
  letterElement.innerHTML = letter;
  usedLettersContainer.appendChild(letterElement);
}

function letterFalse() {
  drawHangmang();

  if (errores == 11) {
    let pantalla = document.getElementById("darw-hangman");
    usedLettersContainer.style.display = "none";
    wordContainer.style.display = "none";
    pantalla.style.display = "none";
    buttonNewGame.style.display = "none";
    gameOver.style.display = "block";
    alert(" The secret word is  " + random);
    finish();
  }
}

const correctLetter = (letter) => {
  const { children } = wordContainer;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML == letter) {
      children[i].classList.toggle("hidden");
      hitcounter++;
    }
    if (hitcounter == secretWord.length) {
      let pantalla = document.getElementById("darw-hangman");
      usedLettersContainer.style.display = "none";
      wordContainer.style.display = "none";
      buttonNewGame.style.display = "none";
      pantalla.style.display = "none";
      youWin.style.display = "block";
      finish();
    }
  }
};

function finish() {
  document.removeEventListener("keydown", validletter);
  console.log(errores);
  console.log(hitcounter);
}
function reset() {
  gameOver.style.display = "none";
  youWin.style.display = "none";
  window.location = "index.html";
}
