import {
  ADD_EDIT_ADDONS_MODAL_TOGGLE,
  ADD_EDIT_ADDONS_MODAL_TYPE,
  ADD_EDIT_ADDONS_MODAL_ROW_DATA,
  ADD_EDIT_ADDONS_MODAL_IMAGE_PATH,
  ADD_EDIT_ADDONS_MODAL_IMAGE_PATH_FOR_COMPONENT,
  ADD_EDIT_ADDONS_MODAL_ADDON_PRODUCT_TITLE,
  ADD_EDIT_ADDONS_MODAL_PRODUCT_SALE_PRICE,
  ADD_EDIT_ADDONS_MODAL_PRODUCT_PRICE,
  ADD_EDIT_ADDONS_MODAL_IS_LOADING,
  ADD_EDIT_ADDONS_MODAL_RESET,
} from '../actions/AddEditAddonsModalActions';

const initialState = {
  addEditAddonsModalToggle: false,
  addEditAddonsModalType: null,
  addEditAddonsModalRowData: null,
  addEditAddonsModalImagePath: "",
  addEditAddonsModalImagePathForComponent: "",
  addEditAddonsModalAddonProductTitle: "",
  addEditAddonsModalProductSalePrice: "",
  addEditAddonsModalProductPrice: 0,
  addEditAddonsModalIsLoading: false,
};

const AddEditAddonsModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_ADDONS_MODAL_TOGGLE:
      return {
        ...state,
        addEditAddonsModalToggle: action.payload.addEditAddonsModalToggle,
      };
    case ADD_EDIT_ADDONS_MODAL_TYPE:
      return {
        ...state,
        addEditAddonsModalType: action.payload.addEditAddonsModalType,
      };
    case ADD_EDIT_ADDONS_MODAL_ROW_DATA:
      return {
        ...state,
        addEditAddonsModalRowData: action.payload.addEditAddonsModalRowData,
      };
    case ADD_EDIT_ADDONS_MODAL_IMAGE_PATH:
      return {
        ...state,
        addEditAddonsModalImagePath: action.payload.addEditAddonsModalImagePath,
      };
    case ADD_EDIT_ADDONS_MODAL_IMAGE_PATH_FOR_COMPONENT:
      return {
        ...state,
        addEditAddonsModalImagePathForComponent: action.payload.addEditAddonsModalImagePathForComponent,
      };
    case ADD_EDIT_ADDONS_MODAL_ADDON_PRODUCT_TITLE:
      return {
        ...state,
        addEditAddonsModalAddonProductTitle: action.payload.addEditAddonsModalAddonProductTitle,
      };
    case ADD_EDIT_ADDONS_MODAL_PRODUCT_SALE_PRICE:
      return {
        ...state,
        addEditAddonsModalProductSalePrice: action.payload.addEditAddonsModalProductSalePrice,
      };
    case ADD_EDIT_ADDONS_MODAL_PRODUCT_PRICE:
      return {
        ...state,
        addEditAddonsModalProductPrice: action.payload.addEditAddonsModalProductPrice,
      };
    case ADD_EDIT_ADDONS_MODAL_IS_LOADING:
      return {
        ...state,
        addEditAddonsModalIsLoading: action.payload.addEditAddonsModalIsLoading,
      };
    case ADD_EDIT_ADDONS_MODAL_RESET:
      return initialState;
    default:
      return state;
  }
};

export default AddEditAddonsModalReducer;
