function findLongestIncreasingSubsequenceContiguous(arr) {
  if (arr.length === 0) return 0;

  let maxLen = 1;
  let currentLen = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      currentLen++;
      if (currentLen > maxLen) {
        maxLen = currentLen;
      }
    } else {
      currentLen = 1;
    }
  }

  return maxLen;
}

function findLongestIncreasingSubsequenceContiguous2(arr) {
  if (arr.length === 0) return 0;

  let maxLen = 1;
  let currentLen = 1;
  let maxStartIndex = 0;
  let currentStartIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      currentLen++;
    } else {
      if (currentLen > maxLen) {
        maxLen = currentLen;
        maxStartIndex = currentStartIndex;
      }
      currentLen = 1;
      currentStartIndex = i;
    }
  }

  if (currentLen > maxLen) {
    maxLen = currentLen;
    maxStartIndex = currentStartIndex;
  }

  const subsequence = arr.slice(maxStartIndex, maxStartIndex + maxLen);
  return subsequence
}

function testFindLongestIncreasingSubsequenceContiguous() {
  const tests = [
    { input: [10, 9, 2, 5, 3, 7, 101, 18], expected: 3 },
    { input: [1, 2, 3, 2, 3, 4, 5], expected: 4 },
    { input: [5, 4, 3, 2, 1], expected: 1 },
    { input: [], expected: 0 },
    { input: [1], expected: 1 },
    { input: [1, 2, 3, 4, 5], expected: 5 },
    { input: [3, 2, 1, 2, 3, 4, 5], expected: 5 }
  ];
  
  tests.forEach((test, index) => {
    const result = findLongestIncreasingSubsequenceContiguous(test.input);
    const pass = result === test.expected ? "✅" : "❌";
    console.log(`${pass} Test ${index + 1}`);
    console.log(`  Входной массив: [${test.input.join(", ")}]`);
    console.log(`  Ожидалось: ${test.expected}`);
    console.log(`  Получено:   ${result}`);
    console.log("---------------------------");
  });
}

testFindLongestIncreasingSubsequenceContiguous();


  