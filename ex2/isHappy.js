export function isHappy(num, n) {
  const arr = num.toString().split("");
  let sum = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    sum += parseInt(arr[i]);
    // console.log("-->", num);
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        // console.log("j,i", arr[j], arr[i], j, i);
        return 10 ** (arr.length - j - 1);
      }
    }
  }
  sum += parseInt(arr[arr.length - 1]);

  return sum === n;
}
// console.log(isHappy(130));
// console.log(isHappy(1000));
// console.log("---->", 1000 + 10 ** isHappy(1000));
// console.log("---->", 1100 + 10 ** isHappy(1100));

// console.log(isHappy(121));
// console.log(isHappy(100));
// console.log(isHappy(110));

// console.log(isHappy(869)); // 889
