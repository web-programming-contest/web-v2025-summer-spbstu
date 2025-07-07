function maxSlidingWindow(nums, k) {
  if (!nums.length || k === 0) return [];
  
  const result = [];
  const deque = [];
  
  for (let i = 0; i < nums.length; i++) {
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }
    
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
    
  }

  
  
  return result;
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); 

console.log(maxSlidingWindow([9,11], 2)); 

console.log(maxSlidingWindow([1,-1], 1)); 