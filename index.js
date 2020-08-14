var a = document.querySelector(".box");
var head = document.getElementsByClassName("heading")[0];
var bombs = [];
var valid = [];
var totalBomb = 0;
var width = 10;
var flag = 0;
bombs.length = 20;
valid.length = 80;
bombs.fill("bomb");
valid.fill("valid");
var gameArray = bombs.concat(valid);
shuffle(gameArray);
for (var i = 0; i < 100; i++) {
  var square = document.createElement("div");
  square.classList.add("square");
  square.classList.add(gameArray[i]);
  square.setAttribute("id", i);
  square.setAttribute("value", gameArray[i]);
  a.appendChild(square);
  square.addEventListener("click", function () {
    var j = Number(this.getAttribute("id"));
    getBombs(j);
  });
  //ctrl and left click
  square.oncontextmenu = function (e) {
    e.preventDefault();
    addFlag(e.target.id);
  };
}
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getBombs(a) {
  if (document.getElementById("" + a).classList.contains("checked")) return;

  if (gameArray[a] == "bomb") {
    document.getElementById("" + a).innerText = "💣";
    document.getElementById("" + a).classList.add("bombon");
    head.innerText = "You Lose";
    setTimeout(function () {
      location.reload();
    }, 2000);
  } else {
    document.getElementById("" + a).classList.add("checked");
    var left = a % 10 == 0;
    var right = a % 10 == 9;
    if (!left && a > 9 && gameArray[a - 10 - 1] == "bomb") totalBomb++;
    if (a > 9 && gameArray[a - 10] == "bomb") totalBomb++;
    if (a > 9 && !right && gameArray[a - 10 + 1] == "bomb") totalBomb++;
    if (!left && gameArray[a - 1] == "bomb") totalBomb++;
    if (!right && gameArray[a + 1] == "bomb") totalBomb++;
    if (!left && a < 90 && gameArray[a + 10 - 1] == "bomb") totalBomb++;
    if (!right && a < 90 && gameArray[a + 10 + 1] == "bomb") totalBomb++;
    if (a < 90 && gameArray[a + 10] == "bomb") totalBomb++;
    if (totalBomb === 0) {
      document.getElementById(a).classList.add("safe");
      checkNeighbour(a);
    } else {
      document.getElementById(a).innerHTML = totalBomb;
      totalBomb = 0;
    }
  }
}
function checkNeighbour(a) {
  var left = a % 10 == 0;
  var right = a % 10 == 9;
  if (!left && a > 9) {
    getBombs(a - 10 - 1);
  }
  if (a > 9) {
    getBombs(a - 10);
  }
  if (a > 9 && !right) {
    getBombs(a - 10 + 1);
  }
  if (!right) {
    getBombs(a + 1);
  }
  if (!right && a < 90) {
    getBombs(a + 10 + 1);
  }
  if (!left) {
    getBombs(a - 1);
  }
  if (!left && a < 90) {
    getBombs(a + 10 - 1);
  }
  if (a < 90) {
    getBombs(a + 10);
  }
}
function addFlag(a) {
  var y = 0;
    if (document.getElementById("" + a).innerText === "🚩") {
      document.getElementById("" + a).innerText = "";
      flag--;
    } else {
      if (flag < 20) {
      document.getElementById("" + a).innerText = "🚩";
      flag++;
    }
    if (flag === 20) {
      for (let i = 0; i < 20; i++) {
        if (document.querySelectorAll(".bomb")[i].innerText == "🚩") y++;
      }
      if (y === 20) {
        head.innerText = "You Won";
        setTimeout(function () {
          location.reload();
        }, 2000);
      }
    }
  }
}
