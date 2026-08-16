const choices = {
  rock: { label: 'Piedra', icon: '✊' },
  paper: { label: 'Papel', icon: '✋' },
  scissors: { label: 'Tijera', icon: '✌️' }
};

const state = {
  player: 0,
  cpu: 0,
  draws: 0
};

const refs = {
  playerScore: document.getElementById('player-score'),
  cpuScore: document.getElementById('cpu-score'),
  drawScore: document.getElementById('draw-score'),
  playerChoice: document.getElementById('player-choice'),
  cpuChoice: document.getElementById('cpu-choice'),
  status: document.getElementById('status'),
  resetBtn: document.getElementById('reset-btn')
};

function setChoiceDisplay(element, value) {
  if (!value) {
    element.textContent = '?';
    element.style.opacity = '0.7';
    return;
  }

  const choice = choices[value];
  element.textContent = choice.icon;
  element.style.opacity = '1';
}

function setStatus(message, tone = 'neutral') {
  refs.status.textContent = message;
  refs.status.dataset.tone = tone;
}

function updateScores() {
  refs.playerScore.textContent = String(state.player);
  refs.cpuScore.textContent = String(state.cpu);
  refs.drawScore.textContent = String(state.draws);
}

function getCpuChoice() {
  const keys = Object.keys(choices);
  return keys[Math.floor(Math.random() * keys.length)];
}

function decideWinner(playerChoice, cpuChoice) {
  if (playerChoice === cpuChoice) {
    return 'draw';
  }

  const wins = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  return wins[playerChoice] === cpuChoice ? 'win' : 'loss';
}

function handleChoice(playerChoice) {
  const cpuChoice = getCpuChoice();
  const result = decideWinner(playerChoice, cpuChoice);

  setChoiceDisplay(refs.playerChoice, playerChoice);
  setChoiceDisplay(refs.cpuChoice, cpuChoice);

  if (result === 'win') {
    state.player += 1;
    setStatus(`¡Ganaste! ${choices[playerChoice].label} vence a ${choices[cpuChoice].label}.`, 'win');
  } else if (result === 'loss') {
    state.cpu += 1;
    setStatus(`Perdiste. ${choices[cpuChoice].label} vence a ${choices[playerChoice].label}.`, 'loss');
  } else {
    state.draws += 1;
    setStatus(`Empate. Ambos eligieron ${choices[playerChoice].label}.`, 'draw');
  }

  updateScores();
}

function resetGame() {
  state.player = 0;
  state.cpu = 0;
  state.draws = 0;
  setChoiceDisplay(refs.playerChoice, null);
  setChoiceDisplay(refs.cpuChoice, null);
  setStatus('Elige tu movimiento', 'neutral');
  updateScores();
}

document.querySelectorAll('.choice-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const choice = button.dataset.choice;
    handleChoice(choice);
  });
});

refs.resetBtn.addEventListener('click', resetGame);
resetGame();
