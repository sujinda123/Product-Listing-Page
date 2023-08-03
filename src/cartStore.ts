import { atom, map } from 'nanostores';

export const selectedCategories = atom([])

export const isLoading = atom(true)

export const isCartOpen = atom(false);

export const totalQuantity = atom(0);
export const totalPrice = atom(0);

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  quantity: number;
};

export const cartItems = map<Record<string, CartItem>>({});

type ItemDisplayInfo = Pick<CartItem, 'id' | 'name' | 'price' | 'imageSrc'>;

export function addCartItem({ id, name, price, imageSrc }: ItemDisplayInfo) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
    totalQuantity.set(totalQuantity.get() + 1);
    totalPrice.set(totalPrice.get() + price);
  } else {
    cartItems.setKey(id, { id, name, price, imageSrc, quantity: 1 });
    totalQuantity.set(totalQuantity.get() + 1);
    totalPrice.set(totalPrice.get() + price);
  }
}

export function deleteCartItem(id: string) {
  const existingEntry = cartItems.get()[id];
  
  if (existingEntry) {
    totalQuantity.set(totalQuantity.get() - existingEntry.quantity);
    totalPrice.set(totalPrice.get() - existingEntry.price * existingEntry.quantity);

    // Delete product
    const newCartItems = { ...cartItems.get() };
    delete newCartItems[id];
    cartItems.set(newCartItems);
  }
}

export function increaseCartItem(id: string) {
  const existingEntry = cartItems.get()[id];
  
  if (existingEntry) {
    totalQuantity.set(totalQuantity.get() + 1);
    totalPrice.set(totalPrice.get() + existingEntry.price);

    // Add quantity
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  }
}

export function decreaseCartItem(id: string) {
  const existingEntry = cartItems.get()[id];
  
  if (existingEntry && existingEntry.quantity > 1) {
    totalQuantity.set(totalQuantity.get() - 1);
    totalPrice.set(totalPrice.get() - existingEntry.price);

    // Reduct quantity
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity - 1,
    });
  }
}
