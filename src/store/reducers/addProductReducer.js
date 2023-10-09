const initialState = {
    name: '',
    price: '',
    SKU: '',
    type: '',
    attributes: [],
  };

const addProductFormReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FORM_FIELD':
        const { fieldName, fieldValue } = action.payload;
        return {
          ...state,
          [fieldName]: fieldValue,
        };
      case 'RESET_FORM':
        return initialState;
      case 'ADD_PRODUCT':
          const newProduct = action.payload;
          return {
            ...state,
            products: [...state.products, newProduct],
          };
      default:
        return state;
    }
  };
  
  export default addProductFormReducer;