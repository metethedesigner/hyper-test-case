import { actionTypes } from "./action";

const persistedCartItems = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

const updateCartTotalAmount = (cartItems) =>
  cartItems.reduce(
    (total, item) => total + item.qty * parseFloat(item.price),
    0
  );

const initialState = {
  cartItems: persistedCartItems || [],
  cartTotalAmount: persistedCartItems
    ? updateCartTotalAmount(persistedCartItems).toFixed(2)
    : 0,
};

const saveToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const cartReducer = (state = initialState, action) => {
  let updatedCartItems;

  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        updatedCartItems = state.cartItems.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...item, qty: 1 }];
      }
      saveToLocalStorage(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotalAmount: updateCartTotalAmount(updatedCartItems).toFixed(2),
      };
    case actionTypes.REMOVE_FROM_CART:
      updatedCartItems = state.cartItems.filter(
        (x) => x.id !== action.payload.id
      );
      saveToLocalStorage(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotalAmount: updateCartTotalAmount(updatedCartItems).toFixed(2),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      if (action.payload.qty === 0) {
        updatedCartItems = state.cartItems.filter(
          (x) => x.id !== action.payload.id
        );
      } else {
        updatedCartItems = state.cartItems.map((x) =>
          x.id === action.payload.id ? { ...x, qty: action.payload.qty } : x
        );
      }
      saveToLocalStorage(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotalAmount: updateCartTotalAmount(updatedCartItems).toFixed(2),
      };
    case actionTypes.CLEAR_CART:
      localStorage.setItem("cartItems", []);
      return {
        cartItems: [],
        cartTotalAmount: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
