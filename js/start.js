const playBtn = document.querySelector('.buttons__button_play');
const howToPlayBtn = document.querySelector('.buttons__button_how-to-play');

//Play game function.
function playGame() {
  document.location.href = './html/play.html';
}

playBtn.addEventListener('click', playGame);

//How-to-play transition.
function howToPlay() {
  document.location.href = './html/howtoplay.html';
}

howToPlayBtn.addEventListener('click', howToPlay);
