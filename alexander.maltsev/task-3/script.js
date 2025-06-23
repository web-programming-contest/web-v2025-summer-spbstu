function sortArrayByParity(arr) {
  let even = [];
  let odd = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      even.push(arr[i]);
    } else {
      odd.push(arr[i]);
    }
  }

  return even.concat(odd);
}

function sortAndShow() {
  let input = document.getElementById("inputArray").value;
  const arr = input
    .split(",")
    .map((x) => parseInt(x.trim()))
    .filter((x) => !isNaN(x));

  let sorted = sortArrayByParity(arr);
  document.getElementById("result").textContent = "[" + sorted.join(", ") + "]";
}
