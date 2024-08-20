export function isHappySlow(num, n) {
  let max = Infinity;
  let sum = 0,
    tmp;
  let cnt = 0;
  while (num) {
    tmp = num % 10;
    if (tmp > max) return false;
    else max = tmp;
    num = (num - tmp) / 10;
    sum += tmp;
    cnt++;
  }

  return sum === n;
}
