//guarda las variables
var garden,rabbit,startButton,apples,restartButton;
var gardenImg,rabbitImg, appleImg, startImg,restartImg, healthBar, hearts, hearts_1, hearts_2, noHearts,leavesImg,brownLeavesImg;
var gameState,score,health,bad,good;

function preload(){
  //crea las imagees de los botones
  startImg = loadImage("start.png");
  restartImg = loadImage("restart.png");
  
  //crea las imagenes ya en la plantilla del proyecto
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  leavesImg = loadImage("leaf.png");
  brownLeaves = loadImage("orangeLeaf.png");
  
  //crea el gameState y lo pone en menu
  gameState = "menu";
 
  //crea las animaciones para la barra de salud 
  hearts = loadAnimation("hearts.png");
  hearts_1 = loadAnimation("hearts-1.png");
  hearts_2 = loadAnimation("hearts-2.png");
  noHearts = loadAnimation("noHearts.png");
  
  //crea los 2 grupos de hojass y de manzanas
  bad = new Group();
  good = new Group();
}

function setup(){
  
  createCanvas(400,400);
  
//crea el fondo
garden=createSprite(200,200);
garden.addImage(gardenImg);

//crea el conejo
rabbit = createSprite(200,340,30,30);
rabbit.scale =0.09;
rabbit.addImage(rabbitImg);
  
//crea el boton de iniciar
startButton = createSprite(200,200);
startButton.addImage(startImg);
startButton.scale=0.5;
  
//crea el boton de reiniciar
restartButton = createSprite(200,200);
restartButton.addImage(restartImg);
restartButton.scale=0.5;
  
//precarga todas las animaciones de la barra de salud
healthBar = createSprite(375,35);
healthBar.addAnimation("hearts",hearts);
healthBar.addAnimation("hearts1",hearts_1);
healthBar.addAnimation("hearts2",hearts_2);
healthBar.addAnimation("noHearts",noHearts);
healthBar.scale=1.3;

//define la salud del conejo
health = 3;
}


function draw() {
  background(0);
 
//le pone animaciones a la barra de salud conforme a la salud del conejo
if(health===3){
healthBar.changeAnimation("hearts",hearts);
}
  else if(health===2){
healthBar.changeAnimation("hearts1",hearts_1);
bad.setVelocityYEach(8);
good.setVelocityYEach(8);
}
  else if(health===1){
healthBar.changeAnimation("hearts2",hearts_2);
bad.setVelocityYEach(12);
good.setVelocityYEach(12);
}
else if(health===0){
  healthBar.changeAnimation("noHearts",noHearts);
  gameState="over";
}

//define el colisionador del conejo
  rabbit.setCollider("rectangle",0,0,900,1400)
  
//define lo que pasa en el gameState menu
  if(gameState==="menu"){
    rabbit.visible=false;
    score = 0; 
    restartButton.visible=false;
  }

//pone el gameState en play si el boton de start es presionado
if(gameState==="menu" && mousePressedOver(startButton)){
  gameState="play";
  rabbit.visible=true;
  
}

//define todo lo que pasa en el gameState play
  if(gameState==="play"){
//hace que los botones no sean visibles en gameState play
  startButton.visible=false;
  restartButton.visible=false;
  
//le da movimiento al conejo    
  rabbit.x=World.mouseX;
var select_sprites = Math.round(random(1,2)); 
    
//crea las manzanas y las hojas
    if(frameCount % 80 === 0){
if(select_sprites===1){
  createApples();
}
  else{
   createLeaves();
  }    
}

if(frameCount%120===0){
  if(select_sprites===1){
   createApples();
}
  else{
   createLeaves();   
  }
 }
    
//define lo que pasa si el conejo toca una hoja
if(bad.isTouching(rabbit)){
  bad.destroyEach();
  health=health-1;
  score=score-1;
 }

//define lo que pasa si el conejo toca una manzana
if(good.isTouching(rabbit)){
score=score+5;  
  good.destroyEach();
 }
}

//define lo que pasa si el gameState=over
  if(gameState==="over"){
    restartButton.visible=true;
    bad.destroyEach();
    good.destroyEach();
}
  
//define que psa si el boton de reiniciar es presionado
  if(gameState==="over" && mousePressedOver(restartButton)){
    health=3;
    gameState="play";
    score=0;
  }

//crea los bordes y hace que el conejo colisione con los bordes
edges= createEdgeSprites();
rabbit.collide(edges);

drawSprites();
  
 //hace que el score sea visisble 
  textSize(18);
  fill("red");
  text("score: "+score,30,30);
  
}

//define la funcionCreateApples
function createApples(){
apples = createSprite(Math.round(random(30,370)),20);
apples.addImage(appleImg);
apples.scale=0.05;
apples.lifetime=67;
apples.velocityY=6;
good.add(apples);
}

//define la funcion createLeaves
function createLeaves(){
var select_leaves=Math.round(random(1,2));
  var leaves=createSprite(Math.round(random(30,370)),20)
  if(select_leaves===1){
    leaves.addImage(leavesImg);
  }
  else{
    leaves.addImage(brownLeaves);
 }
leaves.scale=0.05;
leaves.lifetime=67;
leaves.velocityY=6;
bad.add(leaves);
}