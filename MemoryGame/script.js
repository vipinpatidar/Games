// Creating a Array of all required image and there name
const cardArray = [
  {
    name: "fries",
    image: "img/fries.png",
  },
  {
    name: "cheeseburger",
    image: "img/cheeseburger.png",
  },
  {
    name: "hotdog",
    image: "img/hotdog.png",
  },
  {
    name: "ice-cream",
    image: "img/ice-cream.png",
  },
  {
    name: "milkshake",
    image: "img/milkshake.png",
  },
  {
    name: "pizza",
    image: "img/pizza.png",
  },
  {
    name: "fries",
    image: "img/fries.png",
  },
  {
    name: "cheeseburger",
    image: "img/cheeseburger.png",
  },
  {
    name: "hotdog",
    image: "img/hotdog.png",
  },
  {
    name: "ice-cream",
    image: "img/ice-cream.png",
  },
  {
    name: "milkshake",
    image: "img/milkshake.png",
  },
  {
    name: "pizza",
    image: "img/pizza.png",
  },
];

// console.log(cardArray.sort(() => 0.5 - Math.random()));
// puting variables in open scope
let cardChosen = [];
let cardChosenId = [];
let cardWon = [];

cardArray.sort(() => 0.5 - Math.random()); // sort function not run for one time
//it runs on every element and comapare it with result if it is +ve or -ve it go on next number and compare with last one whit new random value it can be +ve or -ve or -ve or

// createing Element and appending blank.png in div grid
function creatBoard() {
  for (let i = 0; i < 12; i++) {
    const card = document.createElement("img");
    // console.log(card);

    card.setAttribute("src", "img/blank.png");
    // giving an id to card which will vary with sort() function
    card.setAttribute("data-id", i);
    grid.appendChild(card);

    card.addEventListener("click", flipCard);
  }
}
creatBoard();
// function for checking the match of the card when clicked
function checkMatch() {
  const card = document.querySelectorAll("img");
  const cardImg = document.querySelectorAll("img");
  // clicked and then pushed in cardChosenId array id
  const optionOneId = cardChosenId[0];
  const optionTwoId = cardChosenId[1];
  // if clicked cardChosenId
  if (optionOneId === optionTwoId) {
    card[optionOneId].setAttribute("src", "img/blank.png");
    card[optionTwoId].setAttribute("src", "img/blank.png");
    alert("You have already chosen this card");
  }
  // if clicked card name are same .. then it's a match
  else if (cardChosen[0] === cardChosen[1]) {
    alert("You have Found a match!");
    // changing match card into white color
    cardImg[optionOneId].setAttribute("src", "img/white.png");
    cardImg[optionTwoId].setAttribute("src", "img/white.png");
    // removeEventListener
    cardImg[optionOneId].removeEventListener("click", flipCard);
    cardImg[optionTwoId].removeEventListener("click", flipCard);
    // pushed matched cards array in cardWon
    cardWon.push(cardChosen);
    console.log(card);
  } else {
    // if clicked card did not matched then make then blank.png again
    card[optionOneId].setAttribute("src", "img/blank.png");
    card[optionTwoId].setAttribute("src", "img/blank.png");
    alert("Sorry Try Again!");
  }
  // putting result with cardWon length
  result.textContent = cardWon.length;
  // again making blank to cardChosenId and cardChosen name so we can select new cards for match
  cardChosen = [];
  cardChosenId = [];

  if (cardWon.length == cardArray.length / 2) {
    result.textContent =
      "Congratulations! You have successfully matched all card";
  }
}

// changing blank.png on click listener to cardArray items with callback function filpCard
function flipCard() {
  const cardId = this.getAttribute("data-id");
  // pushing clicked card name and it's id in to cardChosen array
  cardChosen.push(cardArray[cardId].name);
  cardChosenId.push(cardId);

  this.setAttribute("src", cardArray[cardId].image);

  if (cardChosen.length === 2) {
    // running a function for match clicked two card
    setTimeout(checkMatch, 600);
  }
  // checkMatch();
}
