import './Category.scss';

import { useStore } from '@nanostores/react';
import { selectedCategories, isLoading } from '../cartStore.ts';
import Skeleton from 'react-loading-skeleton';

export default function Category({ products }) {
  const $isLoading = useStore(isLoading);
  const selectedCategoriesState = useStore(selectedCategories);

  const categories = [...new Set(products.map(product => product.category))];

  const toggleCategory = (category) => {
    if (selectedCategoriesState.includes(category)) {
      selectedCategories.set(selectedCategoriesState.filter(c => c !== category));
    } else {
      selectedCategories.set([...selectedCategoriesState, category]);
    }
  };

  return (
    <section>
      <div className="container">
        {!$isLoading && categories.length !== 0 ? categories.map(category => (
          <div
            key={category}
            onClick={() => toggleCategory(category)}
            className={
              selectedCategoriesState.includes(category) 
                ? 'category-item section'
                : 'category-item'
            }
          >
            <p>{category}</p>
          </div>
        )) :  [...Array(4)].map((_, i) => <Skeleton key={i} height={20} width={100} style={{color: "#e3e4e6", marginRight: 10}} />) }
      </div>
    </section>
  );
}
