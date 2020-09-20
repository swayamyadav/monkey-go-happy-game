
var monkey1 , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var background1,backgroundI;
var ground1;
var bananaGroup,obstacleGroup;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_0.png");
  
  backgroundI = loadImage("395e5325b9ddcbdd28c3915bdf64b713.jpg")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
   
  

  
    fill("white");
    ground1= createSprite(300,580,1200,10);
    ground1.velocityX= -4;
    ground1.x =ground1.width/2
  
  
  background1 = createSprite(300,300,0,0);
  background1.addImage(backgroundI);
  background1.x = ground1.width/2
  
  
  monkey1 = createSprite(120,520,40,40);
  monkey1.addAnimation("running",monkey_running);
   monkey1.addAnimation("collided",monkey_collided);
  monkey1.scale = 0.3
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
  
  
  monkey1.setCollider("rectangle",0,0,monkey1.width,monkey1.height);
}


function draw() {
  background("white");

    if (ground1.x < 0){
      ground1.x = ground1.width/2;
    } 
  
   if (background1.x < 0){
      background1.x = background1.width/2;
    }  
  
  background1.velocityX = -(4 + 3* survivaltime/20)
  
   if(keyDown("space")&& monkey1.y >= 100) {
        monkey1.velocityY = -12;
        
    }
  monkey1.velocityY = monkey1.velocityY + 0.8
  monkey1.collide(ground1);
  
  if(obstacleGroup.isTouching(monkey1)) {
    bananaGroup.destroyEach();
    bananaGroup.x=1000;
    bananaGroup.setVelocityXEach(0);
   monkey1.changeAnimation("collided",monkey_collided);
    monkey1.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    background1.velocityX=0;
    survivaltime=0;
  }
  
  if(bananaGroup.isTouching(monkey1)){
    bananaGroup.destroyEach();
    
  }
  
  spawnobstacles()
  spawnfruits();
  
  drawSprites();
   stroke("black");
  textSize(20);
  fill("white");
  survivaltime = Math.ceil(frameCount/frameRate());
  text("survivaltime :"+survivaltime,250,50);
}


function spawnobstacles(){
  if(World.frameCount%300===0){
  obstacle = createSprite(650,510,0,0);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.4
  obstacle.velocityX= -(6 +survivaltime/15);
  obstacleGroup.add(obstacle);
  } 
  
} 

function spawnfruits(){
  if(World.frameCount%320===0){
  banana = createSprite(650,210,0,0);
  banana.addImage(bananaImage);
  banana.scale = 0.1
  banana.velocityX= -(3 +survivaltime/15);
  bananaGroup.add(banana);  
  }

}

