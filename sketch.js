var monkey, monkey_running;
var bg, bgImg;
var bananaImg, bananaGroup;
var obImg, obstacleGroup;
var score = 0;
var inGround;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",
                                 "Monkey_04.png","Monkey_05.png","Monkey_06.png",
                                 "Monkey_07.png","Monkey_08.png","Monkey_09.png",
                                 "Monkey_10.png");
  bgImg = loadImage("jungle.jpg");
  obImg = loadImage("stone.png");
  bananaImg = loadImage("banana.png");
}


function setup() {
  createCanvas(600, 600);
  
  bg = createSprite(300,300,600,600);
  bg.addImage("backGround", bgImg);
  bg.scale=1.2;
  
  inGround = createSprite(600,580,1200,30);
  inGround.visible = false;
  
  monkey = createSprite(80,510,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
  bg.velocityX=-8;
  if (bg.x < 0){
     bg.x = bg.width/2;
  } 
  
  
  if(keyDown("space")&& monkey.y >= 430){
     monkey.velocityY = -12 ;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(inGround);
  
  if (bananaGroup.isTouching(monkey)) {
     bananaGroup.destroyEach();
     score=score+2;
    }
  if (obstacleGroup.isTouching(monkey)) {
     monkey.scale=0.15;
  }
   
  switch(score){
    case 10: monkey.scale=0.17;
             break;
    case 20: monkey.scale=0.19;
             break;
    case 30: monkey.scale=0.21;
             break;
    case 40: monkey.scale=0.23;
             break;
    default: break;       
  }
    
  spawnBananas();
  spawnObstacles();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
}

function spawnBananas() {
  if(World.frameCount % 80 === 0) {
    var banana = createSprite(400,random(310,360),10,40);
    banana.velocityX = -7;
    banana.addImage("food", bananaImg);

    
    banana.scale = 0.05;
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
  } 
}

function spawnObstacles() {
  if (World.frameCount % 300 === 0) {
    var stone = createSprite(600,535,60,30);
    stone.addImage("stone", obImg);
    stone.scale = 0.2;
    stone.velocityX = -8;
    
    stone.lifetime = 200;
    obstacleGroup.add(stone);
    
  }
}