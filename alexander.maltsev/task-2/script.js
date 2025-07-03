function generateParentheses(n) {
  if (
    typeof n !== "number" ||
    !Number.isInteger(n) ||
    n < 1 ||
    n > 10
  ) {
    throw new Error("n должно быть целым числом от 1 до 10");
  }

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
  const input = document.getElementById("inputN");
  const errorDiv = document.getElementById("error");
  const rawValue = input.value.trim();

  errorDiv.textContent = "";

  if (!/^\d+$/.test(rawValue)) {
    errorDiv.textContent = "Введите только натуральное число без лишних символов.";
    return;
  }

  const n = Number(rawValue);

  try {
    const output = generateParentheses(n);
    document.getElementById("output").textContent = output.join("\n");
  } catch (error) {
    errorDiv.textContent = error.message;
  }
}
