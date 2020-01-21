//PART 1 : BIKE MOVING
const bike = document.getElementById("bike-character");
const mainContent = document.getElementById("main-content");

const player = {
  x: 0,
  y: 0,
  direction: "right"
};

window.onkeydown = movePlayer;

function movePlayer(e) {
  if (e.keyCode == "37") {
    changeDirection("right")
  };
  if (e.keyCode == "39") {
    changeDirection("left")
  };
}

function changeDirection(direction) {
  if (direction == "right") {
    player.x += 70;
    player.direction = 180;
  } else {
    player.x -= 70;
    player.direction = 0;
  }
}

function updateCharacter(bike, player) {
  bike.style.transform = `rotateY(${player.direction}deg) translate(${
      player.direction === 0 ? -player.x : player.x
    }px,${-player.y}px)`;
}

//PART 2 : FALLING OBJECTS

const pedestrian = document.getElementById("pedestrian");
const car = document.getElementById("car");
const scooter = document.getElementById("scooter");
const start_btn = document.getElementById("play");


function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


class Obstacles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  movedownwards() {
    this.y += 3;

  }
}

class Cars extends Obstacles {
  constructor(x, y) {
    super(x, y);
    // console.log("x, y");
    // console.log(x, y);
    
    this.element = document.createElement("div");
    this.element.className = "car";
    this.element.style.transform = `translate(${this.x}px,${this.y}px)`;
    mainContent.appendChild(this.element);
    // console.log(this.element);
  }

  update() {
    this.movedownwards()
    this.element.style.transform = `translateY(${this.y}px`;
    }
  // movedownwards() {
  //   super.movedownwards();
  //   console.log("youhou je continue et modifie le comportement de la fonction héritée  !!")
  // }
}

class Pedestrians extends Obstacles {
  constructor(x, y) {
    super(x, y);

    this.element = document.createElement("div");
    this.element.className = "pedestrian";
    this.element.style.transform = `translateX(${this.x}px)`;
    this.element.style.transform = `translateY(${this.y}px)`;
    mainContent.appendChild(this.element);
    console.log(this.element);
  }

  update() {
    this.movedownwards()
    this.element.style.transform = `translateY(${this.y}px`;}
//   movedownwards() {
//     super.this.movedownwards();
//   }
// }
}

class Scooters extends Obstacles {
  constructor(x, y) {
    super(x, y);
    // console.log("x, y");
    // console.log(x, y);
    this.element = document.createElement("div");
    this.element.className = "scooter";
    this.element.style.transform = `translateX(${this.x}px)`;
    this.element.style.transform = `translateY(${this.y}px)`;
    mainContent.appendChild(this.element);
    console.log(this.element);
  }
  update() {
    this.movedownwards()
    this.element.style.transform = `translateY(${this.y}px`;
  }
  // movedownwards() {
  //   super.this.movedownwards();
  // }
}

var CarsList = [];
for (let i = 0; i < 2; i++) {
  CarsList.push(new Cars(random(0, 20), 0));
}

var PedestriansList = [];
for (let i = 0; i < 2; i++) {
  PedestriansList.push(new Pedestrians(random(20, 30), 0));
}

var ScootersList = [];
for (let i = 0; i < 2; i++) {
  ScootersList.push(new Scooters(random(30, 40), 0));
}

var fullList = [];
fullList = CarsList.concat(PedestriansList, ScootersList);
// console.log(fullList);


function getrandomcharacters() {
  var result = [];
  for ( let i = 0; i < fullList.length; i++ ) {
    result.push(fullList[Math.floor(Math.random()*fullList.length)]);
  }
  return result;
}

const draw = () => {
  updateCharacter(bike, player);

  var randomArray = getrandomcharacters()
  randomArray.forEach(char => {
    if (char.element.className == "car") {
      char.update();
    };
    if (char.element.className == "pedestrian") {
      char.update();
    };
    if (char.element.className == "scooter") {char.update();}
  })
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

// start_btn.onclick = draw;

// function start() {

// }


// function setBG(){
//   if (Math.round(Math.random())){
//     return pedestrian;
//   } else {
//     return car;
//   }
// }

//   function dropObjects(){
//     var length = random(100, ($("#main-content").width() - 100));
//     var velocity = random(850, 10000);
//     var thisObject = $("<div/>", {
//       class: "obstacle",
//       style : transform " +velocity+ "ms linear;"
//     });