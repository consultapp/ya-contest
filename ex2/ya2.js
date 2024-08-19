// решение с анализом разницы до следующего возможного счастливого числа
// путем добавления разницы между превышающим последующим числом и предыдущим 101 => 111

function isHappy(num, n) {
  const arr = num.toString().split("");
  let sum = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    sum += parseInt(arr[arr.length - i]);
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[i]) {
        // console.log("j,i", num, j, i);
        // return j - i;
        return false;
      }
    }
  }

  return sum === n;
}

function findAll(n, k) {
  let cnt = 0;
  let min = null;
  let max = null;
  for (let i = 10 ** (k - 1); i < 10 ** k; i++) {
    const happy = isHappy(i, n);
    if (typeof happy === "number" && happy !== 0) {
      i += 10 ** happy;
      console.log("first", i, happy);
    } else if (typeof happy === "boolean" && happy) {
      cnt++;
      if (!min) min = i;
      max = i;
    }
  }

  if (!cnt) return [0];

  return [cnt, min.toString(), max.toString()];
}

console.log(findAll(10, 3)); // [8, 118, 334]
console.log(findAll(27, 3)); // [1, 999, 999]
console.log(findAll(28, 3)); // [0]

// function isHappy(num, n) {
//   let max = Infinity;
//   let sum = 0,
//     tmp;
//   let cnt = 0;
//   while (num) {
//     tmp = num % 10;
//     if (tmp > max) return false;
//     else max = tmp;
//     num = (num - tmp) / 10;
//     sum += tmp;
//     cnt++;
//   }

//   return sum === n;
// }
