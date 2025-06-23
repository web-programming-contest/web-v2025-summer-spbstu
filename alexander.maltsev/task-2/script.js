function generateParentheses(n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === n * 2) {
      result.push(current);
      return;
    }

    if (open < n) backtrack(current + "(", open + 1, close);
    if (close < open) backtrack(current + ")", open, close + 1);
  }

  backtrack("", 0, 0);
  return result;
}

function generate() {
  const n = parseInt(document.getElementById("inputN").value);
  if (n > 10) {
    alert("Пожалуйста, введите n ≤ 10 — иначе страница может зависнуть.");
    return;
  }

  const output = generateParentheses(n);
  document.getElementById("output").textContent = output.join("\n");
}
