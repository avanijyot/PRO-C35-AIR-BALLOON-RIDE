//to  create the sprite objects
var balloon;
var balloonImage1, balloonImage2;
var database;
var position;

//to preload the images and animations
function preload(){

   bg = loadImage("cityImage.png");

   balloonImage1 = loadAnimation("hotairballoon1.png");

   balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");

  }

//Function to set initial environment
function setup() {

  //to link the programme with database
  database = firebase.database();

  //to create the canvas
  createCanvas(1500,700);

  //to create the balloon
  balloon = createSprite(250,600,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale = 0.7;

  //to fetch the balloonPosition from the database
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readHeight, showError);

}

// function to display UI
function draw() {

  //to give the background
  background(bg);

  //to move the balloon using key events
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10, 0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10, 0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0, -10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0 ,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale + 0.01;
  }

  //to draw the sprites
  drawSprites();

  //to display the text
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}

//function to update the height
function updateHeight(x, y){

  database.ref('balloon/height').set({'x' : height.x + x, 'y' : height.y + y});

}

//function to read the height
function readHeight(data){

  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;

}

//function to show error
function showError(){

  console.log("Error in writing to the database");

}