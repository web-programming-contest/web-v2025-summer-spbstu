function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0');
    return `#${hex.toUpperCase()}`;
  }
  
  function generateColor() {
    const color = getRandomHexColor();
    document.getElementById('color-box').style.backgroundColor = color;
    document.getElementById('color-value').textContent = color;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generate-btn');
    button.addEventListener('click', generateColor);
  });
  