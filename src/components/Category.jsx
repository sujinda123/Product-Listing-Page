import './Category.scss';

import { useStore } from '@nanostores/react';
import { selectedCategories } from '../cartStore.ts';

export default function Category({ products }) {
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
        {categories.map(category => (
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
        ))}
      </div>
    </section>
  );
}
