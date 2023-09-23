let sequence = []; // array to store the random sequence selected by the computer
let playerSequence = []; // array to store the sequence selected by the player
let currentStep; // variable to keep track of the current sequence in the game
let score; // variable to keep track of the player's score
let playerInput; // boolean variable to see if player's input and computer sequence matches
let compSequence; // boolean variable to control whether the computer is showing the sequence
let intervalId; // variable to store the ID of the intervals used for the computer's display sequence
let strict = false; // boolean variable to determine if game is in strict mode
let on = false; // boolean variable to control whether game is turned on
let win; // boolean variable to track whether the player has won the game

// DOM elements to select specific HTML ID's
const scoreCounter = document.querySelector("#score");
const topLeftButton = document.querySelector("#topleftbutton");
const topRightButton = document.querySelector("#toprightbutton");
const bottomLeftButton = document.querySelector("#bottomleftbutton");
const bottomRightButton = document.querySelector("#bottomrightbutton");
// checkboxes to toggle strict and on/off and to start the game
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

let soundOn = document.getElementById('sound') // refrences the sound ID from the checkbox input in HTML

function playSound(soundNumber) {
    let audioElement = document.getElementById('simonSound' + soundNumber);
    audioElement.play();
}

// plays a sound when a button is clicked if the sound checkbox is checked
function getButtonAndPlaySound (btnId, soundNumber) {
  document.getElementById(btnId).addEventListener('click', function() {
    if (soundOn.checked) {
      playSound(soundNumber)
    }
  });
}
// button will play the sound based on the simon sound number, labeled by location
getButtonAndPlaySound ('topleftbutton', 1)
getButtonAndPlaySound ('toprightbutton', 2)
getButtonAndPlaySound ('bottomleftbutton', 3)
getButtonAndPlaySound ('bottomrightbutton', 4)

// event listener added to the "strict" button
// handles player interactions and allows player to toggle on if checked and remains off if unchecked.
strictButton.addEventListener('click', () => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

// event listener for the "on/off" button
onButton.addEventListener('click', () => {
  if (onButton.checked == true) {
    on = true;
    scoreCounter.innerHTML = "🎮";
  } else {
    on = false;
    scoreCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

// event listener for the "play" button
startButton.addEventListener('click', () => {
  if (on || win) {
    play();
  }
});

// function to initialize the game
function play() {
  clearInterval(intervalId);
  win = false;
  sequence = [];
  playerSequence = [];
  currentStep = 0;
  intervalId = 0;
  score = 1;
  scoreCounter.innerHTML = score;
  playerInput = true;
  // initiate a for loop to generate a random sequence of buttons pressed by the computer
  for (var i = 0; i < 20; i++) {
    sequence.push(Math.floor(Math.random() * 4) + 1);
  }
  compSequence = true;

  intervalId = setInterval(gameSequence, 700);
}

// display the the computer's sequence of button presses
// computer plays the corresponding simon sounds and highlights the buttons with a specific color
// once the game sequence is complete, it allows the player to mimic the sequence
function gameSequence() {
  on = false;

  if (currentStep == score) {
    clearInterval(intervalId);
    compSequence = false;
    clearColor();
    on = true;
  }

  if (compSequence) {
    clearColor();
    setTimeout(() => {
      if (sequence[currentStep] == 1) one();
      if (sequence[currentStep] == 2) two();
      if (sequence[currentStep] == 3) three();
      if (sequence[currentStep] == 4) four();
      currentStep++;
    }, 200);
  }
}

// when sound is checked, it will play the simon sound number that matches the location of the button and highlight a light blue color
// each function is labeled by number which also matches the simon sound number
function one() {
  if (soundOn.checked) {
    let audio = document.getElementById("simonSound1");
    audio.play();
  }
  topLeftButton.style.backgroundColor = "lightblue";
}

function two() {
  if (soundOn.checked) {
    let audio = document.getElementById("simonSound2");
    audio.play();
  }
  topRightButton.style.backgroundColor = "lightblue";
}

function three() {
  if (soundOn.checked) {
    let audio = document.getElementById("simonSound3");
    audio.play();
  }
  bottomLeftButton.style.backgroundColor = "lightblue";
}

function four() {
  if (soundOn.checked) {
    let audio = document.getElementById("simonSound4");
    audio.play();
  }
  bottomRightButton.style.backgroundColor = "lightblue";
}

// clears the highlight of the computer's sequence and resets the buttons back to it's original color
function clearColor() {
  topLeftButton.style.backgroundColor = "blue";
  topRightButton.style.backgroundColor = "palevioletred";
  bottomLeftButton.style.backgroundColor = "darkorange";
  bottomRightButton.style.backgroundColor = "purple";
}

// current sequence or button pressed by the computer... will light up
function currentStepColor() {
  topLeftButton.style.backgroundColor = "lightblue";
  topRightButton.style.backgroundColor = "lightblue";
  bottomLeftButton.style.backgroundColor = "lightblue";
  bottomRightButton.style.backgroundColor = "lightblue";
}

// event listeners are added to each of the four colored buttons
// when a button is clicked, it adds the corresponding button number to the "playerSequence" array, then checks if it matches the computer sequence
topLeftButton.addEventListener('click', () => {
  if (on) {
    playerSequence.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRightButton.addEventListener('click', () => {
  if (on) {
    playerSequence.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeftButton.addEventListener('click', () => {
  if (on) {
    playerSequence.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRightButton.addEventListener('click', () => {
  if (on) {
    playerSequence.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

// check the player's sequence to see if it matches the computer sequence
// if player sequence is not correct, it reacts with an "x" .... in "strict mode" it will reset the score to 1.
function check() {
  if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1])
    playerInput = false;

  if (!playerInput) {
    currentStepColor();
    scoreCounter.innerHTML = "❌";
    setTimeout(() => {
      scoreCounter.innerHTML = score;
      clearColor();

      if (strict) {
        play();
      } else {
        compSequence = true;
        currentStep = 0;
        playerSequence = [];
        playerInput = true;
        intervalId = setInterval(gameSequence, 700);
      }
    }, 700);
    return;
  }
  // if player completes the sequence correctly and reaches a score of 10, they win the game
  if (score === 10) {
    winGame(); 
  }

  // player successfully completes the sequence, their score increases and the game progresses to the next sequence
  if (score == playerSequence.length && playerInput && !win) {
    playerSequence = [];
    compSequence = true;
    currentStep = 0;
    score++;
    scoreCounter.innerHTML = score;
    intervalId = setInterval(gameSequence, 700);
  }
}

function winGame() {
  currentStepColor();
  scoreCounter.innerHTML = "WIN 🏆";
  on = false;
  win = true;
}