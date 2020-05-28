var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keydown(function(event){

    if(!started){
        level++;
        $("h1").html("Level " + level);
        nextSequence();
        started = true;
    }

});

function nextSequence(){

    var randomNumber = Math.random() * 3;
    randomNumber =  Math.round(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    
}

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel] === gamePattern[gamePattern.length - 1]){
        setTimeout(() => {
            nextSequence();
        }, 1000);
        userClickedPattern = [];
        level++;
        $("h1").html("Level " + level);
    }else{

        var bgSong = "wrong"; 
        playSound(bgSong);

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").html("Game Over, you reached level " + level + " Press Any Key to Restart");

        startOver();
    }

}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

};

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}