var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClicked = [];
var started = false;
var level = 0;
var i = 0;

$("body").on("keypress", function () {
    if (started === false) {
        nextSequence();
        started = true;
    }
});
$(".btn").on("click", function (event) {
    var color = event.target.id;
    animatePress(color);
    playSound(color);
    userClicked.push(color);
    check();
});






/* ===================================function-section=================================== */
function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function nextSequence() {
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[randomNumber]);
    animatePress(buttonColors[randomNumber]);
    playSound(buttonColors[randomNumber]);
}
function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () { $("#" + color).removeClass("pressed"); }, 100);
}
function check() {
    for (i = 0; i < userClicked.length; i++) {
        if (gamePattern[i] !== userClicked[i]) {
            gameOver();

            break;
        }
    }
    if (userClicked.length === gamePattern.length && started === true) {
        setTimeout(function () {
            userClicked = [];
            nextSequence();
        }, 600);
    }
}
function gameOver() {
    playSound("wrong");
    started = false;
    userClicked = [];
    gamePattern = [];
    $("h1").text("Game Over, Press Any Key to Restart");
    $(document).addClass("game-over");
    setTimeout(function () {
        $(document).removeClass("game-over");
    }, 150);
    level = 0;
}