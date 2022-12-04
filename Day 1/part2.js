const fs = require("fs");
const readline = require("readline");

// Open the file as a readable stream
const fileStream = fs.createReadStream("./in");

// Create a new readline interface with the crlfDelay option set to Infinity
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});
let sumArray = [];
let currSum = 0;
// Read the file line by line
rl.on("line", (line) => {
  const n = Number.parseInt(line);
  if (!n) {
    sumArray.push(currSum);
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
  console.log(
    sumArray
      .sort((l, r) => r - l)
      .slice(0, 3)
      .reduce((old, curr) => old + curr, 0)
  );
});
