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
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomeScores = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
};

function scoreForOutcome(choices) {
    // couldve been an obj/map, but i expect some stuff for p2 😂
  switch (choices) {
    case "AX":
      return outcomeScores.DRAW;
    case "AY":
      return outcomeScores.WIN;
    case "AZ":
      return outcomeScores.LOSE;
    case "BX":
      return outcomeScores.LOSE;
    case "BY":
      return outcomeScores.DRAW;
    case "BZ":
      return outcomeScores.WIN;
    case "CX":
      return outcomeScores.WIN;
    case "CY":
      return outcomeScores.LOSE;
    case "CZ":
      return outcomeScores.DRAW;
    default:
      break;
  }
}

function calculateScoreForRound(choices) {
  const [opponent, me] = choices;
  let score = scoreForShape[me];
  score += scoreForOutcome(choices.join(""));
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
