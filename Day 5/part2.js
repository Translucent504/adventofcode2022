const fs = require("fs");
const readline = require("readline");

let initialState = [
  ["J", "H", "P", "M", "S", "F", "N", "V"],
  ["S", "R", "L", "M", "J", "D", "Q"],
  ["N", "Q", "D", "H", "C", "S", "W", "B"],
  ["R", "S", "C", "L"],
  ["M", "V", "T", "P", "F", "B"],
  ["T", "R", "Q", "N", "C"],
  ["G", "V", "R"],
  ["C", "Z", "S", "P", "D", "L", "R"],
  ["D", "S", "J", "V", "G", "P", "B", "F"],
];

// Open the file as a readable stream
const fileStream = fs.createReadStream("./in");

// Create a new readline interface with the crlfDelay option set to Infinity
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  const [amount, from, to] = line
    .split(" ")
    .filter((v, i) => [1, 3, 5].includes(i));

  const crates = initialState[+from - 1].splice(-amount);
  initialState[+to - 1].push(...crates);
});

// Handle any errors
rl.on("error", (err) => {
  console.error(err);
});

// Close the stream when the file has been read
rl.on("close", () => {
  console.log(initialState.reduce((prev, cur) => prev + cur.at(-1), ""));
});
