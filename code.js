playSound("assets/melodyloops-preview-happy-place-1m30s.mp3", false);

setTimeout(function() {
  setScreen("screen2");
}, 2000);
var score = 0;
var misses = 0;
var i = 0;
var seconds = 0;
var seconds2 = 0;
var totalTime = 0;
var timeInterval = 0;
var x = 0;
var y = 0;
var r = 0;
hideElement("easy");
hideElement("normal");
hideElement("difficult");
hideElement("playButton");

onEvent("easyButton", "click", function(event) {
  console.log("easyButton clicked!");
  totalTime = 25; 
  timeInterval = 1000;
  setScreen("mainScreen");
  showElement("easy");
  playGame();
  timer();
});

onEvent("normalButton", "click", function(event) {
  console.log("normalButton clicked!");
  totalTime = 20;
  timeInterval = 800;
  setScreen("mainScreen");
  showElement("normal");
  playGame();
  timer();
});

onEvent("difficultButton", "click", function(event) {
  console.log("difficultButton clicked!");
  totalTime = 15;
  timeInterval = 500;
  setScreen("mainScreen");
  showElement("difficult");
  playGame();
  timer();
  
});

function molePosition() {
  x = randomNumber(0, 2);
  y = randomNumber(0, 2);
  
  setPosition("mole1", 33 + (97 * x), 95 + (70 * y));
}

function playGame() {
 r = setInterval(molePosition, timeInterval);
}

function timer() {
  timedLoop(1000, function() {
  seconds = seconds + 1;   
  seconds2 = totalTime - seconds; 
  console.log(seconds2 + " seconds have elapsed");
  setText("label5", seconds2 + " secs");
  if(seconds2 === 0) {
    setScreen("endScreen");
    setText("finalScore", score);
    stopTimedLoop();
  }
});
}

onEvent("mole1", "click", function(event) {
  console.log("mole1 clicked!");
  playSound("assets/default.mp3", false);
  score = score + 100; 
  setText("scoreLabel", score);
});

onEvent("holes", "click", function(event) {
  console.log("image1 clicked!");
  misses = misses + 1;
  playSound("assets/category_alerts/playful_game_error_sound_4.mp3", false);
  score = score - 50;
  setText("scoreLabel", score);
  if(misses === 3 && seconds2 > 0) {
    misses = 0;
    i = i + 1;
    setText("lifeLabel", 3 - i);
  }
  if(getText("lifeLabel") === "0") {
    setScreen("endScreen");
    setText("finalScore", score);
    stopTimedLoop();
    stopSound("assets/melodyloops-preview-happy-place-1m30s.mp3");
  }
});

onEvent("playAgain", "click", function(event) {
  console.log("playAgain clicked!");
  setScreen("screen2");
  score = 0;
  clearInterval(r);
  misses = 0;
  totalTime = 0;
  seconds = 0;
  seconds2 = 0;
  timeInterval = 0;
  x = 0;
  y = 0;
  setText("lifeLabel", 3);
  i = 0;
  setText("scoreLabel", 0);
  setText("lifeLabel", 3);
  setText("finalScore", 0);
});

onEvent("pausButton", "click", function(event) {
  console.log("pausButton clicked!");
  showElement("playButton");
  hideElement("pausButton");
});


onEvent("playButton", "click", function(event) {
  console.log("playButton clicked!");
  hideElement("playButton");
  showElement("pausButton");
});
