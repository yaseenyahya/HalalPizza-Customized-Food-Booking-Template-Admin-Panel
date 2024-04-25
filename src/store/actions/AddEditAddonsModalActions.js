export const ADD_EDIT_ADDONS_MODAL_TOGGLE = "ADD_EDIT_ADDONS_MODAL_TOGGLE";
export const ADD_EDIT_ADDONS_MODAL_TYPE = "ADD_EDIT_ADDONS_MODAL_TYPE";
export const ADD_EDIT_ADDONS_MODAL_ROW_DATA = "ADD_EDIT_ADDONS_MODAL_ROW_DATA";
export const ADD_EDIT_ADDONS_MODAL_IMAGE_PATH = "ADD_EDIT_ADDONS_MODAL_IMAGE_PATH";
export const ADD_EDIT_ADDONS_MODAL_IMAGE_PATH_FOR_COMPONENT = "ADD_EDIT_ADDONS_MODAL_IMAGE_PATH_FOR_COMPONENT";
export const ADD_EDIT_ADDONS_MODAL_ADDON_PRODUCT_TITLE = "ADD_EDIT_ADDONS_MODAL_ADDON_PRODUCT_TITLE";
export const ADD_EDIT_ADDONS_MODAL_PRODUCT_SALE_PRICE = "ADD_EDIT_ADDONS_MODAL_PRODUCT_DETAILS";
export const ADD_EDIT_ADDONS_MODAL_PRODUCT_PRICE = "ADD_EDIT_ADDONS_MODAL_PRODUCT_PRICE";
export const ADD_EDIT_ADDONS_MODAL_IS_LOADING = "ADD_EDIT_ADDONS_MODAL_IS_LOADING";
export const ADD_EDIT_ADDONS_MODAL_RESET = "ADD_EDIT_ADDONS_MODAL_RESET";

export const setAddEditAddonsModalToggle = (addEditAddonsModalToggle) => ({
  type: ADD_EDIT_ADDONS_MODAL_TOGGLE,
  payload: { addEditAddonsModalToggle: addEditAddonsModalToggle },
});

export const setAddEditAddonsModalType = (addEditAddonsModalType) => ({
  type: ADD_EDIT_ADDONS_MODAL_TYPE,
  payload: { addEditAddonsModalType: addEditAddonsModalType },
});

export const setAddEditAddonsModalRowData = (addEditAddonsModalRowData) => ({
  type: ADD_EDIT_ADDONS_MODAL_ROW_DATA,
  payload: { addEditAddonsModalRowData: addEditAddonsModalRowData },
});

export const setAddEditAddonsModalImagePath = (addEditAddonsModalImagePath) => ({
  type: ADD_EDIT_ADDONS_MODAL_IMAGE_PATH,
  payload: { addEditAddonsModalImagePath: addEditAddonsModalImagePath },
});

export const setAddEditAddonsModalImagePathForComponent = (addEditAddonsModalImagePathForComponent) => ({
  type: ADD_EDIT_ADDONS_MODAL_IMAGE_PATH_FOR_COMPONENT,
  payload: { addEditAddonsModalImagePathForComponent: addEditAddonsModalImagePathForComponent },
});

export const setAddEditAddonsModalAddonProductTitle = (addEditAddonsModalAddonProductTitle) => ({
  type: ADD_EDIT_ADDONS_MODAL_ADDON_PRODUCT_TITLE,
  payload: { addEditAddonsModalAddonProductTitle: addEditAddonsModalAddonProductTitle },
});

export const setAddEditAddonsModalProductSalePrice = (addEditAddonsModalProductSalePrice) => ({
  type: ADD_EDIT_ADDONS_MODAL_PRODUCT_SALE_PRICE,
  payload: { addEditAddonsModalProductSalePrice: addEditAddonsModalProductSalePrice },
});

export const setAddEditAddonsModalProductPrice = (addEditAddonsModalProductPrice) => ({
  type: ADD_EDIT_ADDONS_MODAL_PRODUCT_PRICE,
  payload: { addEditAddonsModalProductPrice: addEditAddonsModalProductPrice },
});

export const setAddEditAddonsModalIsLoading = (addEditAddonsModalIsLoading) => ({
  type: ADD_EDIT_ADDONS_MODAL_IS_LOADING,
  payload: { addEditAddonsModalIsLoading: addEditAddonsModalIsLoading },
});

export const setAddEditAddonsModalReset = () => ({
  type: ADD_EDIT_ADDONS_MODAL_RESET,
});
