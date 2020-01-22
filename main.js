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

const pedestrian = document.querySelectorAll(".pedestrian");
const car = document.querySelectorAll(".car");
const scooter = document.querySelectorAll(".scooter");
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
    if (this.y < 700 ) {this.movedownwards();
    this.element.style.transform = `translateY(${this.y}px`;
    }
    else  {
      this.element.classList = "obstacle";
    } 
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
    // console.log(this.element);
  }

  update() {
    if (this.y < 650 ) {this.movedownwards();
      this.element.style.transform = `translateY(${this.y}px`;
      }
      else  {
        this.element.classList = "obstacle";
      } 
}
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
    // console.log(this.element);
  }
  update() {
    if (this.y < 650 ) {this.movedownwards();
      this.element.style.transform = `translateY(${this.y}px`;
      }
      else  {
        this.element.classList = "obstacle";
      } 
}
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

// PART 3 COLLISION

var bikeSize = {
  width: 181,
  height: 154,
};

const scooterSize = {
  width: 68,
  height: 95
};

const pedestrianSize = {
  width: 41,
  height: 95
};

const carSize = {
  width: 79,
  height: 37
};

function collisionDetection() {
  const rect1 = bike.getBoundingClientRect();
  
  for (let i = 0; i < fullList.length; i++) {
    // const currentObstacleMetrics = fullList[i].element.getBoundingClientRect();
    const rect2 = fullList[i].element.getBoundingClientRect();
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y) {
      console.log("youpi")
      alert("YOU GOT HIT BY TRAFFIC!! TRY AGAIN");
      document.location.reload();
      clearInterval(interval);
   }
  }
}


// PART 4 LAUNCH OF GAME

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
  collisionDetection();
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