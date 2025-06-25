function analyzieString(str) {
  let letters = 0;
  let digits = 0;
  let spaces = 0;
  let other = 0;
  for (let i = 0; i !== str.length; ++i) {
    let char = str[i];
    if (RegExp(/^\p{L}/,'u').test(char)) {
      ++letters;
    }
    else if (RegExp(/^-?\d+(\.\d+)?$/).test(char)) {
      ++digits;
    }
    else if (RegExp(/\s/).test(char)) {
      ++spaces;
    }
    else {
      ++other;
    }
  }
  return { letters, digits, spaces, other }
}
