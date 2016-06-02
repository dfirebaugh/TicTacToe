$(document).ready(function(){
  console.log("helloWorld!!!");


var player;
var computer;
var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
var board1d = []
var enCount = 0;
var winMove = [];

//start the game Splash Screen
$('a').click(function() {
  // set player to the option chosen
  player = $(this).html();
  //set computer to the oposite of the player.
  if (player == "X") {
    computer = "O"
  } else {
    computer = "X"
  }

  //transition the splash screen away
  $("#splashScreen").fadeOut(50);
  $('#board').fadeIn(3000);
  $("#splashScreen").parent().animate({
    backgroundColor: "#307C61",
  }, 1000);
  $('#board-outer').animate({
    opacity: 1
  }, 1000);
})

//player clicks
//read the board on each click
//controls the game
$('td').click(function() {
  /* console.log(board1d.indexOf(''));
  console.log(board1d); */
  if ($(this).html() == "") {
    placePlayer(this.id);
    computerTactics();
    isWin();
    //console.log(winMove);
    if (winMove[0] != null) {
      console.log("winMove? Main LOOP: " + winMove);
      enemyPlace(winMove);
    } else {
      //console.log("winMove? " + winMove);
      enemyPlace();
    }
    //computerTactics();
    isWin();
    syncBoard();
  }
})

//controls enemy placements
function enemyPlace(preferred) {

  var enPlace1 = Math.floor(Math.random() * 3);
  var enPlace2 = Math.floor(Math.random() * 3);
  //initial enemy placement
  // other enemy placements will be based on logic.
  if (preferred) {
    board[preferred[0]][preferred[1]] = computer;
    //debugger;
  } else {
    if (enCount <= 2) {
      if (board[enPlace1][enPlace2] != "") {
        enemyPlace();
      } else {
        board[enPlace1][enPlace2] = computer;
        //enCount++;
      }
    }

  }
}

//logic for the computer to make more tactical moves
function computerTactics(){
  if(board[1][1] ==""){
    winMove[0] = 1;
    winMove[1] = 1;
    console.log("Preferred MOVE: " + winMove);
  }
}

//syncs the board with the array
//print the board with contents of the array
function syncBoard() {
  var rowCount = -1;
  var count = -1;

  for (var x = 0; x < board.length; x++) {
    var colCount = -1;
    rowCount++;
    for (var i = 0; i < board[x].length; i++) {
      colCount++;
      count++;
      $('#' + count).html(board[rowCount][colCount]);
      //board1d.push(board[x][i]);
    }
  }
}
//place player into array
function placePlayer(clickPlace) {
  var rowCount = -1;
  var count = -1;

  for (var x = 0; x < board.length; x++) {
    var colCount = -1;
    rowCount++;
    for (var i = 0; i < board[x].length; i++) {
      colCount++;
      count++;

      if (clickPlace == count) {
        //place the player in the board array
        board[rowCount][colCount] = player;
      }
    }
  }
}

function gameWin() {
  for(var w=0;w<board.length;w++){
    console.log(board[w]);
  }
//  console.log(board);
  //debugger;
  winMove = [];
  
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  syncBoard();
  winMove = [];
  
  $('#splashScreen').fadeIn(2000);
  $('#board').fadeOut(50);
  $('#splashScreen').parent().animate({
    backgroundColor: "#000000",
  }, 1000);
  $('#board-outer').animate({
    opacity: 0
  }, 1000);

}


// checks to see if someone has won -- checks for potential win moves
function isWin() {
  var emptySpace = 0;
  
   for(var b=0;b<board.length;b++){
    for(var a=0;a<board.length;a++){
      if(board[a][b] === ""){
        
        emptySpace++;
      }        
    }
  }

  function hasComputer(arr, val) {
    var i, j,
        count = 0;
    for (i = 0, j = arr.length; i < j; i++) {
        (arr[i] === val) && count++;
    }
    return count;
}
    
  winMove = [];
  //diagnal arrays
    var leftDown = [board[0][0], board[1][1], board[2][2]];
    var leftUp = [board[2][0], board[1][1], board[0][2]];
    var ld = hasComputer(leftDown,computer);
    var lu = hasComputer(leftUp,computer);
    var ldp = hasComputer(leftDown,player);
    var lup = hasComputer(leftUp,player);
    //win move or preferred moves
    if (leftDown.indexOf('') >= 0 && ld > 1) {
      winMove = [];
      winMove[0] = leftDown.indexOf('');
      winMove[1] = leftDown.indexOf('');
      console.log("winMove LD: " + winMove);
    }
    if (leftUp.indexOf('') >= 0 && lu > 1) {
      winMove = [];
      winMove[0] = leftUp.length - leftUp.indexOf('') - 1;
      winMove[1] = leftUp.indexOf('');
      console.log("winMove LU: " + winMove);
    }
    if (leftUp.indexOf('') >= 0 && lup > 1 && winMove === []) {
      winMove = [];
      winMove[0] = leftUp.length - leftUp.indexOf('') - 1;
      winMove[1] = leftUp.indexOf('');
      console.log("Preferred LU: " + winMove);
    }
    if (leftDown.indexOf('') >= 0 && ldp > 1 && winMove === []) {
      winMove = [];
      winMove[0] = leftDown.indexOf('');
      winMove[1] = leftDown.indexOf('');
      console.log("winMove LD: " + winMove);
    }



  
  for (var l = 0; l < board.length; l++) {


    var tempCol = [];
    var tempRow = [];
    //creates a temporary array foreach column to check for column win
    var tempCol = [board[0][l], board[1][l], board[2][l]];
    var tempRow = [board[l][0],board[l][1],board[l][2]];
    
    var pColScore = hasComputer(tempCol,player);
    var pRowScore = hasComputer(tempRow,player);
    var cRowScore = hasComputer(tempRow,computer);  
    var cColScore = hasComputer(tempCol,computer);
    

  //does computer win?
    if (lu == 3 || ld ==3  || cRowScore ==3 || cColScore == 3) {
        $("#gameMessage").html("You lost  :( ");
      //debugger;
        gameWin();
      }
    if(pColScore == 3 || pRowScore == 3 || ldp == 3 || lup == 3){
      $("#gameMessage").html("You won!!! ");
      gameWin();
    }    //isTied?

    
    //win move or preferred moves
    if (tempCol.indexOf('') >= 0 && cColScore > 1) {
      winMove = [];
      winMove[0] = tempCol.indexOf('');
      winMove[1] = l;
      console.log("WINMOVE COL: " + winMove);
    }
    if (tempRow.indexOf('') >= 0 && cRowScore > 1) {
      winMove[0] = l;
      winMove[1] = tempRow.indexOf(""); //index of the empty spot
      console.log("WINMOVE ROW: " + winMove);
    }
    if (tempRow.indexOf('')>=0 && pRowScore > 1 && winMove === []){
      winMove[0] = l;
      winMove[1] = tempRow.indexOf(""); //index of the empty spot
      console.log("Preferred ROW: " + winMove);      
    }
    if (tempCol.indexOf('') >= 0 && pColScore > 1 && winMove === []) {
      winMove = [];
      winMove[0] = tempCol.indexOf('');
      winMove[1] = l;
      console.log("Preffered COL: " + winMove);
    }
  }
  
  if(emptySpace<1 && pColScore <3 && pRowScore<3 && ldp <3&& lup <3&&ld<3&&lu<3&&cColScore<3&&cRowScore<3 ){
      $("#gameMessage").html("Tied -- ");
      gameWin();
  }
//debugger;

  //debugger;

  
}

//steps to making the computer more challenging
//1. always take win move
//2. blocking 
//3. forking

});