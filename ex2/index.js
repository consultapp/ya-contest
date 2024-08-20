import { isHappy } from "./isHappy.js";

// решение с анализом разницы до следующего возможного счастливого числа
// путем добавления разницы между превышающим последующим числом и предыдущим 101 => 111

function findAll(n, k) {
  let cnt = 0;
  let min = null;
  let max = null;
  let i = 10 ** (k - 1);
  while (i < 10 ** k) {
    // console.log("-->", i);
    const happy = isHappy(i, n);
    if (typeof happy === "number") {
      // console.log(i, happy, " =>", i + happy);

      i += happy;
      continue;
    } else if (typeof happy === "boolean" && happy) {
      cnt++;
      if (!min) min = i;
      max = i;
    }
    i++;
  }

  if (!cnt) return [0];

  return [cnt, min.toString(), max.toString()];
}
console.log(findAll(10, 3)); // [8, 118, 334]
console.log(findAll(27, 3)); // [1, 999, 999]
console.log(findAll(28, 3)); // [0]

console.time("12");
console.log(findAll(10000, 12)); // [8, 118, 334]
console.timeLog("12");

console.time("15");
console.log(findAll(10000, 15)); // [8, 118, 334]
console.timeLog("15");

console.time("16");
console.log(findAll(10 ** 16 + 10 ** 8, 16)); // [8, 118, 334]
console.timeLog("16");

console.time("17");
console.log(findAll(1000000000000000, 17)); // [8, 118, 334]
console.timeLog("17");

console.time("19");
console.log(findAll(1000000000000000, 19)); // [8, 118, 334]
console.timeLog("19");
