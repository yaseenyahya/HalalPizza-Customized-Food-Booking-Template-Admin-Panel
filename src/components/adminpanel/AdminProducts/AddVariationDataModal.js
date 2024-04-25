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

    setAddEditProductsVariationModalToggle,
    setAddEditProductsVariationModalItemName,
    setAddEditProductsVariationModalId,
    setAddEditProductsVariationModalItemImage,
    setAddEditProductsVariationModalItemProductPrice,
    setAddEditProductsVariationModalItemProductSalePrice
} from "../../../store/actions/AddEditProductsVariationModalActions";
import { useSnackbar } from "notistack";
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
    itemImageAddButton: {
        border: "1px dashed gray",

        padding: "0px!important",
        margin: "auto",
        display: "block",
        width: "100%",
    },
    itemImageAddButtonIcon: {
        width: "150px!important",
        height: "150px!important",
        color: "gray"
    },
    itemImageAddButtonImage: {

        height: "150px!important",
        width: "auto"
    }
}));

const AddVariationDataModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const addPicButtonRef = useRef(null);

    const itemNameValidationFieldRef = useRef(null);
    const itemPriceValidationFieldRef = useRef(null);
    const itemSalePriceValidationFieldRef = useRef(null);

    const handleClose = () => {

        props.setAddEditProductsVariationModalToggle(false);
        props.setAddEditProductsVariationModalItemName("");
        props.setAddEditProductsVariationModalItemImage(null);
        props.setAddEditProductsVariationModalId(null);
        
    };



    const handleSubmit = async (event) => {
        event.preventDefault();


        let isValid = true;

       // if (props.addEditProductsVariationModalItemImage.length === 0) {
          //  isValid = false;
         //   alert("Item image is required");
     //   }
       
     if (isNaN(props.addEditProductsVariationModalItemProductPrice) || parseFloat(props.addEditProductsVariationModalItemProductPrice) <= 0 ) {
                                     
        itemPriceValidationFieldRef.current.setEmpty();
        props.setAddEditProductsVariationModalItemProductPrice("");

        await new Promise(resolve => setTimeout(resolve, 300));
    }
    if(parseFloat(props.addEditProductsVariationModalItemProductSalePrice) >=  parseFloat(props.addEditProductsVariationModalItemProductPrice)){
        isValid = false;
        alert("Sale price must be less than price.")
      }
        if (!itemNameValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!itemPriceValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!itemSalePriceValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (isValid) {

            let price = isNaN(props.addEditProductsVariationModalItemProductPrice) || props.addEditProductsVariationModalItemProductPrice == 0
            ? ""
            : props.addEditProductsVariationModalItemProductPrice;
        price = price ?? "";

        let salePrice = isNaN(props.addEditProductsVariationModalItemProductSalePrice) || props.addEditProductsVariationModalItemProductSalePrice == 0
            ? ""
            : props.addEditProductsVariationModalItemProductSalePrice;
        salePrice = salePrice ?? "";

           props.onSave(props.addEditProductsVariationModalItemImage,props.addEditProductsVariationModalItemName,props.addEditProductsVariationModalId,price,salePrice);
        }
    };

    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.addEditProductsVariationModalToggle}
            onClose={handleClose}
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {"Add Variation"}
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
                            <Typography>Item Image</Typography>
                            <input
                                onChange={(event) => {
                                    if (event.target.files.length > 0) {
                                        let reader = new FileReader();
                                        reader.readAsDataURL(event.target.files[0]);
                                        reader.onload = function () {
                                        
                                            props.setAddEditProductsVariationModalItemImage(reader.result);
                                           
                                        };
                                        reader.onerror = function (error) {
                                            alert("Error: ", error);
                                        };
                                    }
                                }}
                                ref={addPicButtonRef}
                                accept="image/*"
                        

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
                                className={classes.itemImageAddButton}
                            >
                                {
                                    props.addEditProductsVariationModalItemImage ?
                                        <img
                                            className={classes.productImageAddButtonImage}
                                            alt="Item Avatar"
                                            height={150}
                                            src={props.addEditProductsVariationModalItemImage}
                                        /> :
                                        <AddPhotoAlternateIcon className={classes.itemImageAddButtonIcon} />
                                }
                            </Button>
                            {props.addEditProductsVariationModalItemImage && <Button onClick={()=>{
                                props.setAddEditProductsVariationModalItemImage("");
                               
                            }}>Remove Image</Button>}
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                required
                                ref={itemNameValidationFieldRef}
                                value={props.addEditProductsVariationModalItemName}
                            
                                onInput={(e) =>
                                    props.setAddEditProductsVariationModalItemName(e.target.value)
                                }
                                label="Item Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="number"
                                step=".00"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},

                                }}
             
                                ref={itemPriceValidationFieldRef}
                                value={props.addEditProductsVariationModalItemProductPrice}
                               
                              
                                onInput={(e) => {
                                    var value = parseFloat(e.target.value);

                                    if (value < 0) value = "0";

                                    props.setAddEditProductsVariationModalItemProductPrice(value)

                                }
                                }
                                
                                required
                                label="Item Price"
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="number"
                                step=".00"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},

                                }}
                               
                               
                                ref={itemSalePriceValidationFieldRef}
                                value={props.addEditProductsVariationModalItemProductSalePrice}
                               
                                onInput={(e) => {
                                    var value = parseFloat(e.target.value);

                                    if (value < 0) value = "0";

                                    props.setAddEditProductsVariationModalItemProductSalePrice(value)

                                }
                                }

                                label="Item Sale Price"
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
    setAddEditProductsVariationModalToggle,
    setAddEditProductsVariationModalItemName,
    setAddEditProductsVariationModalId,
    setAddEditProductsVariationModalItemImage,
    setAddEditProductsVariationModalItemProductPrice,
    setAddEditProductsVariationModalItemProductSalePrice
})(AddVariationDataModal);
