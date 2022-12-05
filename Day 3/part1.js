const fs = require("fs");
const readline = require("readline");

// Open the file as a readable stream
const fileStream = fs.createReadStream("./in");

// Create a new readline interface with the crlfDelay option set to Infinity
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  // each line is a sack.
  const mistake = getMistakeForSack(line);
});

// Handle any errors
rl.on("error", (err) => {
  console.error(err);
});

// Close the stream when the file has been read
rl.on("close", () => {});
