import React, { useEffect, useRef } from "react";
import {
    Dialog,
    Button,
    DialogContent,
    DialogActions,
    Typography,
    DialogTitle,

    IconButton,
    Container,
    Grid,
   
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import ValidationTextField from "../../otherComponents/ValidationTextField";

import {

    setAddEditProductsVariationTitleModalToggle,
    setAddEditProductsVariationTitleModalTitleText,
    setAddEditProductsVariationTitleModalId
} from "../../../store/actions/AddEditProductsVariationModalActions";
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
    submitButtonContainer: {
        display: "flex!important",
        alignItems: "center"

    }
}));

const AddVariationTitleModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const titleValidationFieldRef = useRef(null);

    const handleClose = () => {

        props.setAddEditProductsVariationTitleModalToggle(false);
        props.setAddEditProductsVariationTitleModalTitleText("");
        props.setAddEditProductsVariationTitleModalId(null);
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let isValid = true;

        if (!titleValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
       
        if (isValid) {
           props.onSave(props.addEditProductsVariationTitleModalTitleText,props.addEditProductsVariationTitleModalId);
        }
    };

    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.addEditProductsVariationTitleModalToggle}
            onClose={handleClose}
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {"Edit Title"}
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
                                required
                                ref={titleValidationFieldRef}
                                value={props.addEditProductsVariationTitleModalTitleText}
                            
                                onInput={(e) =>
                                    props.setAddEditProductsVariationTitleModalTitleText(e.target.value)
                                }
                                label="Title"
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
                        className={classes.submitButton}
                    >
                        Add
                    </Button>
                </Container>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return { ...state.AddEditProductsVariationModalReducer};
};

export default connect(mapStateToProps, {
    setAddEditProductsVariationTitleModalToggle,
    setAddEditProductsVariationTitleModalTitleText,
    setAddEditProductsVariationTitleModalId

})(AddVariationTitleModal);
