const books = [
  { id: 1, title: "Power", price: 500 },
  { id: 2, title: "7 habits", price: 650 },
  { id: 3, title: "Web-Devlopment", price: 900 },
  { id: 4, title: "Подфак-Политех", price: 700 },
  {id: 5, title: "Russian for foreigeners", price:2100},  
];

let cart = [];

const bookList = document.getElementById("bookList");
const cartList = document.getElementById("cartList");
const totalAmount = document.getElementById("totalAmount");

function renderBooks() {
  bookList.innerHTML = "";
  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p>Price: ${book.price} ₽</p>
      <button onclick="addToCart(${book.id})">Add to cart</button>
    `;
    bookList.appendChild(div);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.count;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h4>${item.title}</h4>
      <p>Price: ${item.price} ₽</p>
      <p>Ammount: ${item.count}</p>
      <p>Total: ${item.count * item.price} ₽</p>
      <button onclick="increaseCount(${item.id})">+</button>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartList.appendChild(div);
  });

  totalAmount.textContent = `Total ammount: ${total} ₽`;
}

function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  const item = cart.find(i => i.id === bookId);

  if (item) {
    item.count += 1;
  } else {
    cart.push({ ...book, count: 1 });
  }

  renderCart();
}

function increaseCount(bookId) {
  const item = cart.find(i => i.id === bookId);
  if (item) {
    item.count += 1;
    renderCart();
  }
}

function removeFromCart(bookId) {
  cart = cart.filter(i => i.id !== bookId);
  renderCart();
}

renderBooks();
renderCart();
