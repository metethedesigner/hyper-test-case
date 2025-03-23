import { actionTypes } from "./action";

const initialState = {
  loading: false,
  error: null,
  products: [],
  originalProducts: [],
  filteredAndSortedProducts: [],
  filters: {
    searchQuery: "",
    sortBy: null,
    selectedCategories: [],
  },
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    //PRODUCTS REDUCERS
    case actionTypes.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        originalProducts: action.payload,
      };
    case actionTypes.SET_FILTERED_AND_SORTED_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case actionTypes.UPDATE_FILTERS_AND_SORT:
        return {
          ...state,
          filters: { ...state.filters, ...action.payload },
        };
    case actionTypes.RESET_PRODUCTS_TO_ORIGINAL:
      return { ...state, products: [...state.originalProducts] };
    default:
      return state;
  }
};

export default productsReducer;
