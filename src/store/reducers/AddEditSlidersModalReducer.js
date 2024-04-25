import {
  ADD_EDIT_SLIDERS_MODAL_TOGGLE,
  ADD_EDIT_SLIDERS_MODAL_TYPE,
  ADD_EDIT_SLIDERS_MODAL_ROW_DATA,
  ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH,
  ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH_FOR_COMPONENT,
  ADD_EDIT_SLIDERS_MODAL_SLIDE_ENABLED,
  ADD_EDIT_SLIDERS_MODAL_LINK,
  ADD_EDIT_SLIDERS_MODAL_IS_LOADING,
  ADD_EDIT_SLIDERS_MODAL_RESET,
} from '../actions/AddEditSlidersModalActions';

const initialState = {
  addEditSlidersModalToggle: false,
  addEditSlidersModalType:null,
  addEditSlidersModalRowData: null,
  addEditSlidersModalImagePath: "",
  addEditSlidersModalImagePathForComponent:"",
  addEditSlidersModalSlideEnabled:1,
  addEditSlidersModalLink: "",
  addEditSlidersModalIsLoading: false,
};

const AddEditSlidersModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_SLIDERS_MODAL_TOGGLE:
      return {
        ...state,
        addEditSlidersModalToggle: action.payload.addEditSlidersModalToggle,
      };
      case ADD_EDIT_SLIDERS_MODAL_TYPE:
        return {
          ...state,
          addEditSlidersModalType: action.payload.addEditSlidersModalType,
        };
    case ADD_EDIT_SLIDERS_MODAL_ROW_DATA:
      return {
        ...state,
        addEditSlidersModalRowData: action.payload.addEditSlidersModalRowData,
      };

    case ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH:
      return {
        ...state,
        addEditSlidersModalImagePath: action.payload.addEditSlidersModalImagePath,
      };
      case ADD_EDIT_SLIDERS_MODAL_IMAGE_PATH_FOR_COMPONENT:
        return {
          ...state,
          addEditSlidersModalImagePathForComponent: action.payload.addEditSlidersModalImagePathForComponent,
        };
      case ADD_EDIT_SLIDERS_MODAL_SLIDE_ENABLED:
        return {
          ...state,
          addEditSlidersModalSlideEnabled: action.payload.addEditSlidersModalSlideEnabled,
        };
    case ADD_EDIT_SLIDERS_MODAL_LINK:
      return {
        ...state,
        addEditSlidersModalLink: action.payload.addEditSlidersModalLink,
      };

    case ADD_EDIT_SLIDERS_MODAL_IS_LOADING:
      return {
        ...state,
        addEditSlidersModalIsLoading: action.payload.addEditSlidersModalIsLoading,
      };

    case ADD_EDIT_SLIDERS_MODAL_RESET:
      return initialState;

    default:
      return state;
  }
};

export default AddEditSlidersModalReducer;
