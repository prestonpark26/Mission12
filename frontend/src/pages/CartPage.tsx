import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      <div className="card p-4 shadow-sm">
        {cart.length === 0 ? (
          <p className="text-muted text-center">Your cart is empty</p>
        ) : (
          <ul className="list-group">
            {cart.map((item: CartItem) => (
              <li
                key={item.bookID}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{item.title}</strong> - {item.quantity} copies @ $
                  {item.price} each ={' '}
                  <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                </span>
                <button
                  onClick={() => removeFromCart(item.bookID)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash"></i> Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="mt-4">
        Total: <span className="text-success">${totalAmount.toFixed(2)}</span>
      </h3>

      <div className="mt-3">
        <button onClick={clearCart} className="btn btn-success me-2">
          <i className="bi bi-bag-check"></i> Checkout
        </button>
        <button
          onClick={() => navigate('/books')}
          className="btn btn-secondary"
        >
          <i className="bi bi-arrow-left"></i> Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default CartPage;
