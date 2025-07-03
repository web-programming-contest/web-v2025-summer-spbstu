function RLE (str)
{
  let prevSymbol = str[0]
  let count = 0
  let result = ''
  let item = ''
  for (item of str)
  {
    if (item == prevSymbol)
    {
      count++
    }
    else
    {
      result+=count
      result+=prevSymbol
      count = 1
    }
    prevSymbol = item
  }
  return result+count+prevSymbol
}
console.log(RLE("aaabbbcc"))
console.log(RLE("aaaddddddddfffff"))
console.log(RLE("abcdefg"))
