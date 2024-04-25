export const PROFILE_PICTURE_MENU_ANCHOR_EL = "PROFILE_PICTURE_MENU_ANCHOR_EL";
export const DRAWER_TOGGLE = "DRAWER_TOGGLE";
export const APP_BAR_HEIGHT = "APP_BAR_HEIGHT";
export const WINDOW_HEIGHT = "WINDOW_HEIGHT";
export const CONFIG_DATA = "CONFIG_DATA";

export const setProfilePictureMenuAnchorEl = (profilePictureMenuAnchorEl) => {
  return {
    type: PROFILE_PICTURE_MENU_ANCHOR_EL,
    payload: { profilePictureMenuAnchorEl: profilePictureMenuAnchorEl },
  };
};
export const setAppBarHeight = (appBarHeight) => {
  return {
    type: APP_BAR_HEIGHT,
    payload: { appBarHeight: appBarHeight },
  };
};
export const setDrawerToggle = (drawerToggle) => {
    return {
      type: DRAWER_TOGGLE,
      payload: { drawerToggle: drawerToggle },
    };
  };
  export const setWindowHeight = (windowHeight) => {
    return {
      type: WINDOW_HEIGHT,
      payload: { windowHeight: windowHeight },
    };
  };

 

  export const setConfigData = (configData) => {
    return {
      type: CONFIG_DATA,
      payload: { configData: configData },
    };
  };