// Rover Object Goes Here

function Rover(){
  this.direction = "N";
  this.x = 0;
  this.y = 0;
  this.travelLog = [];
}
// ======================
var commandsList = "rffrfflfrff";

// ======================
function reset(rover, grid){
  rover.direction = "N";
  rover.x = 0;
  rover.y = 0;
  rover.travelLog = [];
  grid = [];
}

function createGrid(grid){
  //creamos grid
  for (var i = 0; i < 10; i++){
    grid[i] = new Array(9);
    for (var j = 0; j < 10; j++){
      grid[i][j] =" ";
    }
  } 
}

function createObstacles(grid, rover){

  var numObstacles = 15; // número de obstáculos en el grid (vamos a poner 15, por ejemplo)
  var row;
  var column;
  
  //colocamos el rover en su posición inicial
  grid[rover.y][rover.x] = rover.direction;

  //colocamos los obstáculos en el grid
  while (numObstacles > 0) {
   //calculamos aleatoriamente la posición del obstáculo
    row = Math.floor (Math.random() * 10);
    column = Math.floor(Math.random() * 10);
    if ((grid[column][row] !== "O") && ((column !== rover.x) && (row !== rover.y))){
      //entramos en el if solo si la casilla no tiene ya un obstáculo puesto y si no es la casilla inicial del rover
      grid[column][row] = "O";
      numObstacles--;
    }
  }
}

function turnLeft(rover){
  switch (rover.direction) {
    case "N": 
      rover.direction = "W";
      break;
    case "W": 
      rover.direction = "S";
      break;
    case "S": 
      rover.direction = "E";
      break;
    case "E": 
      rover.direction = "N";
      break;
  }
}

function turnRight(rover){
  switch (rover.direction) {
    case "N": 
      rover.direction = "E";
      break;
    case "W": 
      rover.direction = "N";
      break;
    case "S": 
      rover.direction = "W";
      break;
    case "E": 
      rover.direction = "S";
      break;
  }
}

function moveForward(rover, grid){
  
  switch (rover.direction) {
    
    case "N":
      if (rover.y === 0) {
        console.log("MOVEMENT NOT ALLOWED!");
      } else if (grid[rover.y-1][rover.x] ==="O") {
          console.log ("AN OBSTACLE HAS BEEN FOUND");  
      } else {
          rover.y--;  
      }
      break;

    case "W":
      if (rover.x === 0) {
        console.log("MOVEMENT NOT ALLOWED!");
      } else if (grid[rover.y][rover.x-1] ==="O") {
          console.log ("AN OBSTACLE HAS BEEN FOUND");
      } else {
          rover.x--;    
      }    
      break;
    
    case "S":
      if (rover.y === 9) {
        console.log("MOVEMENT NOT ALLOWED!");
      } else if (grid[rover.y+1][rover.x] ==="O") {
          console.log ("AN OBSTACLE HAS BEEN FOUND");
      } else {
          rover.y++;
      }
      break;
    
    case "E":
      if (rover.x === 9) {
        console.log("MOVEMENT NOT ALLOWED!");
      } else if (grid[rover.y][rover.x+1] ==="O") {
          console.log ("AN OBSTACLE HAS BEEN FOUND");
      } else {
          rover.x++;
      }
      break;
  }
}

function moveBackward(rover, grid){
  
  switch (rover.direction) {
    
    case "N":
      if (rover.y === 9) {
        console.log("MOVEMENT NOT ALLOWED!");
      } else if (grid[rover.y+1][rover.x] ==="O") {
          console.log ("AN OBSTACLE HAS BEEN FOUND");
      } else {
          rover.y++;
      }
      break;

    case "W":
      if (rover.x === 9) {
        console.log("MOVEMENT NOT ALLOWED!");
      } else if (grid[rover.y][rover.x+1] ==="O") {
          console.log ("AN OBSTACLE HAS BEEN FOUND");
      }
        else {
          rover.x++;
      }
      break;
    
    case "S":
      if (rover.y === 0) {
        console.log("MOVEMENT NOT ALLOWED!");
      } else if (grid[rover.y-1][rover.x] ==="O") {
          console.log ("AN OBSTACLE HAS BEEN FOUND");
      } else { 
          rover.y--;
      }
      break;
    
    case "E":
      if (rover.x === 0) {
        console.log("MOVEMENT NOT ALLOWED!");
      } else if (grid[rover.y][rover.x-1] ==="O") {
          console.log ("AN OBSTACLE HAS BEEN FOUND");        
      } else {
          rover.x--;
      }
      break;
  }
}

function commands(commandsList){

  var rover = new Rover();
  var grid = [];
  var commandsRegex = /[fbrl]+/i;
  var stringPosition = ""; //variable donde iremos almacenando el tracking del rover
  
  reset(rover, grid); //reseteamos el estado de las variables (rover y grid)
  createGrid(grid); //creamos la rejilla
  createObstacles(grid, rover); //colocamos obstáculos en la rejilla
  console.log(grid.join("\n")); //pintamos situación de partida
  if ((commandsList.match(commandsRegex) === null) || (commandsList !== commandsList.match(commandsRegex)[0])) {
    console.log("THIS IS NOT A CORRECT LIST OF COMMANDS: inputs must be 'f', 'b', 'r', or 'l'");
  } else {    
    for (var i = 0; i < commandsList.length; i++) {
      grid[rover.y][rover.x] = " "; //borramos el rover de la rejilla antes de la nueva acción
      switch (commandsList[i]) {
        case "f":
          console.log("moveForward was called");
          moveForward(rover, grid);
          break;
        case "b":
          console.log("moveBackward was called");
          moveBackward(rover, grid);
          break;
        case "r":
          console.log("turnRight was called!");
          turnRight(rover);
          break;
        case "l":
          console.log("turnLeft was called!");
          turnLeft(rover);
          break;
      }
      console.log("Current position and direction: (" + rover.x + ", " + rover.y + ", " + rover.direction +")");
      stringPosition = "\n\tCommand " + commandsList[i] + ": (" + rover.x + ", " + rover.y + ", " + rover.direction +")"; 
      rover.travelLog.push(stringPosition);
      grid[rover.y][rover.x] = rover.direction; //colocamos nuevamente el rover en la rejilla
      console.log(grid.join("\n")); //pintamos la rejilla tras cada comando ejecutado
    }
    console.log("TRACKING:" + rover.travelLog); //una vez terminados los movimientos, mostramos el tracking del rover
  } 
}
