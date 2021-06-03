import { handleUserCart, auth, firestore } from "./../../firebase/utils";
import { useDispatch } from "react-redux";
import { fetchCart as fetch_cart } from "./../../redux/Cart/cart.actions";

export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    (cartItem) => cartItem.documentID === nextCartItem.documentID
  );
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });
  if (cartItemExists) {
    const newcart = prevCartItems.map((cartItem) =>
      cartItem.documentID === nextCartItem.documentID
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
    handleUserCart(newcart);
    return newcart;
  }

  const newcart = [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
    },
  ];
  handleUserCart(newcart);
  return newcart;
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  const newCart = prevCartItems.filter(
    (item) => item.documentID !== cartItemToRemove.documentID
  );
  handleUserCart(newCart);
  return newCart;
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  const existingCartItem = prevCartItems.find(
    (cartItem) => cartItem.documentID === cartItemToReduce.documentID
  );

  if (existingCartItem.quantity === 1) {
    const newCart = prevCartItems.filter(
      (cartItem) => cartItem.documentID !== existingCartItem.documentID
    );
    handleUserCart(newCart);
    return newCart;
  }

  const newCart = prevCartItems.map((cartItem) =>
    cartItem.documentID === existingCartItem.documentID
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
  return newCart;
};
