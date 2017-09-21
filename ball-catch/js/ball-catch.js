
var trayID;
var interval;
var ballDelay;
var nCol;
var score;
var expense;
var catches;
var clicks;
var prize;
var cost;
var time;


$(document).ready(function()
{
  $("#waterfall").fadeTo("slow", 0.33);

  $("#startbutton").click(function(){
		timer();
    startNewGame();
	});
});

/**
* Main function to start the game.
*/
function startNewGame() {
  $("#waterfall").fadeTo("slow", 1);
  $(".stats").fadeIn();
	$("#startbutton").hide();

	interval = 41; //the lower the value, the quicker ball falls.
	ballDelay = 1071; //the lower the value, the more balls.
	nCol = 4;
	score = 0;
	expense = 0;
  catches = 0;
  clicks = 0;
  prize = 10;  //this should be read from parameter table.
  cost = 10;   //this should be read from parameter table.
  time = 61;

	createballs();

  createtray();

	updateStats();

  $("#prize").html(prize);
  $("#cost").html(cost);

/*
  $(document).keydown(function(e) {
    if(e.keyCode == 37) {
      leftArrow();
    } else if(e.keyCode == 39) {
      rightArrow();
    }
  });
*/
  $("#clickleft").click(function(){
    leftArrow();
  })
  $("#clickright").click(function(){
    rightArrow();
  })

}

/**
* Created a single ball.
*/
function createball() {
		var newball = document.createElement("div");
		$(newball).attr("class", "fallingball");
    $(newball).css("position","absolute");
		var tempId = "ball" + Math.floor(Math.random()*30003);
		$(newball).attr("id", tempId);

		var leftMargin = (Math.floor(Math.random() * nCol)) / nCol;
		    leftMargin *= ($("#waterfall").width() - 60);

		$(newball).css("margin-left", leftMargin + 73 + "px" );

		$(newball).appendTo("#waterfall");

		ballFall(tempId);
}

/**
* Created a flow of balls.
*/

function createballs() {
    var control = setInterval(function(){
        if (time == 0){
          clearInterval(control);
        }
        createball();
      }, ballDelay);
}

/**
* Animates a ball falling and checks whether the ball was caught
*/
function ballFall(id) {
	var ball = $("#" + id);

  var fall = setInterval(function(){
    var topMargin = ball.css("margin-top");
        topMargin = parseInt(topMargin);
    if (topMargin < $("#waterfall").height() - ball.height()){
        topMargin += 5;
        ball.css("margin-top", topMargin + 'px' );
    }
    else {
        ball.effect('puff');
        clearInterval(fall);
    }
  }, interval)

/**
* Called when a ball was caught.
* Score goes up .
*/
  var caught = setInterval(function(){
    if (parseInt(ball.css("margin-top")) < parseInt($(".tray").css("margin-top"))
      && parseInt(ball.css("margin-top")) > parseInt($(".tray").css("margin-top")) - 40
      && parseInt(ball.css("margin-left")) == parseInt($(".tray").css("margin-left")) + 13
    ){
       score += prize;
       catches += 1;

       ball.effect('explode');
       clearInterval(fall);
       clearInterval(caught);

       updateStats();
     }
     else if (time == 0){
       clearInterval(fall);
       clearInterval(caught);
     }
  }, interval);

}


function createtray() {
  var tray = document.createElement("div");
  $(tray).attr("class", "tray");
  $(tray).css("position", "absolute");
  trayID = "tray0";
  $(tray).attr("id", trayID);

  $(tray).css("margin-left", 60 + "px" );

  var topMargin = $("#waterfall").height() - 30;
  $(tray).css("margin-top", topMargin + "px" );

  $(tray).appendTo("#waterfall");
}

function leftArrow() {
  var leftMargin = $("#" + trayID).css("margin-left");
      leftMargin = parseFloat(leftMargin);
  var step = ($("#waterfall").width() - 60) / nCol;
  if (leftMargin > step){
    leftMargin -= step;
    expense += cost;
    clicks += 1;
  }
  $("#" + trayID).css("margin-left", leftMargin + "px" );

  updateStats();
}

function rightArrow() {
  var leftMargin = $("#" + trayID).css("margin-left");
      leftMargin = parseFloat(leftMargin);
  var step = ($("#waterfall").width() - 60) / nCol;
  if (leftMargin < step * (nCol - 1) + 30 ) {
    leftMargin += step;
    expense += cost;
    clicks += 1;
  }
  $("#" + trayID).css("margin-left", leftMargin + "px" );

  updateStats();
}

/**
* Needed to update all the current stats.
*/
function updateStats(){

	$("#scorestats").html(score);
	$("#expensestats").html(expense);
  $("#catchesstats").html(catches);
  $("#clicksstats").html(clicks);

}

function timer() {
  function pad(val){
    return val> 9 ? val : "0" + val;
  }
  var x = setInterval (function(){
    $("#clock").html(Math.floor(--time / 60) + ":" + pad(time % 60));
    if (time == 0){
      clearInterval (x);
      updateStats();
    }
  },1000)



  updateStats();
}
