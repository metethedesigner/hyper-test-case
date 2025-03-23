import { put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  getProductsFailure,
  getProductsSuccess,
  setFilteredAndSortedProducts,
} from "./action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseApi from "../../API/api";

function* getProductsSaga() {
  try {
    const response = yield baseApi.get(`/products`);

    yield put(getProductsSuccess(response.data));
  } catch (error) {
    yield put(getProductsFailure(error));
  }
}

function* handleFiltersAndSortSaga(action) {
  try {
    const { originalProducts, filters } = yield select((state) => state.products);
    // Yeni gelen filtreleri mevcut filtrelerle merge ediyoruz
    const mergedFilters = { ...filters, ...action.payload };
    const { searchQuery, sortBy, selectedCategories } = mergedFilters;

    let result = [...originalProducts];

    // Arama filtresi
    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Kategori filtresi
    if (selectedCategories && selectedCategories.length > 0) {
      const normalized = selectedCategories.map((cat) =>
        cat.trim().toLowerCase()
      );
      result = result.filter((product) =>
        normalized.includes(product.category.trim().toLowerCase())
      );
    }

    // Sıralama filtresi
    if (sortBy) {
      switch (sortBy) {
        case "price-low-to-high":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-high-to-low":
          result.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    yield put(setFilteredAndSortedProducts(result));
  } catch (error) {
    yield put(getProductsFailure(error.toString()));
    toast.error("Filter and Sort failed!");
  }
}





function* resetProductsSaga() {
  // originalProducts state'sinde tuttuğum veriyi çekiyorum
  const originalProducts = yield select(
    (state) => state.products.originalProducts
  );

  console.log(originalProducts);
  // originalProducts verisiyle products listesini güncelliyorum
  yield put(getProductsSuccess(originalProducts));
}

export default function* productsSaga() {
  yield takeEvery(actionTypes.GET_PRODUCTS_REQUEST, getProductsSaga);
  yield takeEvery(
    actionTypes.UPDATE_FILTERS_AND_SORT,
    handleFiltersAndSortSaga
  );
  yield takeEvery(actionTypes.RESET_PRODUCTS_TO_ORIGINAL, resetProductsSaga);
}
