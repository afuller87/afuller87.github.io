let order = [];
let playerOrder = [];
let flash;
let score;
let good;
let compScore;
let intervalId;
let strict = false;
let on = false;
let win;

const scoreCounter = document.querySelector("#score");
const topLeftButton = document.querySelector("#topleftbutton");
const topRightButton = document.querySelector("#toprightbutton");
const bottomLeftButton = document.querySelector("#bottomleftbutton");
const bottomRightButton = document.querySelector("#bottomrightbutton");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

let soundOn = document.getElementById('sound')

function playSound(soundNumber) {
    let audioElement = document.getElementById('simonSound' + soundNumber);
    audioElement.play();
}

function getButtonAndPlaySound (btnId, soundNumber) {
  document.getElementById(btnId).addEventListener('click', function() {
    if (soundOn.checked) {
      playSound(soundNumber)
    }
  });
}

getButtonAndPlaySound ('topleftbutton', 1)
getButtonAndPlaySound ('toprightbutton', 2)
getButtonAndPlaySound ('bottomleftbutton', 3)
getButtonAndPlaySound ('bottomrightbutton', 4)

strictButton.addEventListener('click', () => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', () => {
  if (onButton.checked == true) {
    on = true;
    scoreCounter.innerHTML = "-";
  } else {
    on = false;
    scoreCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', () => {
  if (on || win) {
    play();
  }
});

function play() {
  clearInterval(intervalId);
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  score = 1;
  scoreCounter.innerHTML = 0;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compScore = true;

  intervalId = setInterval(gameScore, 800);
}

function gameScore() {
  on = false;

  if (flash == score) {
    clearInterval(intervalId);
    compScore = false;
    clearColor();
    on = true;
  }

  if (compScore) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (soundOn.checked) {
    let audio = document.getElementById("simonSound1");
    audio.play();
  }
  topLeftButton.style.backgroundColor = "lightgreen";
}

function two() {
  if (soundOn.checked) {
    let audio = document.getElementById("simonSound2");
    audio.play();
  }
  topRightButton.style.backgroundColor = "tomato";
}

function three() {
  if (soundOn.checked) {
    let audio = document.getElementById("simonSound3");
    audio.play();
  }
  bottomLeftButton.style.backgroundColor = "yellow";
}

function four() {
  if (soundOn.checked) {
    let audio = document.getElementById("simonSound4");
    audio.play();
  }
  bottomRightButton.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeftButton.style.backgroundColor = "darkgreen";
  topRightButton.style.backgroundColor = "darkred";
  bottomLeftButton.style.backgroundColor = "goldenrod";
  bottomRightButton.style.backgroundColor = "darkblue";
}

function flashColor() {
  topLeftButton.style.backgroundColor = "lightgreen";
  topRightButton.style.backgroundColor = "tomato";
  bottomLeftButton.style.backgroundColor = "yellow";
  bottomRightButton.style.backgroundColor = "lightskyblue";
}

topLeftButton.addEventListener('click', () => {
  if (on) {
    playerOrder.push(1);
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
    playerOrder.push(2);
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
    playerOrder.push(3);
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
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (!good) {
    flashColor();
    scoreCounter.innerHTML = "NO!";
    setTimeout(() => {
      scoreCounter.innerHTML = score;
      clearColor();

      if (strict) {
        play();
      } else {
        compScore = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameScore, 800);
      }
    }, 800);
    return;
  }

  if (playerOrder.length == 20 && good) {
    winGame();
  }

  if (score == playerOrder.length && good && !win) {
    playerOrder = [];
    compScore = true;
    flash = 0;
    scoreCounter.innerHTML = score;
    score++;
    intervalId = setInterval(gameScore, 800);
  }
}

function winGame() {
  flashColor();
  scoreCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}