function checkForEndgame() {
  if (player1.points >= 100 || player2.points >= 100) {
    return true; 
  } else {
    return false;
  }
}

function calculateScore() {
  if (player1.points >= 100) {
    player1.points = (player1.points + 100 + (player1.roundsWon * 25));
    player2.points = (player2.points + (player2.roundsWon * 25));
  } else if (player2.points >= 100) {
    player1.points = (player1.points + (player1.roundsWon * 25));
    player2.points = (player2.points + 100 + (player2.roundsWon * 25));
  }
  checkWinner(player1.points, player2.points);
  checkForShutout();
  return
}

function checkWinner(player1, player2) {
  if (player1.points > player2.points) {
    player1.winner = true;
  } else {
    player2.winner = true;
  }
  return
}

function checkForShutout() {
  if (player1.shutout === true) {
    player2.points += 100;
  } else if (player2.shutout === true) {
    player1.points += 100;
  }
  return
}

function scorePoints(player, points, bonus) {
  if (player.shutout === true) {
    player.shutout = false;
  }
  player.points += points;
  if (bonus != undefined) {
    player.points += 25);
  }
  return
}

let player1 = {
  name: '',
  points: 0,
  roundsWon: 0,
  winner: false,
  shutout: true
}

let player2 = {
  name: '',
  points: 0,
  roundsWon: 0,
  winner: false,
  shutout: true
}