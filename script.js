let row = 9;
let column = 9;
let score = 0;

let gameContainer = document.getElementById("gameContainer");
let number = 1;
for (let i = 0; i < row; i++) {
  let row = document.createElement("div");
  row.className = "row";

  for (let j = 0; j < column; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", number);
    cell.addEventListener("click", handleClick);
    number++;
    cell.className = "cell";
    row.appendChild(cell);
  }

  gameContainer.appendChild(row);
}
let bombArr = [];
for (let i = 0; i < 10; i++) {
  let randomNumber = Math.ceil(Math.random() * 81);
  bombArr.push(randomNumber);
}

bombArr.sort(function (a, b) {
  return a - b;
});
//removing dublicates
for (let i = 0; i < bombArr.length; i++) {
  for (let j = i + 1; j < bombArr.length; j++) {
    if (bombArr[i] === bombArr[j]) {
      bombArr[j] = bombArr[j] + 1;
    }
  }
}
console.log(bombArr);

let flag = 0;
function handleClick(event) {
  if (flag === 1) return;

  let x = event.target.getAttribute("id");
  x = parseInt(x, 10);
  //console.log(x);
  for (let i = 0; i < bombArr.length; i++) {
    if (x === bombArr[i]) {
      event.target.classList.add("bombCell");
      flag = 1;
      //console.log("got It");
      popBombs();
      gameOver();
      return;
    }
  }
  event.target.classList.add("normalCell");
  updateScore();
}

function updateScore() {
  score++;
  document.getElementById("score").innerHTML = "Score: " + score;
  if (score >= 71) {
    document.getElementsByClassName("msg")[0].classList.remove("visibility");
    flag = 1;
  }
}
function popBombs() {
  for (let i = 0; i < bombArr.length; i++) {
    let temp = bombArr[i].toString();
    document.getElementById(temp).classList.add("bombCell");
	document.getElementById(temp).innerHTML = String.fromCodePoint(0x1f4a3);//For bomb emoji
  }
}
function gameOver() {
  document.getElementById("gameContainer").classList.add("visiblity");
  document.getElementsByClassName("gameOver")[0].classList.remove("visibility");
}
