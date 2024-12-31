function showPopup(message) {
  document.querySelector(".wrapper").style.display = "none";
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup").style.display = "flex";
  document.getElementById("win").style.display = "flex";
}

function drawShowPopUP(message) {
  document.querySelector(".wrapper").style.display = "none";
  document.getElementById("win").style.display = "none";
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.querySelector(".wrapper").style.display = "block";
}

const updatePlayerTurnMessage = () => {
  const messageDiv = document.querySelector(".message");
  messageDiv.textContent = `Player '${xturn ? "X" : "O"}' turn`;
};

const allbtns = document.querySelectorAll(".cell");
const restartbtn = document.querySelector(".restartGame");
const resetbtn = document.querySelector(".reset-button");

let xturn = true;
let count = 0;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];

const showResetbtn = () => {
  if (count > 0) {
    resetbtn.style.visibility = "visible";
  } else {
    resetbtn.style.visibility = "hidden";
  }
};

const enableButtons = () => {
  allbtns.forEach((button) => {
    button.disabled = false;
    button.innerText = "";
    button.style.color = "";
    button.style.cursor = "pointer";
    delete button.dataset.value;
  });

  xturn = true;
  count = 0;
};

const checkWinner = () => {
  for (const [a, b, c] of winningPatterns) {
    const values = [
      allbtns[a].dataset.value,
      allbtns[b].dataset.value,
      allbtns[c].dataset.value,
    ];
    if (values.every((val) => val && val === values[0])) {
      return values[0];
    }
  }
  return null;
};

const handleGameEnd = (winner) => {
  if (winner) {
    showPopup(`Player '${winner}' wins!`);
  } else if (count === 9) {
    drawShowPopUP("It's a draw!");
  }
};

const handleClick = (element) => {
  if (!element.dataset.value) {
    element.dataset.value = xturn ? "X" : "O";
    element.innerText = element.dataset.value;
    element.style.color = "white";
    element.style.cursor = "not-allowed";
    xturn = !xturn;
    count++;

    updatePlayerTurnMessage();

    const winner = checkWinner();
    handleGameEnd(winner);
    showResetbtn();
  }
};

const newGame = () => {
  enableButtons();
  closePopup();
  showResetbtn();
  updatePlayerTurnMessage();
};

const setupGameControls = () => {
  allbtns.forEach((element) => {
    element.addEventListener("click", () => handleClick(element));
    element.addEventListener("mouseenter", () => {
      if (!element.dataset.value) {
        element.style.color = "rgba(0, 0, 0, 0.4)";
        element.textContent = xturn ? "X" : "O";
      }
    });
    element.addEventListener("mouseleave", () => {
      if (!element.dataset.value) {
        element.textContent = "";
        element.style.color = "";
      }
    });
  });

  restartbtn.addEventListener("click", newGame);
  resetbtn.addEventListener("click", enableButtons);
  showResetbtn();
};

setupGameControls();
updatePlayerTurnMessage();
