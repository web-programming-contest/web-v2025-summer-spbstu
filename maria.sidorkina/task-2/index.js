function findLongestPalindrome(s) {
    if (s.length < 2) {
        return s;
    }

    const lower = s.toLowerCase();
    let start = 0;
    let maxLen = 1;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < lower.length && lower[left] === lower[right]) {
            left--;
            right++;
        }
        const length = right - left - 1;
        if (length > maxLen) {
            maxLen = length;
            start = left + 1;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);
        expandAroundCenter(i, i + 1);
    }

    return s.substring(start, start + maxLen);
}
