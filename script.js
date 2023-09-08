const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flippedCards = 0;
//when noClick = true then you cannot click
let noClick = false;


const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    // "purple",
    "red",
    "blue",
    "green",
    "orange",
    // "purple"
  ];

  function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
  
      // Decrease counter by 1
      counter--;
  
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
}

let shuffledColors = shuffle(COLORS);
//creating the cards for the game
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }
//creating the function to handle what happens when the card is clicked
  function handleCardClick(event) {
    if (noClick) return;
    if (event.target.classList.contains ('flipped')) return;

    
    let currentCard = event.target;
    console.log ("You just clicked on", (currentCard));
    currentCard.style.backgroundColor = currentCard.classList [0];
//check to see if the cards match
    if (!card1 || !card2){
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  //fucntion for when both cards are clicked
    if (card1 && card2){
      noClick= true;
      let color1 = card1.className;
      let color2 = card2.className;
// rename the cards because we need card1 & card2 to adjust styles later
      //function to say that if both cards match then reset the class values of card1 and card2; if they don't match then hold the cards for 1 second then reset the classes 
    if (color1 === color2){
      flippedCards += 2;
      card1.removeEventListener ('click',handleCardClick);
      card2.removeEventListener ('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClick= false;
    }else{
      setTimeout(function(){
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1= null;
        card2= null;
        noClick= false;
      }, 1000);
    }
  }

  //set a function that alerts the user that the game is over!
  if (flippedCards === COLORS.length) alert ('You won!!');
  }
// creates the grid structure for the game
  createDivsForColors(shuffledColors);

