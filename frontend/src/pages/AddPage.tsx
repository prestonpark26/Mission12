import { useNavigate, useParams } from 'react-router-dom';
import WelcomeText from '../components/WelcomeText';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function AddPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: price ? Number(price) : 0,
      quantity,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeText />
      <h2>Add to Cart: {title}</h2>
      <div>
        <input
          type="number"
          placeholder="Enter Number of Copies"
          className="form-control mb-3"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <button className="btn btn-primary mb-3" onClick={handleAddToCart}>
          <i className="bi bi-cart-plus"></i> Add to Cart
        </button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}
export default AddPage;
