document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.game-button');
  const streakCounter = document.getElementById('streakCounter');
  const gameBoard = document.querySelector('.game-board');
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');
  let sequence = [];
  let currentStep = 0;
  let streak = 0;
  let gameActive = false;

  const newStep = () => {
    if (!gameActive) return;
    const randomButton = Math.floor(Math.random() * buttons.length);
    sequence.push(randomButton);
    showSequence();
  };

  const showSequence = () => {
    let i = 0;
    buttons.forEach(btn => (btn.disabled = true));
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval);
        buttons.forEach(btn => (btn.disabled = false));
        return;
      }
      flashButton(buttons[sequence[i]]);
      i++;
    }, 800);
  };

  const flashButton = button => {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 400);
  };

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (!gameActive) return;
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
    gameActive = true;
    resetGame();
    newStep();
  });

  pauseButton.addEventListener('click', () => {
    gameActive = false;
  });

  const resetGame = () => {
    sequence = [];
    currentStep = 0;
    streak = 0;
    streakCounter.textContent = `Streak: ${streak}`;
  };
});
