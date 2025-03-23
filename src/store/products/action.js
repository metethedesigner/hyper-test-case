export const actionTypes = {
  GET_PRODUCTS_REQUEST: "GET_PRODUCTS_REQUEST",
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_FAILURE: "GET_PRODUCTS_FAILURE",

  SET_FILTERED_AND_SORTED_PRODUCTS: "SET_FILTERED_AND_SORTED_PRODUCTS",
  UPDATE_FILTERS_AND_SORT: "UPDATE_FILTERS_AND_SORT",
  RESET_PRODUCTS_TO_ORIGINAL: "RESET_PRODUCTS_TO_ORIGINAL",
};

export const getProductsRequest = () => ({
  type: actionTypes.GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (products) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsFailure = (error) => ({
  type: actionTypes.GET_PRODUCTS_FAILURE,
  payload: error,
});

export const setFilteredAndSortedProducts = (products) => ({
  type: actionTypes.SET_FILTERED_AND_SORTED_PRODUCTS,
  payload: products,
});

export const updateFiltersAndSort = (newFilters) => ({
  type: actionTypes.UPDATE_FILTERS_AND_SORT,
  payload: newFilters,
});
export const resetProductsToOriginal = () => ({
  type: actionTypes.RESET_PRODUCTS_TO_ORIGINAL,
});
