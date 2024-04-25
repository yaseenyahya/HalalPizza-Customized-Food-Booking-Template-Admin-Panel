export const ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TOGGLE = 'ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TOGGLE';
export const ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_ID = 'ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_ID';
export const ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TITLE_TEXT = 'ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TITLE_TEXT';
export const ADD_EDIT_PRODUCTS_VARIATION_MODAL_TOGGLE = 'ADD_EDIT_PRODUCTS_VARIATION_MODAL_TOGGLE';
export const ADD_EDIT_PRODUCTS_VARIATION_MODAL_ID = 'ADD_EDIT_PRODUCTS_VARIATION_MODAL_ID';
export const ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_NAME = 'ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_NAME';
export const ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_IMAGE = 'ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_IMAGE';
export const ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_PRICE = 'ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_PRICE';
export const ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_SALE_PRICE = 'ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_SALE_PRICE';
export const ADD_EDIT_PRODUCTS_VARIATION_MODAL_RESET = 'ADD_EDIT_PRODUCTS_VARIATION_MODAL_RESET';

export const setAddEditProductsVariationTitleModalToggle = (addEditProductsVariationTitleModalToggle) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TOGGLE,
    payload: { addEditProductsVariationTitleModalToggle: addEditProductsVariationTitleModalToggle },
});
export const setAddEditProductsVariationTitleModalId = (addEditProductsVariationTitleModalId) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_ID,
    payload: { addEditProductsVariationTitleModalId: addEditProductsVariationTitleModalId },
});
export const setAddEditProductsVariationTitleModalTitleText = (addEditProductsVariationTitleModalTitleText) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_TITLE_MODAL_TITLE_TEXT,
    payload: { addEditProductsVariationTitleModalTitleText: addEditProductsVariationTitleModalTitleText },
});

export const setAddEditProductsVariationModalToggle = (addEditProductsVariationModalToggle) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_MODAL_TOGGLE,
    payload: { addEditProductsVariationModalToggle: addEditProductsVariationModalToggle },
});
export const setAddEditProductsVariationModalId = (addEditProductsVariationModalId) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_MODAL_ID,
    payload: { addEditProductsVariationModalId: addEditProductsVariationModalId },
});
export const setAddEditProductsVariationModalItemName = (addEditProductsVariationModalItemName) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_NAME,
    payload: { addEditProductsVariationModalItemName: addEditProductsVariationModalItemName },
});

export const setAddEditProductsVariationModalItemImage = (addEditProductsVariationModalItemImage) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_IMAGE,
    payload: { addEditProductsVariationModalItemImage: addEditProductsVariationModalItemImage },
});
export const setAddEditProductsVariationModalItemProductPrice = (addEditProductsVariationModalItemProductPrice) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_PRICE,
    payload: { addEditProductsVariationModalItemProductPrice: addEditProductsVariationModalItemProductPrice },
});
export const setAddEditProductsVariationModalItemProductSalePrice = (addEditProductsVariationModalItemProductSalePrice) => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_MODAL_ITEM_PRODUCT_SALE_PRICE,
    payload: { addEditProductsVariationModalItemProductSalePrice: addEditProductsVariationModalItemProductSalePrice },
});
export const setAddEditProductsVariationModalReset = () => ({
    type: ADD_EDIT_PRODUCTS_VARIATION_MODAL_RESET,
});
