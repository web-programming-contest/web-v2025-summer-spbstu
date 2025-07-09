const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const WORD_FORMS = {
  seconds: ['секунда', 'секунды', 'секунд'],
  minutes: ['минута', 'минуты', 'минут'],
  hours:   ['час', 'часа', 'часов'],
  days:    ['день', 'дня', 'дней']
};

function pluralize(number, forms) {
  number = Math.abs(number) % 100;
  const n1 = number % 10;

  if (number > 10 && number < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

function timeAgo(dateStr) {
  const now = new Date();
  const past = new Date(dateStr);
  const diff = Math.floor((now - past) / 1000);

  if (isNaN(diff) || diff < 0) return '';

  if (diff < MINUTE) {
    const value = diff;
    return `${value} ${pluralize(value, WORD_FORMS.seconds)} назад`;
  }
  if (diff < HOUR) {
    const value = Math.floor(diff / MINUTE);
    return `${value} ${pluralize(value, WORD_FORMS.minutes)} назад`;
  }
  if (diff < DAY) {
    const value = Math.floor(diff / HOUR);
    return `${value} ${pluralize(value, WORD_FORMS.hours)} назад`;
  }

  const value = Math.floor(diff / DAY);
  return `${value} ${pluralize(value, WORD_FORMS.days)} назад`;
}

const input = document.getElementById('dateInput');
const output = document.getElementById('timeOutput');

input.addEventListener('input', () => {
  output.textContent = timeAgo(input.value);
});
