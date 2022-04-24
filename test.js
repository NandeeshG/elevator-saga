let lowerBound = function (arr, val) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    let m = Math.floor((l + r) / 2);
    if (arr[m] < val) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return l;
};

console.log("array [0,1,2]");
console.log("find -1", lowerBound([0, 1, 2], -1));
console.log("find  0", lowerBound([0, 1, 2], 0));
console.log("find  1", lowerBound([0, 1, 2], 1));
console.log("find  2", lowerBound([0, 1, 2], 2));
console.log("find  3", lowerBound([0, 1, 2], 3));

console.log("array [0,1]");
console.log("find -1", lowerBound([0, 1], -1));
console.log("find  0", lowerBound([0, 1], 0));
console.log("find  1", lowerBound([0, 1], 1));
console.log("find  2", lowerBound([0, 1], 2));

console.log("array [0]");
console.log("find -1", lowerBound([0], -1));
console.log("find  0", lowerBound([0], 0));
console.log("find  1", lowerBound([0], 1));
