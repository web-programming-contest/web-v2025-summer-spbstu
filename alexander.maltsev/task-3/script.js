function sortArrayByParity(arr) {
  return [...arr].sort((a, b) => {
    return a % 2 === b % 2 ? a - b : (a % 2) - (b % 2);
  });
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
