
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var flag = 0;
var level = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var key = buttonColours.indexOf(userChosenColour);
    playSound(key);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(event){
    console.log(event);
    if(flag === 0 && event.keyCode==32){
        $("h1").text("Level 0");
        nextSequence();
        flag++;
    }
});

function nextSequence(){
    userClickedPattern = []
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomNumber);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("correct");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function (){nextSequence()},1000);
        }
    }
    else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        $("h1").text("Game Over, Press SPACE Key to Restart");
        startOver();
    }
}

function playSound(name){
    switch (name) {
        case 0:
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case 1:
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;    
        case 2:
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case 3:
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
    
        default:
            break;
    }
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){$("." + currentColour).removeClass("pressed");}, 100);
}

function startOver(){
    gamePattern = [];
    flag = 0;
    level = 0;
}