import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import addProductFormReducer from './addProductReducer';


const rootReducer = combineReducers({
    products: productsReducer,
    addProductForm: addProductFormReducer,
  });
  
  export default rootReducer;
