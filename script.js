import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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
  checkForShutout();
  checkWinner(player1, player2);
  return
}

function checkWinner(player1, player2) {
  if (player1.points > player2.points) {
    winner = {name:player1.name, points:player1.points};
    loser = {name:player2.name, points:player2.points};
  } else {
    winner = {name:player2.name, points:player2.points};
    loser = {name:player1.name, points:player1.points};
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
  player.points += parseInt(points);
  player.roundsWon += 1;
  if (player.shutout === true) {
    player.shutout = false;
  }
  if (bonus != undefined) {
    player.points += 25;
  }
  return
}

function resetGame() {
  winner = {name:'', points:0};
  loser = {name:'', points:0};
  player1 = {
    name: '',
    points: 0,
    roundsWon: 0,
    shutout: true
  };
  player2 = {
    name: '',
    points: 0,
    roundsWon: 0,
    shutout: true
  };
  return
}

let winner;
let loser;

let player1 = {
  name: '',
  points: 0,
  roundsWon: 0,
  shutout: true
};

let player2 = {
  name: '',
  points: 0,
  roundsWon: 0,
  shutout: true
};

app.get("/", (req, res) => {
  if (checkForEndgame()) {
    calculateScore();
    res.redirect("/winner");
  } else {
    if (player1.name == "" || player2.name == "") {
      res.redirect("/start");
    } else {
    res.render("index.ejs", {player1:player1, player2:player2});
    }
  }
});

app.get("/start", (req, res) => {
  res.render("start-page.ejs");
});

app.post("/start", (req, res) => {
  player1.name = req.body.p1Name;
  player2.name = req.body.p2Name;
  res.redirect("/");
});

app.get("/p1-score", (req, res) => {
  res.render("score.ejs");
});

app.get("/p2-score", (req, res) => {
  res.render("score.ejs");
});

app.post("/p1-score", (req, res) => {
  scorePoints(player1, req.body.score, req.body.checkbox);
  res.redirect("/");
});

app.post("/p2-score", (req, res) => {
  scorePoints(player2, req.body.score, req.body.checkbox);
  res.redirect("/");
});

app.get("/winner", (req, res) => {
  // console.log(`Winner Name: ${winner.name}`);
  // console.log(`Winner Points: ${winner.points}`);
  // console.log(`Loser Name: ${loser.name}`);
  // console.log(`Loser Points: ${loser.points}`);
  // console.log(`Player 1 Points: ${player1.points}`);
  // console.log(`Player 2 Points: ${player2.points}`);
  res.render("winner.ejs", {winner:winner, loser:loser});
});

app.post("/reset", (req, res) => {
  resetGame();
  res.redirect("/start");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});