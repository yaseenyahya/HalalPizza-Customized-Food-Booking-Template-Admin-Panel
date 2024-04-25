import {
    PROFILE_PICTURE_MENU_ANCHOR_EL,
    APP_BAR_HEIGHT,
    WINDOW_HEIGHT,
    DRAWER_TOGGLE,
    CONFIG_DATA
} from '../actions/OtherActions';

const initialState = {
    profilePictureMenuAnchorEl: null,
    drawerToggle: false,
    appBarHeight:60,
    windowHeight:0,
   
    configData:null
};

const OtherReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_PICTURE_MENU_ANCHOR_EL:
            return {
                ...state,
                profilePictureMenuAnchorEl: action.payload.profilePictureMenuAnchorEl
            };
            case APP_BAR_HEIGHT:
                return {
                    ...state,
                    appBarHeight: action.payload.appBarHeight
                };
                case   WINDOW_HEIGHT:  
                return {
                    ...state,
                    windowHeight: action.payload.windowHeight
                };
        case DRAWER_TOGGLE:
            return {
                ...state,
                drawerToggle: action.payload.drawerToggle
            };
          
                    case CONFIG_DATA:
                        return{
                            ...state,
                            configData: action.payload.configData
                        }
            default:
                return state;
    }
};

export default OtherReducer;
