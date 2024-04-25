import {
  ADD_EDIT_CATEGORIES_MODAL_TOGGLE,
  ADD_EDIT_CATEGORIES_MODAL_TYPE,
  ADD_EDIT_CATEGORIES_MODAL_ROW_DATA,
  ADD_EDIT_CATEGORIES_MODAL_CATEGORY_NAME,
  ADD_EDIT_CATEGORIES_MODAL_IS_LOADING,
  ADD_EDIT_CATEGORIES_MODAL_RESET,
} from '../actions/AddEditCategoriesModalActions';

const initialState = {
  addEditCategoriesModalToggle: false,
  addEditCategoriesModalType: null,
  addEditCategoriesModalRowData: null,
  addEditCategoriesModalCategoryName: "",
  addEditCategoriesModalIsLoading: false,
};

const AddEditCategoriesModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_CATEGORIES_MODAL_TOGGLE:
      return {
        ...state,
        addEditCategoriesModalToggle: action.payload.addEditCategoriesModalToggle,
      };
    case ADD_EDIT_CATEGORIES_MODAL_TYPE:
      return {
        ...state,
        addEditCategoriesModalType: action.payload.addEditCategoriesModalType,
      };
    case ADD_EDIT_CATEGORIES_MODAL_ROW_DATA:
      return {
        ...state,
        addEditCategoriesModalRowData: action.payload.addEditCategoriesModalRowData,
      };
    case ADD_EDIT_CATEGORIES_MODAL_CATEGORY_NAME:
      return {
        ...state,
        addEditCategoriesModalCategoryName: action.payload.addEditCategoriesModalCategoryName,
      };
    case ADD_EDIT_CATEGORIES_MODAL_IS_LOADING:
      return {
        ...state,
        addEditCategoriesModalIsLoading: action.payload.addEditCategoriesModalIsLoading,
      };
    case ADD_EDIT_CATEGORIES_MODAL_RESET:
      return initialState;
    default:
      return state;
  }
};

export default AddEditCategoriesModalReducer;
