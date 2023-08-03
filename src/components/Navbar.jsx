import { useStore } from '@nanostores/react';
import {
  totalQuantity,
  totalPrice,
  isCartOpen,
  cartItems,
  deleteCartItem,
  increaseCartItem,
  decreaseCartItem,
} from '../cartStore.ts';
import './Navbar.scss';
import { useEffect, useRef } from 'react';

const Navbar = ({}) => {
  const $isCartOpen = useStore(isCartOpen);
  const $totalQuantity = useStore(totalQuantity);
  const $totalPrice = useStore(totalPrice);
  const $cartItems = useStore(cartItems);
  const cartPopupRef = useRef(null);
  const cartButtonRef = useRef(null);

  const handleClickOutside = event => {
    if (
      cartPopupRef.current &&
      !cartPopupRef.current.contains(event.target) &&
      cartButtonRef.current !== event.target
    ) {
      isCartOpen.set(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <nav>
        <div className="container">
          <div className="logo">
            <p>My Shop</p>
          </div>
          <div className="cart">
            <p ref={cartButtonRef} onClick={() => isCartOpen.set(!$isCartOpen)}>
              Cart({$totalQuantity})
            </p>
          </div>
          {/* Popup Cart */}
          <div ref={cartPopupRef} hidden={!$isCartOpen} className="cart-popup">
            {Object.values($cartItems).length ? (
              <>
                {Object.values($cartItems).map(cartItem => (
                  <div key={cartItem.id} className="popup-item">
                    <img src={cartItem.imageSrc} alt={cartItem.name} />
                    <div className="detail-item">
                      <p>{cartItem.name}</p>
                      <div className="btn-group">
                        <button onClick={() => decreaseCartItem(cartItem.id)}>
                          -
                        </button>
                        <p>{cartItem.quantity}</p>
                        <button onClick={() => increaseCartItem(cartItem.id)}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="option-item">
                      <button onClick={() => deleteCartItem(cartItem.id)}>
                        Delete
                      </button>
                      <p>${parseFloat(cartItem.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="total">
                  <p>Total</p>
                  <p>${$totalPrice.toFixed(2)}</p>
                </div>
              </>
            ) : (
              <p>Your cart is empty!</p>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
