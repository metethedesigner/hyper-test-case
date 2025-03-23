import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";
import { applyMiddleware, createStore } from "redux";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
