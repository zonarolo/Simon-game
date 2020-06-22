let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gamePattern = [];
let userClickedPattern = [];
let control = false;

$(".btn").click(function (e) {
  let userChosenColour = e.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  let lastIndex = userClickedPattern.length - 1;
  checkAnswer(lastIndex);
});

$(document).keydown(function () {
  if (control == false) {
    $("#level-title").html(`Level ${level}`);
    nextSequence();
    control = true;
  }
});

function nextSequence() {
  level++;
  $("#level-title").html(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  return audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (currentLevel == gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("#level-title").text("Game Over, Press any key to restart");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  control = false;
  playSound("wrong");
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}
