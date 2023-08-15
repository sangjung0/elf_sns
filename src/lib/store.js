import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from "./modules";
import { createLogger } from 'redux-logger';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = configureStore ({
    reducer:rootReducer,
    middleware:[logger, sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;