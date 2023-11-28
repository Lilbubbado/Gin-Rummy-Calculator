import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let p1Score = 0;
let p1Rounds = 0;

let p2Score = 0;
let p2Rounds = 0;

app.get("/", (req, res) => {
  res.render("index.ejs", {p1Score:p1Score, p1Rounds:p1Rounds, p2Score:p2Score, P2Rounds:p2Rounds});
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});