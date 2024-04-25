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
import useSwaggerRequest from "../../../hooks/useSwaggerHook";
import {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
} from "../../../store/actions/CropImageModalActions";

import {
    setAddEditCategoriesModalToggle,
    setAddEditCategoriesModalType,
    setAddEditCategoriesModalRowData,
    setAddEditCategoriesModalCategoryName,
    setAddEditCategoriesModalIsLoading,
    setAddEditCategoriesModalReset
} from "../../../store/actions/AddEditCategoriesModalActions";

import { useSnackbar } from "notistack";

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
    submitButtonContainer:{
        display: "flex!important",
        alignItems: "center"
   
    }
}));

const AddEditCategoriesModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const categoriesNameValidationFieldRef = useRef(null);

    const handleClose = () => {
       
        props.setAddEditCategoriesModalReset();
    };

    useEffect(() => {

        if (props.modalType === "Edit") {
            if (props.addEditCategoriesModalRowData) {
                props.setAddEditCategoriesModalCategoryName(props.addEditCategoriesModalRowData.name);
            }
        }
    }, []);

    const { loading: editCategoryLoading, error: editCategoryError,data: editCategoryResult, makeRequest: editCategory } = useSwaggerRequest(`/api/categories/edit/${props.addEditCategoriesModalRowData?.id}`);


    useEffect(() => {
        if (editCategoryError) {
           
                enqueueSnackbar(editCategoryError.message, { variant: "error" });
         
        }
    }, [editCategoryError]);

    useEffect(() => {
        if (editCategoryResult) {
           
                enqueueSnackbar("Category updated successfully.", { variant: "success" });
                handleClose();
                props.getDesignationsCallback();
           
        }
    }, [editCategoryResult]);

    const { loading: addCategoryLoading, error: addCategoryError,data: addCategoryResult, makeRequest: addCategory } = useSwaggerRequest(`/api/categories/add`);

    useEffect(() => {
        if (addCategoryError) {
           
                enqueueSnackbar(addCategoryError.message, { variant: "error" });
         
        }
    }, [addCategoryError]);

    useEffect(() => {
        if (addCategoryResult) {
         
                enqueueSnackbar("Category added successfully.", { variant: "success" });
                handleClose();
                props.getDesignationsCallback();
            
        }
    }, [addCategoryResult]);

    const isLoading = editCategoryLoading || addCategoryLoading;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        let isValid = true;

        if (!categoriesNameValidationFieldRef.current.validateValue()) {
            isValid = false;
        }

        if (isValid) {
            try {
                if (props.modalType === "Edit") {
                    await editCategory({
                        method: 'PUT',
                        requestData: {
                            id: props.addEditCategoriesModalRowData.id,
                            name:  props.addEditCategoriesModalCategoryName
                        },
                    });
                } else {
                    await addCategory({
                        method: 'POST',
                        requestData: {
                            name: props.addEditCategoriesModalCategoryName,
                        },
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
            open={props.addEditCategoriesModalToggle}
            onClose={handleClose}
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {`${props.modalType === "Edit" ? "Edit" : "Add"} Category`}
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
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={categoriesNameValidationFieldRef}
                                value={props.addEditCategoriesModalCategoryName}
                                required
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditCategoriesModalCategoryName(e.target.value)
                                }
                                label="Category Name"
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
    return { ...state.AddEditCategoriesModalReducer, ...state.AuthUserReducer };
};

export default connect(mapStateToProps, {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
    setAddEditCategoriesModalToggle,
    setAddEditCategoriesModalType,
    setAddEditCategoriesModalRowData,
    setAddEditCategoriesModalCategoryName,
    setAddEditCategoriesModalIsLoading,
    setAddEditCategoriesModalReset
})(AddEditCategoriesModal);
