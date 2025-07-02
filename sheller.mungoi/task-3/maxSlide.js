function maxSlidingWindow(nums, k) {
  if (!nums.length || k === 0) return [];
  
  const result = [];
  const deque = []; // хранит индексы элементов
  
  for (let i = 0; i < nums.length; i++) {
    // Удаляем элементы из deque, которые выходят за границы окна
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }
    
    // Удаляем из deque элементы меньшие текущего
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    // Добавляем текущий индекс в deque
    deque.push(i);
    
    // Добавляем максимум в результат, когда окно достигло размера k
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
    
  }

  
  
  return result;
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); 
// Вывод: [3,3,5,5,6,7]

console.log(maxSlidingWindow([9,11], 2)); 
// Вывод: [11]

console.log(maxSlidingWindow([1,-1], 1)); 
// Вывод: [1,-1]