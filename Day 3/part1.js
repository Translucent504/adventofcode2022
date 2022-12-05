const fs = require("fs");
const readline = require("readline");

// Open the file as a readable stream
const fileStream = fs.createReadStream("./in");

// Create a new readline interface with the crlfDelay option set to Infinity
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

function getRepeatedItemForSack(sack = "asdadasda") {
  const [firstHalf, secondHalf] = [
    sack.substring(0, sack.length / 2),
    sack.substring(sack.length / 2, sack.length),
  ];
  for (const char of firstHalf) {
    const idx = secondHalf.indexOf(char);
    if (idx !== -1) {
      return secondHalf.charAt(idx);
    }
  }
}

// couldve just used an array lol...
const priorityForItem = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

let prioritySum = 0;
rl.on("line", (line) => {
  // each line is a sack.
  const item = getRepeatedItemForSack(line);
  prioritySum += priorityForItem[item];
});

// Handle any errors
rl.on("error", (err) => {
  console.error(err);
});

// Close the stream when the file has been read
rl.on("close", () => {
  console.log({ prioritySum });
});
