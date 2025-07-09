function findLongestIncreasingSubsequence(arr) {
  const n = arr.length;
  if (n === 0) return 0;

  const dp = new Array(n).fill(1); 

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}


console.log(findLongestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])); // -> 2 3 7 101(18)
console.log(findLongestIncreasingSubsequence([0, 1, 0, 3, 2, 3]));           // -> 0 1 2 3
console.log(findLongestIncreasingSubsequence([7, 7, 7, 7]));                 // -> 7
console.log(findLongestIncreasingSubsequence([]));                           // -> null
