export const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  ADJUST_ITEM_QTY: "ADJUST_ITEM_QTY",
  CLEAR_CART: "CLEAR_CART",
};

export const addToCart = (product) => ({
  type: actionTypes.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: { id: productId },
});

export const adjustItemQty = (productId, qty) => ({
  type: actionTypes.ADJUST_ITEM_QTY,
  payload: { id: productId, qty },
});

export const clearCart = () => ({
  type: actionTypes.CLEAR_CART,
});
