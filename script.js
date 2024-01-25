document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.game-button');
  const streakCounter = document.getElementById('streakCounter');
  const gameBoard = document.querySelector('.game-board');
  const startButton = document.getElementById('startButton');
  let sequence = [];
  let currentStep = 0;
  let streak = 0;
  let gameActive = false;
  let sequenceShowing = false;

  const newStep = () => {
    if (!gameActive || sequenceShowing) return;
    const randomButton = Math.floor(Math.random() * buttons.length);
    sequence.push(randomButton);
    showSequence();
  };

  const showSequence = () => {
    let i = 0;
    sequenceShowing = true;
    buttons.forEach(btn => (btn.disabled = true));

    const interval = setInterval(() => {
      flashButton(buttons[sequence[i]]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          buttons.forEach(btn => (btn.disabled = false));
          sequenceShowing = false;
        }, 400);
      }
    }, 800);
  };

  const flashButton = button => {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 400);
  };

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (!gameActive || sequenceShowing) return;
      if (index === sequence[currentStep]) {
        currentStep++;
        if (currentStep === sequence.length) {
          streak++;
          streakCounter.textContent = `Streak: ${streak}`;
          currentStep = 0;
          setTimeout(newStep, 800);
        }
      } else {
        gameBoard.classList.add('shake');
        setTimeout(() => gameBoard.classList.remove('shake'), 500);
        alert('Wrong button! Game over.');
        resetGame();
      }
    });
  });

  startButton.addEventListener('click', () => {
    if (!gameActive) {
      gameActive = true;
      startButton.textContent = 'Pause Game';
      newStep();
    } else {
      gameActive = false;
      startButton.textContent = 'Start Game';
      buttons.forEach(btn => (btn.disabled = true));
    }
  });

  const resetGame = () => {
    sequence = [];
    currentStep = 0;
    streak = 0;
    streakCounter.textContent = `Streak: ${streak}`;
    startButton.textContent = 'Start Game';
    gameActive = false;
    buttons.forEach(btn => (btn.disabled = false));
  };
});
