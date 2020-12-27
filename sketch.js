const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var ground;
var particles = [];
var plinkos = [];
var divisions = [];
var divisionheight = 300
var score = 0;
var particle;
var turn = 0;
var gameState = "start";

function setup() {
  createCanvas(480,800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(0,800,960,10)

  for (var j = 40; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,75,10,10));
  }

  for (var j = 15; j <= width-10; j = j + 50){
    plinkos.push(new Plinko(j,175,10,10));
  }

  for (var j = 40; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,275,10,10));
  }

  for (var j = 15; j <= width-10; j = j + 50){
    plinkos.push(new Plinko(j,375,10,10));
  }

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionheight/2, 10 , divisionheight));
  }
  
  Engine.run(engine);
}

function draw() {
  background(0);
  Engine.update(engine)

  noStroke();
  textSize(30);
  fill("white");
  text("Score - " + score, 340, 40);

  for (var i = 0; i < plinkos.length; i++){
    plinkos[i].display();
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].display();
     
    if (particles[i].body.position.x < 300 && particles[i].body.position.y>760) {
     score=score+500;
     particles.pop();
    }

    else if (particles[i].body.position.x < 600 && particles[i].body.position.x > 301 && particles[i].body.position.y > 760) {
     score = score + 100;
     particles.pop();
   }

    else if (particles[i].body.position.x < 900 && particles[i].body.position.x > 601 && particles[i].body.position.y > 760) {
     score = score + 200;
     particles.pop();
   }
  }

  for (var j = 0; j < particles.length; j++){
    particles[j].display();
  }

  for (var k = 0; k < divisions.length; k++){
    divisions[k].display();
    
  }

  ground.display()
  drawSprites();
}

function mousePressed()
{
  if(gameState == "start"){
    turn ++
    particle.push(new Particle(mouseX, 10, 10, 10))
  }
}