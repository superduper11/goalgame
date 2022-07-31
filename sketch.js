//const { Matter } = require("./matter");

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var ground;
var ballImg,runImg
var n
var player1
var player2
var distance;
var invisGround,invisGroundL,invisGroundR;
var goal1,goal2
var gameMode = 0
//gameMode 1 = red win
//gameMode 2 = blue win
//var fruit;

var b = 60;

function preload()
{
  ballImg = loadImage("soccer.png")
}



function setup() {
  createCanvas(windowWidth,windowHeight);


  engine = Engine.create();
  world = engine.world;

  //fruit.addAnimation("idle",idleImg)
  //bottom
  ground = new Ground(windowWidth/2,windowHeight-230,windowWidth+20,20);
  //top
  ground2 = new Ground(windowWidth/2,8,windowWidth+20,20);
  //left
  ground3 = new Ground(windowWidth-windowWidth+8,200,20,1000);
  //right
  ground4 = new Ground(windowWidth-8,200,20,1000);
  fruit = new Player(windowWidth/2,100, b,b);

  goal1 = new Goal(29,380,20,windowHeight/5)
  goal2 = new Goal(windowWidth-29,380,20,windowHeight/5)

  player1 = createSprite(windowWidth/4,400,50,50)
  player1.shapeColor=color("blue")
  player2 = createSprite(windowWidth/4*3,400,50,50)
  player2.shapeColor=color("red")
  invisGround = createSprite(windowWidth/2,windowHeight-230,windowWidth+20,20)
  invisGroundL = createSprite(windowWidth-windowWidth+8,200,20,1000)
  invisGroundR = createSprite(windowWidth-8,200,20,1000)
  ellipseMode(RADIUS);
}




function draw() 
{

  background("black");
  Engine.update(engine);

  push();
  imageMode(CENTER);
  /*if(fruit!=null){
    image(ballImg,fruit.position.x,fruit.position.y,70,70);
  }
  pop();*/

  //keyTyped()

  if(fruit.x>windowWidth||fruit.x<0)
  {
    location.reload()
  }

  player1.collide(invisGround)
  player2.collide(invisGround)
  player1.collide(invisGroundL)
  player2.collide(invisGroundL)
  player1.collide(invisGroundR)
  player2.collide(invisGroundR)

  controls()
  distance = dist(player1.x, player1.y, fruit.body.position.x, fruit.body.position.y);

  if(distance <= 53)
  {
    Body.applyForce(fruit.body, {x:0, y:0}, {x:0.03, y:0});
  }
  distance2 = dist(player2.x, player2.y, fruit.body.position.x, fruit.body.position.y);

  if(distance2 <= 53)
  {
    Body.applyForce(fruit.body, {x:0, y:0}, {x:-0.03, y:0});
  }

  distgoal1 = dist(goal1.body.position.x, goal1.body.position.y, fruit.body.position.x, fruit.body.position.y);

  if(distgoal1 <= 53)
  {
    gameMode = 1 //red win
  }
  distgoal2 = dist(goal2.body.position.x, goal2.body.position.y, fruit.body.position.x, fruit.body.position.y);

  if(distgoal2 <= 53)
  {
    gameMode = 2 //blue win
  }

  if(gameMode === 1)
  {
    redWon()
  }

  if(gameMode === 2)
  {
    blueWon()
  }

  ground.show()
  ground2.show()
  ground3.show()
  ground4.show()
  goal1.show()
  goal2.show()
  fruit.show()

  drawSprites();
}


function controls()
{
  if(keyIsDown(65))
  {
    player1.x-=7.5
  }
  if(keyIsDown(68))
  {
    player1.x+=7.5
  }
  if(keyIsDown(37))
  {
    player2.x-=7.5
  }
  if(keyIsDown(39))
  {
    player2.x+=7.5
  }
  if(keyIsDown(87)&&player1.y>=422) {
    player1.velocityY = -12.5;
  }
  if(keyIsDown(38)&&player2.y>=422)
  {
    player2.velocityY= -12.5
  }

  player1.velocityY = player1.velocityY + 0.8
  player2.velocityY = player2.velocityY + 0.8
}

function redWon()
{
  swal(
    {
      title: `Red Won!`,
      text: "Thanks for playing!!",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function blueWon()
{
  swal(
    {
      title: `Blue Won!`,
      text: "Thanks for playing!!",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

