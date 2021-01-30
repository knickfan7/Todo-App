import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers/';

// Redux Thunk lets you write action creators that returns function instead of action. Not always needed.
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;
