
let buttonColors=["red","blue","green","yellow"];
let gamePattern=[];
let userChosenColor=[];
let level=0;
let toggle=true;

$(".btn").click(function(){
 userChosenColor.push(this.id);
 playSound(this.id);
 animatePress(this.id);
 checkAnswer(userChosenColor.length-1);
});

$(document).keypress(function(){
  if(toggle)
  {
    $("#level-title").html("level "+level);
    nextSequence();
    toggle=false;
  }
});



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userChosenColor[currentLevel])
    {
      console.log("success");

      if(userChosenColor.length===gamePattern.length)
      {
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else{
      $("h1").html("Game Over, Press Any Key to Restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
    }
}

function startOver(){
  level=0;
  gamePattern=[];
  toggle=true;
}

function nextSequence(){
  userChosenColor=[];
  level++;
  $("#level-title").html("level "+level);
  let v=Math.floor(Math.random()*4);
  let randomChosenColor=buttonColors[v];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(name){
  let a= new Audio("sounds/"+name+".mp3");
  a.play();
}

function animatePress(currentColor){
  let colorVariable=$("#"+currentColor);
  colorVariable.addClass("pressed");
  setTimeout(function() {
    colorVariable.removeClass('pressed');
  }, 100);
}
