//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit,fruit2,monster,fruitGroup,monsterGroup,monster1Group, score,r,randomFruit, position;
var knifeImage,fruit1,fruit2 ,fruit3,fruit4,fruit5,fruit6,fruit7,fruit8 ,fruit9,monsterImage,monsterImage1,monsterImage2,gameOverImage3;
var Knsound;
var Esound;
var S,S1,S2,S3;
var s,s1,s2,s3;
var reset,restart;
var scoresound,sd1,sd2,sd3,sd4;
var changeS;
var pass,fail;   
var wall,wall1;
var ran;
var colors=["purple","skyblue","pink","lightgreen","yellow","orange","purple","skyblue","pink","lightgreen","yellow","orange"]
var x;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  monsterImage1 = loadAnimation("download.png")
  monsterImage2 = loadAnimation("images.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  fruit5 = loadImage("Mango.png");
  fruit6 = loadImage("Mango2.png");
  fruit7 = loadImage("pineapple.png");
  fruit8 = loadImage("Banana.png");
  fruit9 = loadImage("melon.png");
  gameOverImage = loadImage("gameover.png")
  S=loadImage("good1.png");
  S1=loadImage("good2.png");
  S2=loadImage("good3.png");
  S3=loadImage("good5.png");
  reset=loadImage("reset.png");

  //load sound here
  Knsound=loadSound("knifeSwoosh.mp3");
  Esound=loadSound("blast.mp3");
  scoresound=loadSound("new.mp3");
  sd1=loadSound("touch.mp3");
  sd2=loadSound("zapsplat.mp3");
  sd3=loadSound("checkPoint.mp3");
 
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  monster1Group=createGroup();
  
  restart=createSprite(300,500,20,20);
  restart.addImage("R2",reset);
  restart.visible=false;
  restart.tint=rgb(150,100,50);
  
  wall1=createSprite(600,10,5,1200);
  wall1.visible=false;
  
  wall=createSprite(0,10,5,1200);
 wall.visible=false;
  
  fail = 0;
  pass = 0;
  
  x=Math.round(random(0,4))
  y=Math.round(random(1,4))
  
}

function draw() {
  
  background(colors[x]);
  
  if(gameState===PLAY){
    restart.visible=false;
    if(keyDown("x")){
    console.log(y);
    x=Math.round(random(5,11))
    background(colors[x]);  
                    }
    
    //Call fruits and Monster function
    fruits();
    Monster();
    monster10();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
   // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      ran=random(0,255);
      Knsound.play();
      score=score+2;
      pass=pass+1;
      scoring();
      changeS=0;
      keyDown(x);
                                    }
        
  
    
     if(fruitGroup.isTouching(wall)||fruitGroup.isTouching(wall1)){
      fruitGroup.destroyEach();
      fail=fail+1
      score=score-2;
                                                                  }
    
                   }
  
  
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        Esound.play();
        restart.visible=true;
        
       
        //add gameover sound here
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        monster1Group.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
                                         }
  
   if(monster1Group.isTouching(knife)){
        gameState=END;
        Esound.play();
        restart.visible=true;
      
        //add gameover sound here
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        monster1Group.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        monster1Group.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
                                        }         
    
 if(score%10===0&&score>0&&gameState===PLAY){
    
    a=Math.round(random(1,4))

    switch(a){
        
      case 1:
      background("blue");
      break;
      case 2:
      background("lightgreen");
      break;
      case 3:
      background("pink");
      break;
      case 4:
      background("yellow");
      break;
      default: break
  
            }
                                             }
         

   if(mousePressedOver(restart)&&gameState===END){        
          restarting();
                                                 }
   
   
   
   songs();
  drawSprites();
  //Display score
  textSize(25);
  stroke("Black");
  strokeWeight(5);
  fill("Red")
  textFont("Cooper Std Black");
  text("Score  :  "+ score,230,50);
  textSize(20);
  textFont("Algerian");
  fill("Red");
  text("Fail : "+ fail, 10,20);
  fill("Green");
  text("Pass : "+ pass, 490,20)
  textSize(17);
  textFont("Cooper Std Black");
  fill("white");
  text("Press ' X ' to change background ",140,20);

}

function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(100,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = 8;
    monster.setLifetime=50;
    monster.velocityX=(10+(score/10));
    monsterGroup.add(monster);
                              }
                  }
  
function monster10(){
  if(World.frameCount%150===0){
    monster1=createSprite(400,200,20,20);
    monster1.addAnimation("moving",monsterImage1);
    monster1.y=Math.round(random(100,550));
    monster1.scale=0.2;
    //update below give line of code for increase monsterGroup speed by 10
    monster1.velocityX = -8;
    monster1.setLifetime=50;
    monster1.velocityX=-(10+(score/10));
    monster1Group.add(monster1);
                              }

                    }
  
function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(fruit.x)
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=500;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-7
    
    }
    else
    {
      if(position==2){
      fruit.x=100;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= 7;
      }
    }
    
    fruit.scale=0.2;
     r=Math.round(random(1,3));
    if (r == 1) {
     // background("red");
      fruit.addImage(fruit1);
    } else if (r == 2) {
      //background("blue");
      fruit.addImage(fruit2);
    } else if (r == 3) {
      //background("pink");
      fruit.addImage(fruit3);
    } else if (r == 4){
      fruit.addImage(fruit4);
    } else if(r == 5){
      fruit.addImage(fruit5);
    } else if(r == 6){
      fruit.addImage(fruit6);
    } else if(r == 7){
      fruit.addImage(fruit7);
    } else if(r == 8){
      fruit.addImage(fruit8);
    } else if(r == 9){
      fruit.addImage(fruit9);
    }
    
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
                                }
                }             
  
function restarting(){
  
                  console.log(x);
                  gameState=PLAY;
                  score=0;
                  fail=0;
                  pass=0;
                  knife.destroy();
                  knife=createSprite(40,200,20,20);
                  knife.addImage(knifeImage);
                  knife.scale=0.7
                   x=Math.round(random(5,11))
                  //x=x-1;
                  background(colors[x]);
} 

function scoring(){
  
                    if(score%4===0 && score>0){
                    c=Math.round(random(1,4))

                     if ((c===1)){
                       s=createSprite(300,300,20,20);
                       s.addImage("S",S);
                       s.velocityY=-10;

                      }

                      else if((c===2)) {
                        s1=createSprite(300,300,20,20);
                        s1.addImage("S",S1);
                        s1.velocityY=10;

                      }

                      else if((c===3)) {
                        s2=createSprite(300,300,20,20);
                        s2.addImage("S",S2);
                        s2.velocityX=10;


                      }


                      else if((c===4)){
                       s3=createSprite(300,300,20,20);
                       s3.addImage("S",S3);
                       s3.velocityX=-10;

                      }
                   }
}
  
function songs(){
  
 if(score%4===0 && score>0){

                   var S=Math.round(random(1,4));{

                     if(changeS===0){
                      if(S===1){
                        scoresound.play();
                        changeS=1;
                      } 
                       else if(S===2){
                        sd1.play();
                        changeS=1;
                       }
                       else if(S===3){
                        sd2.play();
                        changeS=1;
                       }
                       else if(S===4){
                        sd3.play();
                        changeS=1;
                         
 }
 } 
 }
 }
 }
