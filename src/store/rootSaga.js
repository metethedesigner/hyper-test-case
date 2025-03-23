import { all } from "redux-saga/effects";
import ProductsSaga from "./products/saga";

export default function* rootSaga() {
  yield all([ProductsSaga()]);
}
