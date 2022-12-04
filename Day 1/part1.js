const fs = require("fs");
const readline = require("readline");
const internal = require("stream");

// Open the file as a readable stream
const fileStream = fs.createReadStream("./in");

// Create a new readline interface with the crlfDelay option set to Infinity
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});
let oldSum = 0;
let currSum = 0;
// Read the file line by line
rl.on("line", (line) => {
  const n = Number.parseInt(line);
  if (!n) {
    oldSum = currSum > oldSum ? currSum : oldSum;
    currSum = 0;
    return;
  }
  currSum += n;
});

// Handle any errors
rl.on("error", (err) => {
  console.error(err);
});

// Close the stream when the file has been read
rl.on("close", () => {
  console.log(currSum > oldSum ? currSum : oldSum);
});
