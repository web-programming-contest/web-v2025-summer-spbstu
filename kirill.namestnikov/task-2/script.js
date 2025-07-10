function findLongestPalindrome(str){
    if ((!str) || (str.length === 0)){
        throw new Error("String should not be empty");
    }
    let start = 0;
    let end = 0;
    for (let i = 0; i < str.length; ++i){
        const firstLength = countPalindromeLength(str, i, i);
        const secondLength =  countPalindromeLength(str, i, i + 1);
        const maxLength = Math.max(firstLength, secondLength);
        if (maxLength > end - start){
            start = i - Math.floor((maxLength - 1) / 2);
            end = i + Math.floor(maxLength / 2);
        }
    }
    return str.substring(start, end + 1);
}

function countPalindromeLength(str, left, right){
    while ((left >= 0) && (right < str.length) && (str[left] === str[right])){
        --left;
        ++right;
    }
    return right - left - 1;
}

try{
    console.log(findLongestPalindrome("abba"));
    console.log(findLongestPalindrome("acacac"));
    console.log(findLongestPalindrome("a"));
    console.log(findLongestPalindrome(""));
}
catch (e){
    console.log(e.message);
}