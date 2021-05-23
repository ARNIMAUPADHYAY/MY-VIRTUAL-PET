var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(680,95);
  feedTheDog.mousePressed(feedDog);

  lastFeed= hour();
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  if (lastFeed>=12){
    fill("black");
    text("Last Feed:"+ lastFeed +"PM" ,350,30);
  }
  //write code to display text lastFed time here
  else if(lastFeed==0){
    fill("black");
    text("Last Feed: 12 AM",350,30);
  }
  else{
    fill("black");
    text("Last Feed:"+ lastFeed+"AM" ,350,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

 var food_stock_val= foodObj.getFoodStock();
 if(food_stock_val<=0){
   foodObj.updateFoodStock(food_stock_val*0);
 }
 else{
   foodObj.updateFoodStock(food_stock_val-1);
 }

  //write code here to update food stock and last fed time
 database.ref('/').update({
    Food:foodObj.getFoodStock(), FeedTime:hour() 
  })

}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
