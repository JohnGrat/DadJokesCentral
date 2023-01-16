const bodyParser = require("body-parser");
const express = require("express");
const fs = require('fs');
require('dotenv').config()

const app = express();
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT 

const dadJokes = [
    { id: 1, question: "Why don't scientists trust atoms?", punchline: "Because they make up everything.", averageScore: 0, votes: 0},
    { id: 2, question: "I'm reading a book on anti-gravity. It's impossible to put down!", punchline: "Sorry no punchline", averageScore: 0, votes: 0},
    { id: 3, question: "Why did the tomato turn red?", punchline: "Because it saw the salad dressing!", averageScore: 0, votes: 0},
    { id: 4, question: "Why did the chicken cross the playground?", punchline: "To get to the other slide.", averageScore: 0, votes: 0},
    { id: 5, question: "Why don't oysters give to charity?", punchline: "They're shellfish.", averageScore: 0, votes: 0},
    { id: 6, question: "Why don't eggs tell jokes?", punchline: "They'd crack each other up.", averageScore: 0, votes: 0}
];

function generateDadJoke() {
    const randomIndex = Math.floor(Math.random() * dadJokes.length);
    return dadJokes[randomIndex];
}

app.get("/", (req, res) => {
    const appKey = process.env.APP_KEY
    console.log(appKey)
    nextJoke(res)
});

app.post("/score", (req, res) => {

    const id = Number(req.body.id);
    const score = Number(req.body.score);
    const joke = dadJokes.find(x => x.id == id)   

    const totalScore = joke.averageScore * joke.votes + score

    joke.votes += 1;
    joke.averageScore = totalScore / joke.votes
    console.log(joke)
    nextJoke(res)
});

function nextJoke(res){
    const joke = generateDadJoke();
    let css = fs.readFileSync('./views/css/index.css', 'utf8');
    res.render("index", { id: joke.id, question: joke.question, punchline: joke.punchline, averageScore: joke.averageScore, votes: joke.votes, css: css });
}

app.listen(PORT, () => {
    console.log("listening to port" + PORT)
    console.log(dadJokes)
});