export const ADD_EDIT_PRODUCTS_MODAL_TOGGLE = "ADD_EDIT_PRODUCTS_MODAL_TOGGLE";
export const ADD_EDIT_PRODUCTS_MODAL_TYPE = "ADD_EDIT_PRODUCTS_MODAL_TYPE";
export const ADD_EDIT_PRODUCTS_MODAL_ROW_DATA = "ADD_EDIT_PRODUCTS_MODAL_ROW_DATA";
export const ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH = "ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH";
export const ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH_FOR_COMPONENT = "ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH_FOR_COMPONENT";
export const ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH_FOR_COMPONENT = "ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH_FOR_COMPONENT";
export const ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH = "ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_CATEGORY_ID = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_CATEGORY_ID";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_TITLE = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_TITLE";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DETAILS = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DETAILS";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_PRICE = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_PRICE";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_SALE_PRICE = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_SALE_PRICE";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_TITLE = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_TITLE";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_DATA = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_OTHER_VARIATION_DATA";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_OTHER_SELECTIONS_SERIALIZED_DATA = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_OTHER_SELECTIONS_SERIALIZED_DATA";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_STATUS_ENABLED = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_STATUS_ENABLED";
export const ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DEAL_STATUS = "ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DEAL_STATUS";
export const ADD_EDIT_PRODUCTS_MODAL_IS_LOADING = "ADD_EDIT_PRODUCTS_MODAL_IS_LOADING";
export const ADD_EDIT_PRODUCTS_MODAL_RESET = "ADD_EDIT_PRODUCTS_MODAL_RESET";

export const setAddEditProductsModalToggle = (addEditProductsModalToggle) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_TOGGLE,
  payload: { addEditProductsModalToggle:addEditProductsModalToggle },
});

export const setAddEditProductsModalType = (addEditProductsModalType) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_TYPE,
  payload: { addEditProductsModalType:addEditProductsModalType },
});

export const setAddEditProductsModalRowData = (addEditProductsModalRowData) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_ROW_DATA,
  payload: { addEditProductsModalRowData:addEditProductsModalRowData },
});

export const setAddEditProductsModalImagePath = (addEditProductsModalImagePath) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH,
  payload: { addEditProductsModalImagePath:addEditProductsModalImagePath },
});

export const setAddEditProductsModalImagePathForComponent = (addEditProductsModalImagePathForComponent) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_IMAGE_PATH_FOR_COMPONENT,
  payload: { addEditProductsModalImagePathForComponent:addEditProductsModalImagePathForComponent },
});
export const setAddEditProductsModalDetailsImagePath = (addEditProductsModalDetailsImagePath) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH,
  payload: { addEditProductsModalDetailsImagePath:addEditProductsModalDetailsImagePath },
});

export const setAddEditProductsModalDetailsImagePathForComponent = (addEditProductsModalDetailsImagePathForComponent) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_DETAILS_IMAGE_PATH_FOR_COMPONENT,
  payload: { addEditProductsModalDetailsImagePathForComponent:addEditProductsModalDetailsImagePathForComponent },
});
export const setAddEditProductsModalProductCategoryId = (addEditProductsModalProductCategoryId) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_CATEGORY_ID,
  payload: { addEditProductsModalProductCategoryId:addEditProductsModalProductCategoryId },
});

export const setAddEditProductsModalProductTitle = (addEditProductsModalProductTitle) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_TITLE,
  payload: { addEditProductsModalProductTitle:addEditProductsModalProductTitle },
});

export const setAddEditProductsModalProductDetails = (addEditProductsModalProductDetails) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DETAILS,
  payload: { addEditProductsModalProductDetails:addEditProductsModalProductDetails },
});

export const setAddEditProductsModalProductPrice = (addEditProductsModalProductPrice) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_PRICE,
  payload: { addEditProductsModalProductPrice:addEditProductsModalProductPrice },
});

export const setAddEditProductsModalProductSalePrice = (addEditProductsModalProductSalePrice) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_SALE_PRICE,
  payload: { addEditProductsModalProductSalePrice:addEditProductsModalProductSalePrice },
});
export const setAddEditProductsModalProductVariationTitle = (addEditProductsModalProductVariationTitle) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_TITLE,
  payload: { addEditProductsModalProductVariationTitle:addEditProductsModalProductVariationTitle },
});
export const setAddEditProductsModalProductVariationData = (addEditProductsModalProductVariationData) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_VARIATION_DATA,
  payload: { addEditProductsModalProductVariationData:addEditProductsModalProductVariationData },
});

export const setAddEditProductsModalProductOtherSelectionsSerializedData = (addEditProductsModalProductOtherSelectionsSerializedData) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_OTHER_SELECTIONS_SERIALIZED_DATA,
  payload: { addEditProductsModalProductOtherSelectionsSerializedData:addEditProductsModalProductOtherSelectionsSerializedData },
});
export const setAddEditProductsModalProductStatusEnabled = (addEditProductsModalProductStatusEnabled) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_STATUS_ENABLED,
  payload: { addEditProductsModalProductStatusEnabled:addEditProductsModalProductStatusEnabled },
});
export const setAddEditProductsModalProductDealStatus = (addEditProductsModalProductDealStatus) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_PRODUCT_DEAL_STATUS,
  payload: { addEditProductsModalProductDealStatus:addEditProductsModalProductDealStatus },
});
export const setAddEditProductsModalIsLoading = (addEditProductsModalIsLoading) => ({
  type: ADD_EDIT_PRODUCTS_MODAL_IS_LOADING,
  payload: { addEditProductsModalIsLoading:addEditProductsModalIsLoading },
});

export const setAddEditProductsModalReset = () => ({
  type: ADD_EDIT_PRODUCTS_MODAL_RESET,
});
