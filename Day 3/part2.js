const fs = require("fs");
const readline = require("readline");

// Open the file as a readable stream
const fileStream = fs.createReadStream("./in");

// Create a new readline interface with the crlfDelay option set to Infinity
const rl = readline.createInterface({
  input: fileStream,
  //   crlfDelay: Infinity,
});

function findBadgeFromGroup(group) {
  for (const char of group[0]) {
    if (group[1].includes(char) && group[2].includes(char)) return char;
  }
}

function getPriorityForGroup(group) {
  const badgeItemType = findBadgeFromGroup(group);
  const priority = priorityForItem[badgeItemType];
  if (!priority) console.log({ group, badgeItemType, priority });
  return priority;
}

let currentGroup = [];
let sum = 0;
rl.on("line", (line) => {
  currentGroup.push(line);

  // each line is a round.
  if (currentGroup.length === 3) {
    const priority = getPriorityForGroup(currentGroup);
    sum += priority;
    currentGroup = [];
  }
});

// Handle any errors
rl.on("error", (err) => {
  console.error(err);
});

// Close the stream when the file has been read
rl.on("close", () => {
  console.log("sum", { sum });
});

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
