import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import PanelType from "../auth/PanelType";
import Adminpanel from "../components/adminpanel";
import {
  setAuthUserUsername,
  setAuthUserPassword,
  setAuthUserId,
  setAuthUserRole,
  setAuthUserName,
  setAuthUserAvatar,
  resetAuthUser
} from "../store/actions/AuthUserActions";
import { connect } from "react-redux";


const ProtectedRoute = (props, { ...rest }) => {

  if (!props.authUserId) {
    return <Navigate to="/login" />;
  }


 const componentToRender =  props.authUserRole === PanelType.Admin ? <Adminpanel /> : <></>;


  return componentToRender;
};
const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer };
};
export default connect(mapStateToProps, {
  setAuthUserUsername,
  setAuthUserPassword,
  setAuthUserId,
  setAuthUserRole,
  setAuthUserName,
  setAuthUserAvatar,
  resetAuthUser
})(ProtectedRoute);
