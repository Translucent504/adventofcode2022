const fs = require("fs");
const readline = require("readline");

// Open the file as a readable stream
const fileStream = fs.createReadStream("./in");

// Create a new readline interface with the crlfDelay option set to Infinity
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let totalContainments = 0;
rl.on("line", (line) => {
  // each line is a pair.
  const [rawRange1, rawRange2] = line.split(",");
  const [start, end] = rawRange1.split("-");
  const [start2, end2] = rawRange2.split("-");
  const parsedRanges = [
    { start: +start, end: +end },
    { start: +start2, end: +end2 },
  ];
  if (
    (parsedRanges[0].start >= parsedRanges[1].start &&
      parsedRanges[0].start <= parsedRanges[1].end) ||
    (parsedRanges[1].start >= parsedRanges[0].start &&
      parsedRanges[1].start <= parsedRanges[0].end)
  ) {
    totalContainments += 1;
  }
});

// Handle any errors
rl.on("error", (err) => {
  console.error(err);
});

// Close the stream when the file has been read
rl.on("close", () => {
  console.log({ totalContainments });
});
