$(document).ready(function(){

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
  syncBoard();
  if ($(this).html() == "") {
    placePlayer(this.id);
    syncBoard();
    isWin();
    computerTactics();

    if (winMove[0] != null) {
      console.log("preferred Move? Main LOOP: " + winMove);
      enemyPlace(winMove);
    } 
    else {
      enemyPlace(winMove);
    }
    isWin();
    
    setTimeout(function(){syncBoard();},500);
  }
})

//controls enemy placements
function enemyPlace(preferred) {

  var enPlace1 = Math.floor(Math.random() * 3);
  var enPlace2 = Math.floor(Math.random() * 3);
  //initial enemy placement
  // other enemy placements will be based on logic.
  if(isFull()){

  }
  else{
    if (enCount <= 2) {
      //checking that winMove has a value
      if (preferred != undefined && preferred.length > 0) {
        //if the preferred placement is not blank clear the preferred movement and choose a random spot
        if (board[preferred[0]][preferred[1]] != "") {
          winMove = [];
          enemyPlace();
        }
      else{
        board[preferred[0]][preferred[1]] = computer;
      }
    }
    else{
    //if the random placement does not choose a blank spot choose another placement.
    if (board[enPlace1][enPlace2] != "") {
        enemyPlace();
      } 
      else {
        board[enPlace1][enPlace2] = computer;
        //enCount++;
      }
      }
    }
  }
}

function isFull(){
  var count =0;
  for(var x = 0; x<board.length;x++){
    if(hasItem(board[x],"")){
      count++;
    }
  }
  if(count === 0){
    return true;
  }
  else{
    return false;
  }
}

//logic for the computer to make more tactical moves
function computerTactics(){
  if(board[1][1] ==""){
    winMove[0] = 1;
    winMove[1] = 1;
    console.log("Preferred MOVE: " + winMove);
  }

  var leftDown = [board[0][0], board[1][1], board[2][2]];
  var leftUp = [board[2][0], board[1][1], board[0][2]];
  var isWinMove = false;



  for(var l = 0; l<board.length; l++){
    var tempCol = [board[0][l], board[1][l], board[2][l]];
    var tempRow = [board[l][0],board[l][1],board[l][2]];


        //win move or preferred moves -- rows and columns
    if (tempCol.indexOf('') >= 0 && hasItem(tempCol,computer) === 2) {
      winMove = [];
      isWinMove = true;
      winMove[0] = tempCol.indexOf('');
      winMove[1] = l;
      console.log("WINMOVE COL: " + winMove);
    }
    if (tempRow.indexOf('') >= 0 &&hasItem(tempRow,computer) === 2) {
      isWinMove = true;
      winMove[0] = l;
      winMove[1] = tempRow.indexOf(""); //index of the empty spot
      console.log("WINMOVE ROW: " + winMove);
    }

    if(!isWinMove){
    if (tempRow.indexOf('')>=0 && hasItem(tempRow,player) === 2){
      winMove[0] = l;
      winMove[1] = tempRow.indexOf(""); //index of the empty spot
      console.log("Preferred ROW: " + winMove);      
    }
    if (tempCol.indexOf('') >= 0 && hasItem(tempCol,player) === 2) {
      winMove = [];
      winMove[0] = tempCol.indexOf('');
      winMove[1] = l;
      console.log("Preferred COL: " + winMove);
    }

    }
  }

  if (leftDown.indexOf('') >= 0 && hasItem(leftDown,computer) === 2) {
    isWinMove = true;
      winMove = [];
      winMove[0] = leftDown.indexOf('');
      winMove[1] = leftDown.indexOf('');
      console.log("winMove LD: " + winMove);
    }
    if (leftUp.indexOf('') >= 0 && hasItem(leftUp,computer) === 2) {
      isWinMove = true;
      winMove = [];
      winMove[0] = leftUp.length - leftUp.indexOf('') - 1;
      winMove[1] = leftUp.indexOf('');
      console.log("winMove LU: " + winMove);
    }

    if(!isWinMove){
      if (leftUp.indexOf('') >= 0 && hasItem(leftUp,player) === 2) {
        winMove = [];
        winMove[0] = leftUp.length - leftUp.indexOf('') - 1;
        winMove[1] = leftUp.indexOf('');
        console.log("Preferred LU: " + winMove);
      }
      if (leftDown.indexOf('') >= 0 && hasItem(leftDown,player) === 2) {
        winMove = [];
        winMove[0] = leftDown.indexOf('');
        winMove[1] = leftDown.indexOf('');
        console.log("Preferred LD: " + winMove);
      }      
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

function hasItem(arr,val){
  var i,count=0;
  for(i = 0; i < arr.length;i++){
    if(arr[i] === val){
      count++;
    }
  }
  return count;
}

function isWin() {


  var leftDown = [board[0][0], board[1][1], board[2][2]];
  var leftUp = [board[2][0], board[1][1], board[0][2]];

  var ldScore = hasItem(leftDown,player) - hasItem(leftDown, computer);
  var luScore = hasItem(leftUp,player) - hasItem(leftUp, computer);
  var blankScore = 0;
  var cMatch = false;
  var pMatch = false;

  for (var l = 0; l < board.length; l++) {
    var tempCol = [board[0][l], board[1][l], board[2][l]];
    var tempRow = [board[l][0],board[l][1],board[l][2]];
    var vertScore = hasItem(tempCol,player) - hasItem(tempCol, computer);
    var horScore = hasItem(tempRow,player) - hasItem(tempRow, computer);

    if(vertScore == 3 || horScore == 3){
      pMatch = true;
    }
    if(horScore == -3 || vertScore == -3){
      cMatch = true;
    }

    blankScore += hasItem(tempRow,"");
  }

  //do you win?
  if(pMatch || ldScore == 3 || luScore == 3){
    
    $("#gameMessage").html("You won!!! ");
    setTimeout(function(){gameWin();},400);
  }
  //does computer win?
  else if(cMatch || ldScore == -3 || luScore == -3){
    $("#gameMessage").html("You lost  :( ");
    setTimeout(function(){gameWin();},400);
  }
  //isTied?
  if(!cMatch && !pMatch && blankScore == 0){
    if(ldScore == -1 && luScore == -1 || ldScore == -1 && luScore == 1 || ldScore == 1 && luScore == 1 || ldScore == 1 && luScore == -1){
      $("#gameMessage").html("Tied -- ");
      setTimeout(function(){gameWin();},400);
    }
  }
}

});
