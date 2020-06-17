var gamePattern = [];
var userClickedPattern = [];
var startToggle = true;
var buttonColors = ["red","blue","green","yellow"];
var level=0;
var currentLevel=0;


$(document).keydown(function(){
  console.log("keypress");
  if(startToggle==true){
    nextSequence();
    $("h1").text("Level "+ level);

    startToggle=false;
  }

});

$(".btn").click(function(event){
  currentLevel++;
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(currentLevel);



});

function checkAnswer(index){
  if(userClickedPattern[index-1] != gamePattern[index-1]){
    userClickedPattern=[];
    $("body").addClass("game-over");
    var wrongButton=new Audio("sounds/wrong.mp3");
    wrongButton.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to restart.")

    userClickedPattern=[];
    gamePattern = [];
    startToggle = true;
    level=0;
    currentLevel=0;
  }
  else{
    if(currentLevel===level){
      setTimeout(function(){
        nextSequence();
      }, 1000);
      userClickedPattern=[];
      currentLevel=0;
    }
  }

}

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  level++;
  $("h1").text("Level "+ level);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  var buttonSound = new Audio("sounds/"+randomChosenColor+".mp3");
  buttonSound.play();
}

//var randomChosenColor = buttonColors[nextSequence()];

//gamePattern.push(randomChosenColor);
//$("." + randomChosenColor).fadeOut(100).fadeIn(100);
//var buttonSound = new Audio("sounds/"+randomChosenColor+".mp3");
//buttonSound.play();


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  }, 100);
}
