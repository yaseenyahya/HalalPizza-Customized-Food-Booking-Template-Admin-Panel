export const ADD_EDIT_CATEGORIES_MODAL_TOGGLE = "ADD_EDIT_DESIGNATION_MODAL_TOGGLE";
export const ADD_EDIT_CATEGORIES_MODAL_TYPE = "ADD_EDIT_DESIGNATION_MODAL_TYPE";
export const ADD_EDIT_CATEGORIES_MODAL_ROW_DATA = "ADD_EDIT_DESIGNATION_MODAL_ROW_DATA";
export const ADD_EDIT_CATEGORIES_MODAL_CATEGORY_NAME =
  "ADD_EDIT_CATEGORIES_MODAL_CATEGORY_NAME";
export const ADD_EDIT_CATEGORIES_MODAL_IS_LOADING =
  "ADD_EDIT_DESIGNATION_MODAL_IS_LOADING";
export const ADD_EDIT_CATEGORIES_MODAL_RESET = "ADD_EDIT_DESIGNATION_MODAL_RESET";

export const setAddEditCategoriesModalToggle = (addEditCategoriesModalToggle ) => ({
  type: ADD_EDIT_CATEGORIES_MODAL_TOGGLE,
  payload: { addEditCategoriesModalToggle:addEditCategoriesModalToggle },
});

export const setAddEditCategoriesModalType = (addEditCategoriesModalType) => ({
  type: ADD_EDIT_CATEGORIES_MODAL_TYPE,
  payload: { addEditCategoriesModalType: addEditCategoriesModalType },
});

export const setAddEditCategoriesModalRowData = (addEditCategoriesModalRowData) => ({
  type: ADD_EDIT_CATEGORIES_MODAL_ROW_DATA,
  payload: { addEditCategoriesModalRowData: addEditCategoriesModalRowData },
});

export const setAddEditCategoriesModalCategoryName = (addEditCategoriesModalCategoryName) => ({
  type: ADD_EDIT_CATEGORIES_MODAL_CATEGORY_NAME,
  payload: { addEditCategoriesModalCategoryName: addEditCategoriesModalCategoryName },
});

export const setAddEditCategoriesModalIsLoading = (addEditCategoriesModalIsLoading) => ({
  type: ADD_EDIT_CATEGORIES_MODAL_IS_LOADING,
  payload: { addEditCategoriesModalIsLoading: addEditCategoriesModalIsLoading },
});

export const setAddEditCategoriesModalReset = () => ({
  type: ADD_EDIT_CATEGORIES_MODAL_RESET,
});
