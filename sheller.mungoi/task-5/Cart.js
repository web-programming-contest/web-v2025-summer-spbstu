import CartItem from './CartItem';

function Cart({ cart, increaseCount, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

  return (
    <div className="cart">
      <div className="cart-list">
        {cart.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            increaseCount={increaseCount} 
            removeFromCart={removeFromCart} 
          />
        ))}
      </div>
      <p className="total-amount">Total amount: {total} ₽</p>
    </div>
  );
}

export default Cart;