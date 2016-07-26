$(function() {

  INITIAL_PLAYER_MONEY = 100;
  MAXIMUM_BET = 10;
  MINIMUM_BET = 5;
  playerMoney = INITIAL_PLAYER_MONEY;
  $("#game-msg").text("You have $" + playerMoney);

  function showMessage(message, msgClass) {
    $("#game-msg").text(message).addClass(msgClass);
    setTimeout(function() {
      $("#game-msg").removeClass(msgClass);
    }, 1000);
  }

  function resetGame() {
    playerMoney = INITIAL_PLAYER_MONEY;
    $(this).hide();
    $("#bet").val("");
    $("#guess").val("");
    $("#game-msg").text("You have $" + playerMoney);
    $("#play").prop("disabled", false);
  }


  function updateGameDisplay(playerGuess, playerBet, correctAnswer) {
    var message = "";

    if (playerGuess === correctAnswer) {
      playerMoney += playerBet;
      message = "Congrats! You guessed the correct answer! You now have $" + playerMoney;
      showMessage(message, "success");
    } else if (playerGuess === correctAnswer + 1 || playerGuess === correctAnswer - 1) {
      message = "You were so close! You guessed " + playerGuess + ", the correct answer was " + correctAnswer + ". We'll let you keep your money.";
      showMessage(message, "neutral");
    } else {
      playerMoney -= playerBet;
      message = "You were way off! You guessed " + playerGuess + ", the correct answer was " + correctAnswer + ". You have $" + playerMoney + " remaining.";
      showMessage(message, "error");
    }
  }


  function invalidInputs(playerBet, playerGuess) {
    message = "";
    if(playerBet < MINIMUM_BET || playerBet > MAXIMUM_BET) {
      message = "Please place a bet between $5 and $10";
    }
    if(playerBet > playerMoney) {
      message = "You only have $" + playerMoney + " remaining! Please place a bet within your budget";
    }
    if(isNaN(playerGuess)) {
      message = "Please provide a numeric guess between 1 and 10";
    }
    return message;
  }

  function playGame() {
    var playerBet = Number($('#bet').val());
    var playerGuess = Number($('#guess').val());
    var errorMsg = invalidInputs(playerBet, playerGuess)
    if( errorMsg != "") {
      showMessage(errorMsg, "error");
      return false;
    }
    var correctAnswer = Math.floor(Math.random() * 10) + 1;
    updateGameDisplay(playerGuess, playerBet, correctAnswer);
    if(playerMoney < MINIMUM_BET) {
      $("#reset").show();
      $("#game-msg").text("GAME OVER! You have insufficient funds to continue ($" + playerMoney + "), click reset to play again");
      $(this).prop("disabled", true);
    }
  }

  $("#play").on('click', playGame);
  $("#reset").on('click', resetGame);
});