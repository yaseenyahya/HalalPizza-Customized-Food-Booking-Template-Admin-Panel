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
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import ValidationTextField from "../../otherComponents/ValidationTextField";

import {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
} from "../../../store/actions/CropImageModalActions";

import {
    setAddEditSlidersModalToggle,
    setAddEditSlidersModalType,
    setAddEditSlidersModalRowData,
    setAddEditSlidersModalImagePath,
    setAddEditSlidersModalImagePathForComponent,
    setAddEditSlidersModalSlideEnabled,
    setAddEditSlidersModalLink,
    setAddEditSlidersModalIsLoading,
    setAddEditSlidersModalReset
} from "../../../store/actions/AddEditSlidersModalActions";
import { useSnackbar } from "notistack";
import useSwaggerRequest from "../../../hooks/useSwaggerHook";
import ValidationSelectField from "../../otherComponents/ValidationSelectField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
    submitButton: {
        fontSize: 17,
        width: "200px",
        borderRadius: 0,
        margin: "auto!important",
        color: "white!important",
    },

    dialogContent: {
        minWidth: 220,
    },

    checkboxLabel: {

    },
    submitButtonContainer: {
        display: "flex!important",
        alignItems: "center"

    },
    sliderImageAddButton: {
        border: "1px dashed gray",

        padding: "0px!important",
        margin: "auto",
        display: "block",
        width: "100%",
    },
    sliderImageAddButtonIcon: {
        width: "150px!important",
        height: "150px!important",
        color: "gray"
    },
    sliderImageAddButtonImage: {

        height: "150px!important",
        width: "auto"
    }
}));

const AddEditSlidersModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const url = `${props.configData.backend_domain}${props.configData.backend_port !== '' ? ':' + props.configData.backend_port : ''}`;

    const addPicButtonRef = useRef(null);


    const linkValidationFieldRef = useRef(null);
    const enabledValidationFieldRef = useRef(null);

    const handleClose = () => {

        props.setAddEditSlidersModalReset();
    };

    useEffect( () => {
     
        if (props.modalType === "Edit") {
          
            if (props.addEditSlidersModalRowData) {
                fillDataForEdit()
            }
        }
    }, []);

const fillDataForEdit = async()=>{
  
    const response = await fetch(`${url}/api/image/${props.addEditSlidersModalRowData.path}`);
    const arrayBuffer = await response.arrayBuffer();


    const blob = new Blob([arrayBuffer]);


    const simulatedFile = new File([blob], props.addEditSlidersModalRowData.path, {
        lastModified: new Date().getTime(),
        type: 'image/png',
    });
  

    props.setAddEditSlidersModalImagePathForComponent(URL.createObjectURL(blob));
    props.setAddEditSlidersModalImagePath(simulatedFile);
    props.setAddEditSlidersModalLink(props.addEditSlidersModalRowData.link);
    props.setAddEditSlidersModalSlideEnabled(props.addEditSlidersModalRowData.enabled);
}
    const { loading: editSlidersSettingsLoading, error: editSlidersSettingsError, data: editSlidersSettingsResult, makeRequest: editSlidersSettings } = useSwaggerRequest(`/api/sliders/edit/${props.addEditSlidersModalRowData?.id}`, false, 'multipart/form-data');
    useEffect(() => {
        if (editSlidersSettingsError) {

            enqueueSnackbar(editSlidersSettingsError.message, { variant: "error" });

        }
    }, [editSlidersSettingsError]);

    useEffect(() => {
        if (editSlidersSettingsResult) {
            enqueueSnackbar("Slide updated successfully.", { variant: "success" });
            handleClose();
            props.getSlidersSettingsCallback();

        }
    }, [editSlidersSettingsResult]);

    const { loading: addSlidersSettingsLoading, error: addSlidersSettingsError, data: addSlidersSettingsResult, makeRequest: addSlidersSettings } = useSwaggerRequest(`/api/sliders/add`, false, 'multipart/form-data');


    useEffect(() => {
        if (addSlidersSettingsError) {

            enqueueSnackbar(addSlidersSettingsError.message, { variant: "error" });

        }
    }, [addSlidersSettingsError]);

    useEffect(() => {
        if (addSlidersSettingsResult) {
            enqueueSnackbar("Slide added successfully.", { variant: "success" });
            handleClose();
            props.getSlidersSettingsCallback();

        }
    }, [addSlidersSettingsResult]);

    const isLoading = editSlidersSettingsLoading || addSlidersSettingsLoading;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        let isValid = true;

        if (props.addEditSlidersModalImagePath.length == 0) {
            isValid = false;
            alert("Image is required");
        }
        if (!linkValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!enabledValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (isValid) {
            try {
                if (props.modalType === "Edit") {
                  
                    const formData = new FormData();
                    formData.append('ImageFile', props.addEditSlidersModalImagePath);
                    formData.append('SliderSettings.ID', props.addEditSlidersModalRowData.id);
                    formData.append('SliderSettings.Link', props.addEditSlidersModalLink ?? "");
                    formData.append('SliderSettings.Path', props.addEditSlidersModalImagePath.name);
                    formData.append('SliderSettings.Enabled', props.addEditSlidersModalSlideEnabled);
                    await editSlidersSettings({
                        method: 'PUT',
                        requestData: formData,
                    });
                } else {

                    const formData = new FormData();
                   
                    formData.append('ImageFile', props.addEditSlidersModalImagePath);
                    formData.append('SliderSettings.Link', props.addEditSlidersModalLink ?? "");
                    formData.append('SliderSettings.Path', props.addEditSlidersModalImagePath.name);
                    formData.append('SliderSettings.Enabled', props.addEditSlidersModalSlideEnabled);


                    await addSlidersSettings({
                        method: 'POST',
                        requestData: formData,
                    });
                }
            } catch (e) {
                // Handle any errors here
            }
        }
    };

    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.addEditSlidersModalToggle}
            onClose={handleClose}
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {`${props.modalType === "Edit" ? "Edit" : "Add"} Sliders Settings`}
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
                        <Grid item xs={12} md={12}>
                            <input
                                onChange={(event) => {
                                    if (event.target.files.length > 0) {
                                        let reader = new FileReader();
                                        reader.readAsDataURL(event.target.files[0]);
                                        reader.onload = function () {
                                            //props.setCropImageModalImage(reader.result);
                                            //props.setCropImageModalToggle(true);
                                            props.setAddEditSlidersModalImagePathForComponent(reader.result);
                                            props.setAddEditSlidersModalImagePath(event.target.files[0]);
                                        };
                                        reader.onerror = function (error) {
                                            alert("Error: ", error);
                                        };
                                    }
                                }}
                                ref={addPicButtonRef}
                                accept="image/*"
                                disabled={isLoading}

                                style={{ display: "none" }}
                                id="raised-button-file"
                                name="raised-button-file"
                                multiple={false}
                                type="file"
                            />
                            <Button
                                onClick={() => {
                                    addPicButtonRef.current.click();
                                }}
                                className={classes.sliderImageAddButton}
                            >
                                {
                                    props.addEditSlidersModalImagePathForComponent ?
                                        <img
                                            className={classes.sliderImageAddButtonImage}
                                            alt="Slider Avatar"
                                            width={40}
                                            src={props.addEditSlidersModalImagePathForComponent}
                                        /> :
                                        <AddPhotoAlternateIcon className={classes.sliderImageAddButtonIcon} />
                                }
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationSelectField
                                className={classes.textField}
                                value={
                                    props.addEditSlidersModalSlideEnabled
                                }
                                ref={enabledValidationFieldRef}
                                values={[
                                    [1, "ENABLED"],
                                    [2, "DISABLED"],

                                ]}
                                disabled={isLoading}
                                onChange={(e) => {

                                    props.setAddEditSlidersModalSlideEnabled(e.target.value);
                                }}
                                label="Select Status *"
                                required
                            />

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={linkValidationFieldRef}
                                value={props.addEditSlidersModalLink}
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditSlidersModalLink(e.target.value)
                                }
                                label="Link"
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
                        {!isLoading && props.modalType === "Edit" ? "Save" : "Add"}
                    </Button>
                </Container>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return { ...state.AddEditSlidersModalReducer, ...state.AuthUserReducer, ...state.OtherReducer };
};

export default connect(mapStateToProps, {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
    setAddEditSlidersModalToggle,
    setAddEditSlidersModalType,
    setAddEditSlidersModalRowData,
    setAddEditSlidersModalImagePath,
    setAddEditSlidersModalImagePathForComponent,
    setAddEditSlidersModalSlideEnabled,
    setAddEditSlidersModalLink,
    setAddEditSlidersModalIsLoading,
    setAddEditSlidersModalReset
})(AddEditSlidersModal);
