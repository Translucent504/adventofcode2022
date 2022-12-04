const fs = require("fs");
const readline = require("readline");

// Open the file as a readable stream
const fileStream = fs.createReadStream("./in");

// Create a new readline interface with the crlfDelay option set to Infinity
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const scoreForShape = {
  A: 1,
  B: 2,
  C: 3,
};

const outcomeScores = {
  X: 0,
  Y: 3,
  Z: 6,
};

const shapes = {
  rock: "A",
  paper: "B",
  scissor: "C",
};

const outcomeShift = {
  X: -1,
  Y: 0,
  Z: 1,
};

function getShapeForScenario([opp, outcome]) {
  // lets try a circular ermutation sol
  const abc = Object.values(shapes);
  const idx = abc.indexOf(opp);
  const res = abc.at((idx + outcomeShift[outcome]) % 3);
  return res;
}

function calculateScoreForRound(scenario) {
  const [opponent, outcome] = scenario;
  const me = getShapeForScenario(scenario);
  let score = scoreForShape[me];
  score += outcomeScores[outcome];
  return score;
}

let totalScore = 0;
// Read the file line by line
rl.on("line", (line) => {
  // each line is a round.
  totalScore += calculateScoreForRound(line.split(" "));
});

// Handle any errors
rl.on("error", (err) => {
  console.error(err);
});

// Close the stream when the file has been read
rl.on("close", () => {
  console.log({ totalScore });
});
