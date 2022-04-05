
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var racket, racketimg;
var ttball, ballimg;
var ground;


function preload()
{
  racketimg = loadImage("ttleft.jpg");
  ballimg = loadImage('ball.jpg');
  
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  var ttball_options = {
    restitution: 0.8
  }

  ground = new Ground(250,height-10,width,20);
  ttball = Bodies.circle(300,650,15,ttball_options);
  World.add(world,ttball);
  
  if(undefined!== null){
  racket = createSprite(270,100);
  racket.addImage(racketimg);
  racket.velocityX = 1.5;
  racket.size = 0.5;
  }
  button = createImg('push.png');
  button.position(200,320);
  button.size(80,80);
  button.mouseClicked(start);

  ellipseMode(RADIUS);
}


function draw() 
{
  background("lightblue");
  Engine.update(engine);
  ground.show();

  push();
  imageMode(CENTER);
  if(ttball!=null){
    image(ballimg,ttball.position.x,ttball.position.y,70,70);
  }
  pop();

  if (racket.x < 230){
    racket.velocityX = -1.5;
  }
  if (racket.x > 310 ){
    racket.velocityX = 1.5;
  }

  if(collide(ground,ttball)==true)
  {
   
    World.remove(engine.world,ttball);
    ttball = null;
   
  }
 
drawSprites()
}

function start(){
  Matter.Body.applyForce(ttball,{x:0,y:0},{x:0,y:3});
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=10)
            {
              World.remove(engine.world,ttball);
               ttball = null;
               return true; 
            }
            else{
              return false;
            }
         }
}