let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By El3mor`;

const numberOfTries = 6;
const numberOfLetters = 6;
let currTry = 1;
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
const msgArea = document.querySelector(".massage");
let hintNumber = 2;
let enabledReset = false;
let newWordRefarsh = 2;

function generateInput() {
  let inputArea = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    for (let j = 1; j <= numberOfLetters; j++) {
      let inputLetter = document.createElement("input");
      inputLetter.type = "text";
      inputLetter.setAttribute("maxLetter", "1");
      inputLetter.id = `guess-${i}-letter-${j}`;
      tryDiv.appendChild(inputLetter);
    }
    inputArea.appendChild(tryDiv);
  }
  inputArea.children[0].children[1].focus();

  let disabledInput = document.querySelectorAll(".disabled-inputs input");
  disabledInput.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.maxLength = 1));
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      input.value = input.value.toUpperCase();
      let nextIndex = inputs[index + 1];
      if (nextIndex && input.value.length === 1) nextIndex.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currIndex = Array.from(inputs).indexOf(this);

      if (event.key === "ArrowRight") {
        const nextIndex = currIndex + 1;
        if (nextIndex < inputs.length) {
          inputs[nextIndex].focus();
        }
      }
      if (event.key === "ArrowLeft") {
        const prevIndex = currIndex - 1;
        if (prevIndex >= 0) {
          inputs[prevIndex].focus();
        }
      }
      if (event.key === "Backspace") {
        const prevIndex = currIndex - 1;
        console.log();
        if (prevIndex >= 0 && event.target.value.length === 0) {
          inputs[currIndex].value = "";
          inputs[prevIndex].focus();
        }
      }
    });
  });
}

const guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click", handleGuesses);

function handleGuesses() {
  let successGuess = true;

  for (let i = 1; i <= numberOfLetters; i++) {
    const inputGuess = document.querySelector(`#guess-${currTry}-letter-${i}`);
    const letter = inputGuess.value.toLowerCase();
    if (wordToGuess[i - 1] === letter) {
      inputGuess.classList.add("full-right");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputGuess.classList.add("right-not-place");
      successGuess = false;
    } else {
      inputGuess.classList.add("wrong");
      successGuess = false;
    }
  }
  if (successGuess) {
    msgArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
    guessBtn.disabled = true;
    hintBtn.disabled = true;
    enabledReset = true;
    anthorWordBtn.classList.add("close")
    if (enabledReset) {
      resetBtn.disabled = false;
    }
    if (hintNumber === 2) {
      let pMsg = document.createElement("p");
      pMsg.innerHTML = `Without Any Hints WOOOOW`;
      msgArea.appendChild(pMsg);
    }
    let allInput = document.querySelectorAll(".inputs > div");
    allInput.forEach((input) => input.classList.add("disabled-inputs"));
  } else {
    document.querySelector(`.try-${currTry}`).classList.add("disabled-inputs");
    const currInput = document.querySelectorAll(`.try-${currTry} input`);
    currInput.forEach((input) => (input.disabled = true));

    currTry++;

    let disabledInput = document.querySelectorAll(`.try-${currTry} input`);
    disabledInput.forEach((input) => (input.disabled = false));
    let el = document.querySelector(`.try-${currTry}`);
    if (el) {
      document
        .querySelector(`.try-${currTry}`)
        .classList.remove("disabled-inputs");
      document.querySelector(`.try-${currTry}`).children[1].focus();
    } else {
      msgArea.innerHTML = `You Lose<span>Try Agin !!!</span>`;
      guessBtn.disabled = true;
      hintBtn.disabled = true;
    anthorWordBtn.classList.add("close")
      enabledReset = true;
      if (enabledReset) {
        resetBtn.disabled = false;
      }
    }
  }
}

const hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click", handleHints);
document.querySelector(".hint span").innerHTML = hintNumber;

function handleHints() {
  if (hintNumber > 0) {
    hintNumber--;
    document.querySelector(".hint span").innerHTML = hintNumber;
  }
  if (hintNumber === 0) {
    hintBtn.disabled = true;
  }

  let allEnabledInputs = document.querySelectorAll("input:not([disabled])");
  let emptyInputs = Array.from(allEnabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyInputs.length);
    let randomInput = emptyInputs[randomIndex];
    let allFaildInput = Array.from(allEnabledInputs).indexOf(randomInput);
    randomInput.value = wordToGuess[allFaildInput].toUpperCase();
  }
}

const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", getReset);

function getReset() {
  window.location.reload();
}



const anthorWordBtn = document.querySelector(".anthorWord");
anthorWordBtn.addEventListener("click", newWord);
document.querySelector(".anthorWord span").innerHTML = `${newWordRefarsh}`;
function newWord() {
  let allInputs =  document.querySelectorAll("input")
  let divsNotFirstChild = document.querySelectorAll('.inputs div:not(:nth-child(1))');
  let inputsInsideDivs = document.querySelectorAll('.inputs div:not(:nth-child(1)) input');
  let divFirstChild = document.querySelectorAll('.inputs div:nth-child(1)');
  let inputinsideFirstChild = document.querySelectorAll('.inputs div:nth-child(1) input');


  if (newWordRefarsh > 0) {
    wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
    newWordRefarsh--;
    document.querySelector(".anthorWord span").innerHTML = `${newWordRefarsh}`;
    allInputs.forEach((input) => (input.value = ""))
    allInputs.forEach((input) => (input.className = ""))
    divsNotFirstChild.forEach((omar) => (omar.classList.add("disabled-inputs")))
    inputsInsideDivs.forEach((omar) => (omar.disabled = true))
    divFirstChild.forEach((omar) => (omar.classList.remove("disabled-inputs")))
    inputinsideFirstChild.forEach((omar) => (omar.disabled = false))
    if (hintNumber < 2) {
        hintNumber = 2
        document.querySelector(".hint span").innerHTML = hintNumber;
    hintBtn.disabled = false;
    }
    
  }

}

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuesses();
  }
});

window.onload = function () {
    generateInput();
  };


