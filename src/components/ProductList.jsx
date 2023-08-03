import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ProductList.scss';

import { useStore } from '@nanostores/react';
import { addCartItem, selectedCategories } from '../cartStore.ts';

export default function ProductList({ products }) {
  const selectedCategoriesState = useStore(selectedCategories);

  const onAddToCart = (id, name, price, imageSrc) => {
    addCartItem({ id, name, price, imageSrc });
  };

  const filteredProducts =
    selectedCategoriesState.length > 0
      ? products.filter(product =>
          selectedCategoriesState.includes(product.category)
        )
      : products;

  return (
    <main>
      <div className="container">
        <div className="product-lists">
          {filteredProducts.length !== 0 &&
            filteredProducts.map(product => (
              <div key={product.id} className="product-item">
                <p className="category">{product.category}</p>
                <img src={product.image} alt="" />
                <p className="product-name">{product.title || <Skeleton />}</p>
                <div className="reviews">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{ fill: '#ffc107' }}
                    >
                      <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
                    </svg>
                    <span>{product.rating.rate}</span>
                  </p>
                  <span> • </span>
                  <p>{product.rating.count} reviews</p>
                </div>
                <div className="btm-group">
                  <div className="price">
                    ${parseFloat(product.price).toFixed(2)}
                  </div>
                  <button
                    onClick={() =>
                      onAddToCart(
                        product.id,
                        product.title,
                        product.price,
                        product.image
                      )
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
