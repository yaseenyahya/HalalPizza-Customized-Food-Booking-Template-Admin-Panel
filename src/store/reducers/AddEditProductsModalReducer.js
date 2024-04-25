import {
  ADD_EDIT_PRODUCTS_MODAL_TOGGLE,
  ADD_EDIT_PRODUCTS_MODAL_TYPE,
  ADD_EDIT_PRODUCTS_MODAL_ROW_DATA,
  ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH,
  ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH_FOR_COMPONENT,
  ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH,
  ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH_FOR_COMPONENT,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_CATEGORY_ID,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_TITLE,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DETAILS,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_PRICE,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_SALE_PRICE,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_TITLE,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_DATA,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_OTHER_SELECTIONS_SERIALIZED_DATA,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_STATUS_ENABLED,
  ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DEAL_STATUS,
  ADD_EDIT_PRODUCTS_MODAL_IS_LOADING,
  ADD_EDIT_PRODUCTS_MODAL_RESET,
} from '../actions/AddEditProductsModalActions';

const initialState = {
  addEditProductsModalToggle: false,
  addEditProductsModalType: null,
  addEditProductsModalRowData: null,
  addEditProductsModalImagePath: "",
  addEditProductsModalImagePathForComponent: "",
  addEditProductsModalDetailsImagePath:"",
  addEditProductsModalDetailsImagePathForComponent:"",
  addEditProductsModalProductCategoryId: null,
  addEditProductsModalProductTitle: "",
  addEditProductsModalProductDetails: "",
  addEditProductsModalProductPrice: 0,
  addEditProductsModalProductSalePrice: 0,
  addEditProductsModalProductVariationTitle:"",
  addEditProductsModalProductVariationData: null,
  addEditProductsModalProductOtherSelectionsSerializedData:null,
  addEditProductsModalProductStatusEnabled:1,
  addEditProductsModalProductDealStatus:1,
  addEditProductsModalIsLoading: false,
};

const AddEditProductsModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_PRODUCTS_MODAL_TOGGLE:
      return {
        ...state,
        addEditProductsModalToggle: action.payload.addEditProductsModalToggle,
      };
    case ADD_EDIT_PRODUCTS_MODAL_TYPE:
      return {
        ...state,
        addEditProductsModalType: action.payload.addEditProductsModalType,
      };
    case ADD_EDIT_PRODUCTS_MODAL_ROW_DATA:
      return {
        ...state,
        addEditProductsModalRowData: action.payload.addEditProductsModalRowData,
      };
    case ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH:
      return {
        ...state,
        addEditProductsModalImagePath: action.payload.addEditProductsModalImagePath,
      };
    case ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH_FOR_COMPONENT:
      return {
        ...state,
        addEditProductsModalImagePathForComponent: action.payload.addEditProductsModalImagePathForComponent,
      };
      case ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH:
        return {
          ...state,
          addEditProductsModalDetailsImagePath: action.payload.addEditProductsModalDetailsImagePath,
        };
      case ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH_FOR_COMPONENT:
        return {
          ...state,
          addEditProductsModalDetailsImagePathForComponent: action.payload.addEditProductsModalDetailsImagePathForComponent,
        };
    case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_CATEGORY_ID:
      return {
        ...state,
        addEditProductsModalProductCategoryId: action.payload.addEditProductsModalProductCategoryId,
      };
    case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_TITLE:
      return {
        ...state,
        addEditProductsModalProductTitle: action.payload.addEditProductsModalProductTitle,
      };
    case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DETAILS:
      return {
        ...state,
        addEditProductsModalProductDetails: action.payload.addEditProductsModalProductDetails,
      };
    case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_PRICE:
      return {
        ...state,
        addEditProductsModalProductPrice: action.payload.addEditProductsModalProductPrice,
      };
    case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_SALE_PRICE:
      return {
        ...state,
        addEditProductsModalProductSalePrice: action.payload.addEditProductsModalProductSalePrice,
      };
      case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_TITLE:
        return {
          ...state,
          addEditProductsModalProductVariationTitle: action.payload.addEditProductsModalProductVariationTitle,
        };
    case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_DATA:
      return {
        ...state,
        addEditProductsModalProductVariationData: action.payload.addEditProductsModalProductVariationData,
      };

    case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_OTHER_SELECTIONS_SERIALIZED_DATA:
      return {
        ...state,
        addEditProductsModalProductOtherSelectionsSerializedData: action.payload.addEditProductsModalProductOtherSelectionsSerializedData,
      };
      case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_STATUS_ENABLED:
        return {
          ...state,
          addEditProductsModalProductStatusEnabled: action.payload.addEditProductsModalProductStatusEnabled,
        };
        case ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DEAL_STATUS:
        return {
          ...state,
          addEditProductsModalProductDealStatus: action.payload.addEditProductsModalProductDealStatus,
        };
    case ADD_EDIT_PRODUCTS_MODAL_IS_LOADING:
      return {
        ...state,
        addEditProductsModalIsLoading: action.payload.addEditProductsModalIsLoading,
      };
    case ADD_EDIT_PRODUCTS_MODAL_RESET:
      return initialState;
    default:
      return state;
  }
};

export default AddEditProductsModalReducer;
