let cpuCards = [
  " 🪨",
  " 🪨",
  " 🪨",
  " 🪨",
  " 🪨",
  " 📃",
  " 📃",
  " 📃",
  " 📃",
  " 📃",
  " ✂️",
  " ✂️",
  " ✂️",
  " ✂️",
  " ✂️",
];
let playerCards = [
  " 🪨",
  " 🪨",
  " 🪨",
  " 🪨",
  " 🪨",
  " 📃",
  " 📃",
  " 📃",
  " 📃",
  " 📃",
  " ✂️",
  " ✂️",
  " ✂️",
  " ✂️",
  " ✂️",
];
let turnCount = 0;
let isRunning = true;
let consecutiveWeapon = 1;
let previousCard = "";
let consecutiveTies = 0;

function updateTurn() {
  document.getElementById("turn").innerHTML = "<b>Turn: </b>" + turnCount;
  playerCards.sort();
  cpuCards.sort();
  document.getElementById("playerDeckDisplay").innerHTML =
    "<b>Your Deck: </b>" + playerCards;
  document.getElementById("cpuDeckDisplay").innerHTML =
    "<b>Opponents's Deck: </b>" + cpuCards;
}

function playerTurn(card) {
  if (isRunning) {
    turnCount++;
    updateTurn();
    updateLog("Player Picked: " + card);
    document.getElementById("playerCardPicked").innerHTML =
      "<b>You Chose:</b>" + card;
    if (deckCheck(card)) {
      let cpuIndex = Math.floor(Math.random() * cpuCards.length);
      let cpuCard = cpuCards[cpuIndex];
      document.getElementById("cpuCardPicked").innerHTML =
        "<b>The Opponent Chose:</b>" + cpuCard;
      updateLog("Opponent Picked: " + cpuCard);
      if (cpuCard === card) {
        // Tie
        consecutiveTies++;
        document.getElementById("message").innerHTML = "Tie!";
        updateLog("Round: " + turnCount + " - Player and Opponent Tied");
        // Tie 3x in a row
        if (consecutiveTies >= 3) {
          cpuTieIndex = Math.floor(Math.random() * cpuCards.length);
          playerTieIndex = Math.floor(Math.random() * playerCards.length);
          updateLog("Player and Opponent Tied" + " 3 Consecutive Times");
          document.getElementById("message").innerHTML =
            document.getElementById("message").innerHTML +
            " Tied 3 rounds consecutively, Player's" +
            playerCards[playerTieIndex] +
            " and Opponent's" +
            cpuCards[cpuTieIndex] +
            " randomly broke.";
          updateLog(
            " Tied 3 rounds consecutively, Player's" +
              playerCards[playerTieIndex] +
              " and Opponent's" +
              cpuCards[cpuTieIndex] +
              " randomly broke."
          );
          playerCards.splice(cpuTieIndex, 1);
          cpuCards.splice(playerTieIndex, 1);
          consecutiveTies = 0;
        }
      }
      if (card === " 🪨" && cpuCard === " ✂️") {
        //P:Rock & C:Scissors
        consecutiveTies = 0;
        document.getElementById("message").innerHTML = "You won this round!";
        updateLog("Round: " + turnCount + " - Player Won, Opponent Lost");
        playerCards.push(cpuCard);
        cpuCards.splice(cpuIndex, 1);
      }
      if (card === " ✂️" && cpuCard === " 🪨") {
        //P:Scissors & C:Rock
        consecutiveTies = 0;
        document.getElementById("message").innerHTML = "You lost this round!";
        updateLog("Round: " + turnCount + " - Opponent Won, Player Lost");
        cpuCards.push(card);
        playerCards.splice(deckReturn(card), 1);
      }
      if (card === " 📃" && cpuCard === " 🪨") {
        //P:Paper & C:Rock
        consecutiveTies = 0;
        document.getElementById("message").innerHTML = "You won this round!";
        updateLog("Round: " + turnCount + " - Player Won, Opponent Lost");
        playerCards.push(cpuCard);
        cpuCards.splice(cpuIndex, 1);
      }
      if (card === " 🪨" && cpuCard === " 📃") {
        //P:Rock & C:Paper
        consecutiveTies = 0;
        document.getElementById("message").innerHTML = "You lost this round!";
        updateLog("Round: " + turnCount + " - Opponent Won, Player Lost");
        cpuCards.push(card);
        playerCards.splice(deckReturn(card), 1);
      }
      if (card === " ✂️" && cpuCard === " 📃") {
        //P:Scissors & C:Paper
        consecutiveTies = 0;
        document.getElementById("message").innerHTML = "You won this round!";
        updateLog("Round: " + turnCount + " - Player Won, Opponent Lost");
        playerCards.push(cpuCard);
        cpuCards.splice(cpuIndex, 1);
      }
      if (card === " 📃" && cpuCard === " ✂️") {
        //P:Paper & C:Scissors
        consecutiveTies = 0;
        document.getElementById("message").innerHTML = "You lost this round!";
        updateLog("Round: " + turnCount + " - Opponent Won, Player Lost");
        cpuCards.push(card);
        playerCards.splice(deckReturn(card), 1);
      }
      if (card === previousCard) {
        consecutiveWeapon++;
        if (consecutiveWeapon >= 3) {
          updateLog(
            "Player Used" + card + " 3 Consecutive Times, Weapon Broke"
          );
          document.getElementById("message").innerHTML =
            document.getElementById("message").innerHTML +
            " But, you used" +
            card +
            " too many time in a row, and it broke!";
          playerCards.splice(deckReturn(card), 1);
          consecutiveWeapon = 1;
          previousCard = "";
        }
      } else {
        previousCard = card;
        consecutiveWeapon = 1;
      }
    } else {
      document.getElementById("message").innerHTML = "Pick a different card!";
      turnCount--;
    }
    updateTurn();
    gameEnd();
  } else {
    document.getElementById("message").innerHTML = "Click reset to play again!";
  }
}

function deckCheck(card) {
  return playerCards.includes(card);
}

function deckReturn(card) {
  for (let i = 0; i < playerCards.length; i++) {
    if (card === playerCards[i]) {
      return i;
    }
  }
}

function resetGame() {
  var ws = document.getElementById("winScreen");
  ws.style.display = "none";
  cpuCards = [
    " 🪨",
    " 🪨",
    " 🪨",
    " 🪨",
    " 🪨",
    " 📃",
    " 📃",
    " 📃",
    " 📃",
    " 📃",
    " ✂️",
    " ✂️",
    " ✂️",
    " ✂️",
    " ✂️",
  ];
  playerCards = [
    " 🪨",
    " 🪨",
    " 🪨",
    " 🪨",
    " 🪨",
    " 📃",
    " 📃",
    " 📃",
    " 📃",
    " 📃",
    " ✂️",
    " ✂️",
    " ✂️",
    " ✂️",
    " ✂️",
  ];
  turnCount = 0;
  isRunning = true;
  consecutiveWeapon = 1;
  previousCard = "";
  updateTurn();
  document.getElementById("log").innerHTML = "<b>Log:</b>";
  document.getElementById("message").innerHTML =
    "Click any of these cards to start!";
  document.getElementById("cpuCardPicked").innerHTML =
    "<b>The Opponent Chose:</b>";
  document.getElementById("playerCardPicked").innerHTML = "<b>You Chose:</b>";
}

function updateLog(newText) {
  document.getElementById("log").innerHTML =
    document.getElementById("log").innerHTML + "<br>" + newText;
}

function gameEnd() {
  if (playerCards.length === cpuCards.length && playerCards.length === 0) {
    isRunning = false;
    updateLog("Both Opponent and Player Ran Out of Cards - Game Over!");
  } else {
    if (playerCards.length === 0) {
      isRunning = false;
      document.getElementById("message").innerHTML =
        "Game Over! You have no more weapons, the oppponent won in " +
        turnCount +
        " turns!";
      updateLog("Player Ran Out of Cards, Opponent Won - Game Over!");
    }
    if (cpuCards.length === 0) {
      isRunning = false;
      document.getElementById("message").innerHTML =
        "You won the game! The opponent has no more weapons, you won in " +
        turnCount +
        " turns!";
      updateLog("Opponent Ran Out of Cards, Player Won - Game Over!");
      confettiVisibile();
    }
  }
}

function rulesVisibile() {
  var x = document.getElementById("rules");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var y = document.getElementById("rules2");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}

function logVisibile() {
  var x = document.getElementById("log");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function confettiVisibile() {
  var x = document.getElementById("winScreen");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
