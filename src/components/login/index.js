import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { makeStyles } from "@mui/styles";

import ValidationTextField from "../otherComponents/ValidationTextField";
import {
  setLoginUsernameText,
  setLoginPasswordText,
  setLoginIsLoading,
  setLoginRememberMe,
  resetLogin,
} from "../../store/actions/LoginActions";
import {
  setAuthUserUsername,
  setAuthUserId,

  setAuthUserRole,
  setAuthUserName,
  setAuthUserAvatar,
  setAuthUserSettingsJson,
  resetAuthUser

} from "../../store/actions/AuthUserActions";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion/dist/framer-motion";
import { useNavigate } from "react-router-dom";
import PanelType from "../../auth/PanelType";
import LocalStorage from "../../auth/LocalStorage";
import useSwaggerRequest from "../../hooks/useSwaggerHook";

const useStyles = makeStyles((theme) => ({
  animatedBackground: {
    // background: `url('${process.env.PUBLIC_URL}/background.gif')`,

    position: "absolute",
    opacity: "0.2",
    zIndex: -1,
    width: "100%",
  },
  submitButton: {
    fontSize: "17px!important",
    width: "100%",
    color: "#FFFFFF!important",
    marginTop: 3, marginBottom: 2
  },
  container: {
    background: "#ffffffad",
    padding: "0px 10px 0px 10px",
    boxShadow:
      "0px 2px 4px -1px rgb(175 175 175 / 1%), 0px 4px 5px 0px rgb(195 195 195 / 18%), 0px 1px 10px 0px rgb(48 48 48 / 13%)",
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    marginTop: 34,
    height: 40,
  },
  copyrightText: {
    marginTop: "40px !important"
  }
}));

function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={window.location.origin + "/login"}>
        Halal Pizza
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {

    const rememberMeFromLocalStorage = LocalStorage.getRememberMeChecked();

    props.setLoginRememberMe(rememberMeFromLocalStorage);

    if (rememberMeFromLocalStorage) {

      props.setLoginUsernameText(LocalStorage.getRememberUsername());
      props.setLoginPasswordText(LocalStorage.getRememberPassword());

    } else {

      props.setLoginUsernameText("");
      props.setLoginPasswordText("");


    }
  }, []);

  const usernameValidationFieldRef = useRef(null);
  const passwordValidationFieldRef = useRef(null);
  const submitButtonRef = useRef(null);

  const { loading: loginLoading, error: loginError, data: loginDataResult, makeRequest: login } = useSwaggerRequest('/api/users/login');


  useEffect(() => {
    if (loginError) {

      enqueueSnackbar(loginError.message, { variant: "error" });

    }
  }, [loginError]);

  useEffect(() => {
    if (loginDataResult) {


      props.setAuthUserUsername(props.loginUsernameText);
      props.setAuthUserId(loginDataResult.id);
      props.setAuthUserRole(loginDataResult.role);
      props.setAuthUserName(loginDataResult.name);
      props.setAuthUserAvatar(loginDataResult.avatar);

      props.setAuthUserSettingsJson(loginDataResult.settingsJSON);

      LocalStorage.setUsername(props.loginUsernameText);
      LocalStorage.setPassword(props.loginPasswordText);

      if (props.loginRememberMe) {
        LocalStorage.setRememberUsername(props.loginUsernameText);
        LocalStorage.setRememberPassword(props.loginPasswordText);
      }

      // Redirect to appropriate panel
      if (loginDataResult.role === PanelType.Admin) {
        navigate("/adminpanel");
      } else {
        navigate("/userpanel");
      }

      props.resetLogin();
    }
  }, [loginDataResult]);

  const handleSubmit = (event) => {
   
    event.preventDefault();

    let isValid = true;
    if (!usernameValidationFieldRef.current.validateValue()) {
      isValid = false;
    }
    if (!passwordValidationFieldRef.current.validateValue()) {
      isValid = false;
    }

    if (!isValid) return;

    login({
      method: 'POST',
      requestData: {
        username: props.loginUsernameText,
        password: props.loginPasswordText,
      },
    })
  };

  // Handle "Remember Me" checkbox change
  const handleRememberMeChange = (event) => {
    const isChecked = event.target.checked;
    props.setLoginRememberMe(isChecked);

    LocalStorage.setRememberMeChecked(isChecked);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth={"lg"} disableGutters={true}>
        <div className={classes.animatedBackground}></div>
        <Box display={"flex"} minHeight={"100vh"} alignItems={"center"}>
          <Container component="main" className={classes.container} maxWidth="xs">
            <Box display={"flex"} justifyContent={"center"}>
              <img
                src={`${process.env.PUBLIC_URL}/halalpizzalogolarge.png`}
                alt="Logo"
                className={classes.logo}
              />
            </Box>

            <CssBaseline />
            <Box mx={4} my={4} display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
              <Typography
                component="h1"
                fontSize={35}
                fontWeight={"bold"}
                textAlign={"left"}
                variant="h5"
                color={"#777777"}
              >
                Log in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} mt={1}>
                <ValidationTextField
                  onInput={(e) => props.setLoginUsernameText(e.target.value)}
                  value={props.loginUsernameText}
                  ref={usernameValidationFieldRef}
                  disabled={loginLoading}
                  autoFocus={true}
                  tabIndex={0}
                  margin="normal"
                  required
                  InputProps={{
                    classes: {},
                  }}
                  fullWidth
                  id="username"
                  label="Username"
                  name={`username${Math.random()}`}
                  variant="outlined"
                />
                <ValidationTextField
                  onInput={(e) => props.setLoginPasswordText(e.target.value)}
                  value={props.loginPasswordText}
                  disabled={loginLoading}
                  ref={passwordValidationFieldRef}
                  margin="normal"
                  required
                  InputProps={{
                    classes: {},
                  }}
                  tabIndex={1}
                  fullWidth
                  name={`password${Math.random()}`}
                  label="Password"
                  type="password"
                  id="password2"
                />
                <FormControlLabel
                  control={
                    <Switch
                      tabIndex={-1}
                      value="remember"
                      color="primary"
                      checked={props.loginRememberMe}
                      onChange={handleRememberMeChange}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  disabled={loginLoading}
                  ref={submitButtonRef}
                  className={classes.submitButton}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  {loginLoading && <CircularProgress size={25} />}
                  {!loginLoading && "Login"}
                </Button>
                <Copyright className={classes.copyrightText} />
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.LoginReducer };
};

export default connect(mapStateToProps, {
  setLoginUsernameText,
  setLoginPasswordText,
  resetLogin,
  setLoginRememberMe,
  setAuthUserUsername,
  setAuthUserId,

  setAuthUserRole,
  setAuthUserName,
  setAuthUserAvatar,
  setAuthUserSettingsJson,
  resetAuthUser
})(Login);
