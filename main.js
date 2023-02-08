
const ControlBtn = document.querySelector(".control-button span");

ControlBtn.addEventListener("click",function () {

          let yourName = prompt("what's your name?");

          if (yourName == null || yourName == "") {
            // set name to empty
            document.querySelector(".info-container .name span").textContent = 'unKnown';
          }else {
            // set name to your name
            document.querySelector(".info-container .name span").textContent = yourName;
          }
           // remove splash screen
           // document.querySelector(".control-button").remove();
          document.querySelector(".control-button").classList.add("hide");
          document.getElementById("start").play();
});

// effect duration
let duration = 1000;
// select block containers
let blocksContainer = document.querySelector(".memory-game-blocks");
// create array from game blocks
let blocks = Array.from(blocksContainer.children);
// creTE RANGE OF key
// let orderRange  = [...Array(blocks.length).keys()];
let orderRange  = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
suffle(orderRange);
// console.log(orderRange);

// add order css property to blocks
blocks.forEach((block, index) => {
   block.style.order = orderRange[index];
   block.addEventListener("click", function () {
     // trigger the flip flop function
     flipBlock(block);
   });
})

// flip block function
function flipBlock(selectBlock) {
  // add class is-fliped
  selectBlock.classList.add("is-flipped");
  //collect all fliped card.
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
  // if there two selectBlock
  if (allFlippedBlocks.length === 2) {
    // console.log("two flippedBlock are selescted");

    // stop clicking functon
    stopClicking();
    // check matching block function
    matchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// stopClicking function
function stopClicking() {
  // add class no-clicking on main-container
  blocksContainer.classList.add("no-clicking");

  setTimeout(function () {
    // remove class no-clicking from main-container
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// check matched block
function matchedBlocks(firstBlock, secondBlock) {

  var triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

    firstBlock.classList.remove("is-flipped");
     secondBlock.classList.remove("is-flipped");

     firstBlock.classList.add("has-match");
      secondBlock.classList.add("has-match");
  }
  else {

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

         if ( triesElement.innerHTML == 15) {
            alert("Game Over");
              endGame();
            }

     setTimeout(function () {
       firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
     }, duration)
  }
}

// suffle function

function suffle(array) {
  // set variables
  let current = array.length,
  temp,
  random;

  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);
    // decrease length by 1;
    current--;
    // [1] save current element in stash.
    temp = array[current];
    // [2] current element = random element.
    array[current] = array[random];
    // [3] random element = get element from stash.
    array[random] = temp;
  }
  return array;
}

function endGame() {
   document.querySelector(".control-button").classList.add("show");
   document.getElementById("start").pause();
   window.location.reload();
}
