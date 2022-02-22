const playScreen = document.querySelector('.playscreen');
const dropElement = document.querySelector('.playscreen__field_drop');
const scoreBoard = document.querySelector('.info__score_board');
const livesBoard = document.querySelector('.info__lives_board');

const input = document.querySelector('.controls__display_input');
const keyboard = document.querySelector('.controls__keyboard');

const soundOfwrongAnswer = dropElement.querySelector('.drop__answer_wrong');
const soundOfCorrectAnswer = dropElement.querySelector('.drop__answer_correct');
const soundOfWin = document.querySelector('.info__sound_win');
const soundOfLoser = document.querySelector('.info__sound_loser');

const exitBtn = document.querySelector('.menu__button_exit');
const audioBtn = document.querySelector('.menu__button_sound');
const soundOfWaves = audioBtn.querySelector('.sound__waves_on');
const audioIcon = audioBtn.querySelector('.sound__waves_icon');
const fullscreenBtn = document.querySelector('.menu__button_fullscreen');

const endMessage = document.querySelector('.gameoverscreen__overlay_end-message');
const restartGameBtn = document.querySelector('.gameoverscreen__overlay_restart-game');

let state = {
  score: 5,
  wrongAnswers: 0
}

//Get random number function.
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

//Generate random drop expression.
function generateDropExpression() {
  let num1 = getRandomNumber(0, 10);
  let num2 = getRandomNumber(1, 10);
  let oper = ['+', '-', '×', '÷'][getRandomNumber(0, 3)];

  switch(oper) {
    case '-':
      if (num1 <= num2) {
        do {
          num1 = getRandomNumber(0, 10);
        } while (num1 <= num2);
      }
      break;
    case '÷':
      if ((num1 % num2) !== 0) {
        do {
          num1 = getRandomNumber(0, 10);
        } while ((num1 % num2) !== 0);
      }
      break;
  }

  return {
    num1: num1,
    num2: num2,
    operator: oper
  }
}

//Show drop expression.
function showDropExpression() {
  state.currentDrop = generateDropExpression();
  const operand1 = document.querySelector('.operand1');
  const op = document.querySelector('.operator');
  const operand2 = document.querySelector('.operand2');

  operand1.innerHTML = `${state.currentDrop.num1}`;
  op.innerHTML = `${state.currentDrop.operator}`;
  operand2.innerHTML = `${state.currentDrop.num2}`;
  
  // dropElement.innerHTML = `${state.currentDrop.num1} ${state.currentDrop.operator} ${state.currentDrop.num2}`;
}

showDropExpression();

//Falling drop function.
// function fallingDrop(dropElement) {

// }

//Check answer function.
function checkAnswer() {
  let correctAnswer;
  const curDrop = state.currentDrop;

  if (curDrop.operator == '+') {
    correctAnswer = curDrop.num1 + curDrop.num2;
  } else if (curDrop.operator == '-') {
    correctAnswer = curDrop.num1 - curDrop.num2;
  } else if (curDrop.operator == '×') {
    correctAnswer = curDrop.num1 * curDrop.num2;
  } else if (curDrop.operator == '÷') {
    correctAnswer = curDrop.num1 / curDrop.num2;
  }

  if (parseInt(input.value, 10) === correctAnswer) {
    state.score++;
    dropElement.classList.add('match');
    soundOfCorrectAnswer.play();
    showDropExpression();
    setTimeout(() => dropElement.classList.remove('match'), 451);
  } else {
    state.score--;
    state.wrongAnswers++;
    livesBoard.textContent = 3 - state.wrongAnswers;
    dropElement.classList.add('mistake');
    soundOfwrongAnswer.play();
    showDropExpression();
    setTimeout(() => dropElement.classList.remove('mistake'), 451);
  }
  scoreBoard.innerHTML = state.score;
  lostOrWin();
}

//Check lost or win.
function lostOrWin() {
  if (state.score === 10) {
    endMessage.textContent = 'Cheers, Сhampion!';
    soundOfWaves.pause();
    soundOfWin.play();
    document.body.classList.add('gameoverscreen_active');
    setTimeout(() => restartGameBtn.focus(), 331);
  } if (state.wrongAnswers === 3) {
    endMessage.textContent = 'Oops... You Lost.';
    soundOfWaves.pause();
    soundOfLoser.play();
    document.body.classList.add('gameoverscreen_active');
    setTimeout(() => restartGameBtn.focus(), 331);
  }
};

//Restart game function.
function restartGame() {
  document.body.classList.remove('gameoverscreen_active');
  showDropExpression();
  state.score = 5;
  scoreBoard.innerHTML = state.score;
  state.wrongAnswers = 0;
  livesBoard.textContent = 3;
  soundOfWin.pause();
  soundOfLoser.pause();
}

restartGameBtn.addEventListener('click', restartGame);

//Clear display function.
function clearDisplay() {
  input.value = '';
}

//Backspace function.
function deleteTheLastSymbol() {
  input.value = input.value.slice(0, input.value.length - 1);
}

//Value input function.
keyboard.onclick = function(event) {
  let number = event.target.getAttribute('data-number');
  let action = event.target.getAttribute('data-action');

  if (number) {
    if (input.value.length <= 3) {
      input.value += number;
    }
  } if (action) {
    switch(action) {
      case 'clear':
        clearDisplay();
        break;
      case 'enter':
        if (input.value !== '') {
          checkAnswer();
          clearDisplay();
        }
        break;
      case 'delete':
        deleteTheLastSymbol();
        break;
    } 
  }
}

//Exit game function.
function exitGame() {
  document.location.href = '../start.html';
}

exitBtn.addEventListener('click', exitGame);

//Play audio function.
function togglePlayAudio() {
  if (soundOfWaves.paused) {
    soundOfWaves.play();
      audioIcon.setAttribute('src', '../assets/icons/audio.png');
  } else {
    soundOfWaves.pause();
    audioIcon.setAttribute('src', '../assets/icons/audio-off.png');
  };
};

audioBtn.addEventListener('click', togglePlayAudio);

//Fullscreen function.
function toggleFullscreen() {
  if (!playScreen.fullscreenElement) {
    playScreen.requestFullscreen();
  } else {
    playScreen.exitFullscreen();
  };
};

fullscreenBtn.addEventListener('click', toggleFullscreen);
