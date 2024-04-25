import {
  ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TOGGLE,
  ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_ID,
  ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TITLE_TEXT,
  ADD_EDIT_PRODUCTS_VARIATION_MODAL_TOGGLE,
  ADD_EDIT_PRODUCTS_VARIATION_MODAL_ID,
  ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_NAME,
  ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_IMAGE,
  ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_PRICE,
  ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_SALE_PRICE,
  ADD_EDIT_PRODUCTS_VARIATION_MODAL_RESET,
  // ... other action types you have
} from '../actions/AddEditProductsVariationModalActions';

const initialState = {
  addEditProductsVariationTitleModalToggle: false,
  addEditProductsVariationTitleModalId: null,
  addEditProductsVariationTitleModalTitleText: "",
  addEditProductsVariationModalToggle: false,
  addEditProductsVariationModalId: null,
  addEditProductsVariationModalItemName: "",
  addEditProductsVariationModalItemImage: "",
  addEditProductsVariationModalItemProductPrice:"",
  addEditProductsVariationModalItemProductSalePrice:""
};

const AddEditProductsVariationModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TOGGLE:
      return {
        ...state,
        addEditProductsVariationTitleModalToggle: action.payload.addEditProductsVariationTitleModalToggle,
      };
    case ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_ID:
      return {
        ...state,
        addEditProductsVariationTitleModalId: action.payload.addEditProductsVariationTitleModalId,
      };
    case ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TITLE_TEXT:
      return {
        ...state,
        addEditProductsVariationTitleModalTitleText: action.payload.addEditProductsVariationTitleModalTitleText,
      };
    case ADD_EDIT_PRODUCTS_VARIATION_MODAL_TOGGLE:
      return {
        ...state,
        addEditProductsVariationModalToggle: action.payload.addEditProductsVariationModalToggle,
      };
    case ADD_EDIT_PRODUCTS_VARIATION_MODAL_ID:
      return {
        ...state,
        addEditProductsVariationModalId: action.payload.addEditProductsVariationModalId,
      };
    case ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_NAME:
      return {
        ...state,
        addEditProductsVariationModalItemName: action.payload.addEditProductsVariationModalItemName,
      };
    case ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_IMAGE:
      return {
        ...state,
        addEditProductsVariationModalItemImage: action.payload.addEditProductsVariationModalItemImage,
      };
      case ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_PRICE:
        return {
          ...state,
          addEditProductsVariationModalItemProductPrice: action.payload.addEditProductsVariationModalItemProductPrice,
        };
        case  ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_SALE_PRICE:
          return {
            ...state,
            addEditProductsVariationModalItemProductSalePrice: action.payload.addEditProductsVariationModalItemProductSalePrice,
          };
    case ADD_EDIT_PRODUCTS_VARIATION_MODAL_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default AddEditProductsVariationModalReducer;
