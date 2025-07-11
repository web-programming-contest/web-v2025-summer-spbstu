function CartItem({ item, increaseCount, removeFromCart }) {
  return (
    <div className="cart-item">
      <h4>{item.title}</h4>
      <p>Price: {item.price} ₽</p>
      <p>Amount: {item.count}</p>
      <p>Total: {item.count * item.price} ₽</p>
      <button onClick={() => increaseCount(item.id)}>+</button>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
}

export default CartItem;