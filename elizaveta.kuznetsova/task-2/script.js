function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);

  if (isNaN(diff) || diff < 0) return '';

  if (diff < 60) return `${diff} секунд назад`;
  if (diff < 3600) return `${Math.floor(diff / 60)} минут назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} часов назад`;
  return `${Math.floor(diff / 86400)} дней назад`;
}

const input = document.getElementById('dateInput');
const output = document.getElementById('timeOutput');

input.addEventListener('input', () => {
  output.textContent = timeAgo(input.value);
});
