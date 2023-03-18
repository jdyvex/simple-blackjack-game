let player = {
  name: "Player",
  chips: 20,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.querySelector("#player-el");

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
  let randomNumber = Math.ceil(Math.random() * 13);
  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber > 10) {
    return 10;
  } else {
    return randomNumber;
  }
}

function startGame() {
  if (player.chips > 0) {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    hasBlackJack = false;
    renderGame();
  } else {
    message = "You've run out of chips! Refill to continue playing.";
    messageEl.textContent = message;
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw again?";
  } else if (sum === 21) {
    message = "Blackjack!";
    hasBlackJack = true;
    player.chips += 50;
  } else {
    if (player.chips >= 20) {
      message = "unlucky, you lost.";
      isAlive = false;
      player.chips -= 20;
    } else {
      message = "You don't have enough chips to continue playing.";
      isAlive = false;
      player.chips = 0;
      playerEl.textContent = player.name + ": $" + player.chips;
    }
  }
  messageEl.textContent = message;
  playerEl.textContent = player.name + ": $" + player.chips;
}

if (player.chips <= 0) {
  isAlive = false;
  message = "You've run out of chips!";
  messageEl.textContent = message;
}

function newCard() {
  let newCardValue = getRandomCard();
  if (isAlive == true && hasBlackJack == false) {
    sum += newCardValue;
    cards.push(newCardValue);
    renderGame();
  }
}

function refillChips() {
  if (player.chips == 0) {
    player.chips += 40;
    playerEl.textContent = player.name + ": $" + player.chips;
  }
}

for (let i = 0; i < cards.length; i++) {
  cardsEl.textContent += cards[i] + " ";
}
