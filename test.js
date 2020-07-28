// let a = ["Admin", "Admin", "Member"];

// // b includes objects.
// let b = [];

let examples = [
  {
    gameId: 1,
    role: "DUO_SUPPORT",
  },
  {
    gameId: 2,
    role: "DUO_SUPPORT",
  },
  {
    gameId: 3,
    role: "AD_CARRY",
  },
  {
    gameId: 4,
    role: "DUO_SUPPORT",
  },
];

var store = ["Apple", "Watermellon", "Watermellon", "Grapes", "Grapes"];
var frequency = {}; // array of frequency.
var max = 0; // holds the max frequency.
var result; // holds the max frequency element.
for (var v in store) {
  frequency[examples[v].role] = (frequency[examples[v].role] || 0) + 1; // increment frequency.
  // console.log(frequency[store[v]]);
  if (frequency[examples[v].role] > max) {
    // is this frequency > max so far ?
    max = frequency[examples[v].role]; // update max.
    result = examples[v].role; // update result.
  }
}

console.log(result);
console.log(frequency);

// let examples = [
//   {
//     gameId: 1,
//     role: "DUO_SUPPORT",
//   },
//   {
//     gameId: 2,
//     role: "DUO_SUPPORT",
//   },
//   {
//     gameId: 3,
//     role: "AD_CARRY",
//   },
//   {
//     gameId: 4,
//     role: "DUO_SUPPORT",
//   },
// ];

// let f = {};
// let max = 0;
// let result;
// for (let i in examples) {
//   f[examples[i].role] = (f[examples[i].roles] || 0) + 1;
//   if (f[examples[i].role] > max) {
//     max = f[examples[i].role];
//     result = examples[i].role;
//   }
// }
// console.log(result);
// console.log(max);
