import React, { useEffect, useRef } from "react";
import {
    Dialog,
    Button,
    DialogContent,
    DialogActions,
    Typography,
    DialogTitle,
    CircularProgress,
    IconButton,
    Container,
    Grid,
    Avatar,
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import ValidationTextField from "../otherComponents/ValidationTextField";

import {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
} from "../../store/actions/CropImageModalActions";
import {
    setAuthUserUsername,
    setAuthUserPassword,
    setAuthUserName,
    setAuthUserAvatar,
    resetAuthUser
} from "../../store/actions/AuthUserActions";
import {
    setEditProfileModalToggle,
    setEditProfileModalAvatar,
    setEditProfileModalName,
    setEditProfileModalEmail,
    setEditProfileModalUsername,
    setEditProfileModalCountryRegion,
    setEditProfileModalContactNumber,
    setEditProfileModalCurrentPassword,
    setEditProfileModalNewPassword,
    setEditProfileModalReset
} from "../../store/actions/EditProfileModalActions";
import ImageCropper from "./ImageCropper";
import { useSnackbar } from "notistack";
import ValidationMobileField from "../otherComponents/ValidationMobileField";
import clsx from "clsx";
import { PhoneNumberUtil } from 'google-libphonenumber';
import useSwaggerRequest from "../../hooks/useSwaggerHook";
const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: "absolute!important",
        right: 5,
        top: 6,
        color: "white!important",
    },
    textField: {
        width: "100%",
    },
    dialogTitle: {
        background: "#505050",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "10px!important",
        paddingBottom: "10px!important",
    },
    dialogTitleText: {
        color: "white",
    },
    dialogActions: {
        padding: 0,
    },
    submitButtonContainer:{
        display: "flex!important",
        alignItems: "center"
   
    },
    submitButton: {
        fontSize: 17,
        width: "200px",
        borderRadius: 0,
        margin: "auto!important",
        color: "white!important"
    },
    profilePicAddButton: {
        border: "1px dashed gray",
        borderRadius: "50%",
        padding: "0px!important",
        margin: "auto",
        display: "block",
    },
    profilePicAddButtonContainer: {
        display: "flex!important"
    },
    profilePictureAddImage: {
        width: "100px",
        borderRadius: "50%",
        height: "100px",
        marginRight: 5,
    },
    dialogContent: {
        minWidth: 220,
    },
    newPasswordTextField: {
        background: "#e3ffe5",
    },
    avatar: {
        width: "55px!important",
        height: "55px!important",
        marginRight: "7px"
    }
}));

const ProfileEditModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const nameValidationFieldRef = useRef(null);
    const emailValidationFieldRef = useRef(null);
    const mobileValidationFieldRef = useRef(null);
    const usernameValidationFieldRef = useRef(null);
    const currentPasswordValidationFieldRef = useRef(null);
    const newPasswordValidationFieldRef = useRef(null);

    const profilePicAddButtonRef = useRef(null);
    const handleClose = () => {
        props.setEditProfileModalToggle();
        props.setEditProfileModalReset();
    };

    const { loading: getUserLoading, error: getUserError, data: getUserResult, makeRequest: getUser } = useSwaggerRequest(`/api/users/${props.authUserId}`);

    useEffect(() => {
        if (props.editProfileModalToggle) {

            getUser({
                method: 'GET',
                
            }      
            );
        }
    }, []);

    useEffect(() => {
        if (getUserResult) {

            props.setEditProfileModalName(getUserResult.name);
            props.setEditProfileModalAvatar(getUserResult.avatar);
            props.setEditProfileModalEmail(getUserResult.email);

            const countryCode = getUserResult.countryCode || "";
            const contactNumber = getUserResult.mobileNumber || "";
            const defaultCountryCode = "+92";

            const formattedContactNumber = (countryCode.toString() + contactNumber) || defaultCountryCode;

            props.setEditProfileModalContactNumber(formattedContactNumber)
            props.setEditProfileModalUsername(getUserResult.username);
        }
    }, [getUserResult]);

    const { loading: editUserLoading, error: editUserError,data: editUserResult, makeRequest: editUser } = useSwaggerRequest(`/api/users/editme/${props.authUserId}`);

    useEffect(() => {
        if (editUserError) {
           
                enqueueSnackbar(editUserError.message, { variant: "error" });
        
        }
    }, [editUserError]);

    useEffect(() => {
        if (editUserResult) {
           
                enqueueSnackbar("User updated successfully.", { variant: "success" });

                handleClose();

                props.setAuthUserName(props.editProfileModalUsername);
                props.setAuthUserAvatar(props.editProfileModalAvatar);
                props.setAuthUserUsername(props.editProfileModalUsername);

                if(props.editProfileModalNewPassword.length > 0)
                props.setAuthUserPassword(props.editProfileModalNewPassword);
           
        }
    }, [editUserResult]);

    let isLoading = editUserLoading || getUserLoading;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        let isValid = true;

        if (!nameValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!emailValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!mobileValidationFieldRef.current.validatePhoneNumber()) {
            isValid = false;
        }
        if (!usernameValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!currentPasswordValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!newPasswordValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        const phoneUtil = PhoneNumberUtil.getInstance();

        // Replace 'pk' with the ISO 3166-1 alpha-2 country code of your choice
        const country = props.editProfileModalCountryRegion;


        const countryCode = phoneUtil.getCountryCodeForRegion(country);

        // Prepend '+' to the dial code
        const formattedDialCode = `+${countryCode}`;

        const phoneWithoutCode = props.editProfileModalContactNumber.replace(/\s/g, '').replace(formattedDialCode, '');

        if (isValid) {
            try {
                await editUser({
                    method: 'PUT',
                    requestData: {
                        id: props.authUserId,
                        name: props.editProfileModalName,
                        avatar: props.editProfileModalAvatar,
                        email: props.editProfileModalEmail,
                        username: props.editProfileModalUsername,
                        countryCode: phoneWithoutCode.length > 0 ? formattedDialCode : undefined,
                        mobileNumber: phoneWithoutCode.length > 0 ? phoneWithoutCode : undefined,
                        password: props.editProfileModalCurrentPassword,
                        newPassword: props.editProfileModalNewPassword.length > 0 ? props.editProfileModalNewPassword : undefined,

                    },
                });
            } catch (e) {

            }
        }
    };

    return (
        <Dialog

            aria-labelledby="customized-dialog-title"
            open={props.editProfileModalToggle}
            onClose={handleClose}

        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    Edit Profile
                </Typography>

                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Container disableGutters={true} className={classes.profilePicAddButtonContainer}>
                                <input
                                    onChange={(event) => {
                                        if (event.target.files.length > 0) {
                                            let reader = new FileReader();
                                            reader.readAsDataURL(event.target.files[0]);
                                            reader.onload = function () {
                                                props.setCropImageModalImage(reader.result);
                                                props.setCropImageModalToggle(true);
                                            };
                                            reader.onerror = function (error) {
                                                alert("Error: ", error);
                                            };
                                        }
                                    }}
                                    ref={profilePicAddButtonRef}
                                    accept="image/*"
                                    disabled={isLoading}
                                    className={classes.profilePicAddButton}
                                    style={{ display: "none" }}
                                    id="raised-button-file"
                                    name="raised-button-file"
                                    multiple={false}
                                    type="file"
                                />

                                <Button
                                    onClick={() => {
                                        profilePicAddButtonRef.current.click();
                                    }}
                                    className={classes.profilePicAddButton}
                                >
                                    <Avatar
                                        className={classes.avatar}
                                        alt="User Avatar"
                                        src={props.editProfileModalAvatar ? props.editProfileModalAvatar : null}
                                    />
                                </Button>
                                <ImageCropper
                                    onImageCropCompleted={(croppedImage) => {

                                        props.setEditProfileModalAvatar(croppedImage);
                                    }}
                                />

                                <ValidationTextField
                                    type="text"
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {},
                                    }}
                                    ref={nameValidationFieldRef}
                                    value={props.editProfileModalName}
                                    required
                                    disabled={isLoading}
                                    onInput={(e) =>
                                        props.setEditProfileModalName(e.target.value)
                                    }
                                    label="Full Name"
                                    variant="outlined"
                                />
                            </Container>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="text"
                                emailtext={true}
                                className={classes.textField}
                                value={props.editProfileModalEmail}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={emailValidationFieldRef}
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setEditProfileModalEmail(e.target.value)
                                }
                                label="Email"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationMobileField
                                value={props.editProfileModalContactNumber}
                                refProp={mobileValidationFieldRef}
                                disabled={isLoading}
                                onChange={(value) => {
                                    props.setEditProfileModalCountryRegion(value.country);
                                    props.setEditProfileModalContactNumber(value.phone);
                                }
                                }
                                className={classes.textField}
                                id="mobileTextField"
                                label="Mobile"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                value={props.editProfileModalUsername}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={usernameValidationFieldRef}
                                required
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setEditProfileModalUsername(e.target.value)
                                }
                                label="Username"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="currentpassword"
                                className={classes.textField}
                                value={props.editProfileModalCurrentPassword}
                                ref={currentPasswordValidationFieldRef}
                                InputProps={{
                                    classes: {},
                                }}
                                required
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setEditProfileModalCurrentPassword(
                                        e.target.value
                                    )
                                }
                                label={"Current Password"}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="newpassword"
                                className={clsx(classes.textField, classes.newPasswordTextField)}
                                value={props.editProfileModalNewPassword}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={newPasswordValidationFieldRef}

                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setEditProfileModalNewPassword(e.target.value)
                                }
                                label={"New Password"}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions disableSpacing={true} className={classes.dialogActions}>
                <Container disableGutters={true} className={classes.submitButtonContainer}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        className={classes.submitButton}
                    >
                        {isLoading && <CircularProgress size={25} />}
                        {!isLoading && "Save"}
                    </Button>
                </Container>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return { ...state.EditProfileModalReducer, ...state.AuthUserReducer };
};

export default connect(mapStateToProps, {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
    setEditProfileModalToggle,
    setEditProfileModalAvatar,
    setEditProfileModalName,
    setEditProfileModalEmail,
    setEditProfileModalUsername,
    setEditProfileModalCountryRegion,
    setEditProfileModalContactNumber,
    setEditProfileModalCurrentPassword,
    setEditProfileModalNewPassword,
    setEditProfileModalReset,
    setAuthUserUsername,
    setAuthUserPassword,
    setAuthUserName,
    setAuthUserAvatar,
    resetAuthUser
})(ProfileEditModal);
