export const ADD_EDIT_SLIDERS_MODAL_TOGGLE = "ADD_EDIT_SLIDERS_MODAL_TOGGLE";
export const ADD_EDIT_SLIDERS_MODAL_TYPE = "ADD_EDIT_SLIDERS_MODAL_TYPE";
export const ADD_EDIT_SLIDERS_MODAL_ROW_DATA = "ADD_EDIT_SLIDERS_MODAL_ROW_DATA";
export const ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH = "ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH";
export const ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH_FOR_COMPONENT = "ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH_FOR_COMPONENT";
export const ADD_EDIT_SLIDERS_MODAL_SLIDE_ENABLED = "ADD_EDIT_SLIDERS_MODAL_SLIDE_ENABLED";
export const ADD_EDIT_SLIDERS_MODAL_LINK = "ADD_EDIT_SLIDERS_MODAL_LINK";
export const ADD_EDIT_SLIDERS_MODAL_IS_LOADING = "ADD_EDIT_SLIDERS_MODAL_IS_LOADING";
export const ADD_EDIT_SLIDERS_MODAL_RESET = "ADD_EDIT_SLIDERS_MODAL_RESET";

export const setAddEditSlidersModalToggle = (addEditSlidersModalToggle) => ({
  type: ADD_EDIT_SLIDERS_MODAL_TOGGLE,
  payload: { addEditSlidersModalToggle: addEditSlidersModalToggle },
});

export const setAddEditSlidersModalType = (addEditSlidersModalType) => ({
  type: ADD_EDIT_SLIDERS_MODAL_TYPE,
  payload: { addEditSlidersModalType: addEditSlidersModalType },
});

export const setAddEditSlidersModalRowData = (addEditSlidersModalRowData) => ({
  type: ADD_EDIT_SLIDERS_MODAL_ROW_DATA,
  payload: { addEditSlidersModalRowData: addEditSlidersModalRowData },
});

export const setAddEditSlidersModalImagePath = (addEditSlidersModalImagePath) => ({
  type: ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH,
  payload: { addEditSlidersModalImagePath: addEditSlidersModalImagePath },
});
export const setAddEditSlidersModalImagePathForComponent = (addEditSlidersModalImagePathForComponent) => ({
  type: ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH_FOR_COMPONENT,
  payload: { addEditSlidersModalImagePathForComponent: addEditSlidersModalImagePathForComponent },
});
export const setAddEditSlidersModalSlideEnabled = (addEditSlidersModalSlideEnabled) => ({
  type: ADD_EDIT_SLIDERS_MODAL_SLIDE_ENABLED,
  payload: { addEditSlidersModalSlideEnabled: addEditSlidersModalSlideEnabled },
});

export const setAddEditSlidersModalLink = (addEditSlidersModalLink) => ({
  type: ADD_EDIT_SLIDERS_MODAL_LINK,
  payload: { addEditSlidersModalLink: addEditSlidersModalLink },
});

export const setAddEditSlidersModalIsLoading = (addEditSlidersModalIsLoading) => ({
  type: ADD_EDIT_SLIDERS_MODAL_IS_LOADING,
  payload: { addEditSlidersModalIsLoading: addEditSlidersModalIsLoading },
});

export const setAddEditSlidersModalReset = () => ({
  type: ADD_EDIT_SLIDERS_MODAL_RESET,
});
