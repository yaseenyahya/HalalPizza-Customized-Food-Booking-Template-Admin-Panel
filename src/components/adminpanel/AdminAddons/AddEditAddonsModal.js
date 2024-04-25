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
    setAddEditAddonsModalToggle,
    setAddEditAddonsModalType,
    setAddEditAddonsModalRowData,
    setAddEditAddonsModalImagePath,
    setAddEditAddonsModalImagePathForComponent,
    setAddEditAddonsModalAddonProductTitle,
    setAddEditAddonsModalProductSalePrice,
    setAddEditAddonsModalProductPrice,
    setAddEditAddonsModalIsLoading,
    setAddEditAddonsModalReset
} from "../../../store/actions/AddEditAddonsModalActions";
import { useSnackbar } from "notistack";
import useSwaggerRequest from "../../../hooks/useSwaggerHook";
import ValidationSelectField from "../../otherComponents/ValidationSelectField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { parse } from "date-fns";

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
    addonImageAddButton: {
      border: "1px dashed gray",
  
      padding: "0px!important",
      margin: "auto",
      display: "block",
      width: "100%",
    },
    addonImageAddButtonIcon: {
      width: "150px!important",
      height: "150px!important",
      color: "gray"
    },
    addonImageAddButtonImage: {
  
      height: "150px!important",
      width: "auto"
    }
  }));

const AddEditAddonsModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const url = `${props.configData.backend_domain}${props.configData.backend_port !== '' ? ':' + props.configData.backend_port : ''}`;

    const addPicButtonRef = useRef(null);

    const productTitleValidationFieldRef = useRef(null);
    const productSalePriceValidationFieldRef = useRef(null);
    const productPriceValidationFieldRef = useRef(null);

    const handleClose = () => {
        props.setAddEditAddonsModalReset();
    };

    useEffect(() => {
        if (props.modalType === "Edit") {
            if (props.addEditAddonsModalRowData) {
                fillDataForEdit();
            }
        }
    }, []);

    const fillDataForEdit = async () => {
        if(props.addEditAddonsModalRowData.productImagePath){
        const response = await fetch(`${url}/api/image/${props.addEditAddonsModalRowData.productImagePath}`);
        const arrayBuffer = await response.arrayBuffer();

        const blob = new Blob([arrayBuffer]);

        const simulatedFile = new File([blob], props.addEditAddonsModalRowData.productImagePath, {
            lastModified: new Date().getTime(),
            type: 'image/png',
        });

        props.setAddEditAddonsModalImagePathForComponent(URL.createObjectURL(blob));
        props.setAddEditAddonsModalImagePath(simulatedFile);
    }
        props.setAddEditAddonsModalAddonProductTitle(props.addEditAddonsModalRowData.productTitle);
        props.setAddEditAddonsModalProductSalePrice(props.addEditAddonsModalRowData.productSalePrice);
        props.setAddEditAddonsModalProductPrice(props.addEditAddonsModalRowData.productPrice);
    };

    const { loading: editAddonsLoading, error: editAddonsError, data: editAddonsResult, makeRequest: editAddons } = useSwaggerRequest(`/api/addons/edit/${props.addEditAddonsModalRowData?.id}`, false, 'multipart/form-data');

    useEffect(() => {
        if (editAddonsError) {
            enqueueSnackbar(editAddonsError.message, { variant: "error" });
        }
    }, [editAddonsError]);

    useEffect(() => {
        if (editAddonsResult) {
            enqueueSnackbar("Addon updated successfully.", { variant: "success" });
            handleClose();
            props.getAddonsCallback();
        }
    }, [editAddonsResult]);

    const { loading: addAddonsLoading, error: addAddonsError, data: addAddonsResult, makeRequest: addAddons } = useSwaggerRequest(`/api/addons/add`, false, 'multipart/form-data');

    useEffect(() => {
        if (addAddonsError) {
            enqueueSnackbar(addAddonsError.message, { variant: "error" });
        }
    }, [addAddonsError]);

    useEffect(() => {
        if (addAddonsResult) {
            enqueueSnackbar("Addon added successfully.", { variant: "success" });
            handleClose();
            props.getAddonsCallback();
        }
    }, [addAddonsResult]);

    const isLoading = editAddonsLoading || addAddonsLoading;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        let isValid = true;

       // if (props.addEditAddonsModalImagePath.length === 0) {
        //    isValid = false;
         //   alert("Image is required");
     //   }
        if (!productTitleValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!productSalePriceValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!productPriceValidationFieldRef.current.validateValue()) {
            isValid = false;
        }


          if(parseFloat(props.addEditAddonsModalProductSalePrice) >=  parseFloat(props.addEditAddonsModalProductPrice)){
            isValid = false;
            alert("Sale price must be less than price.")
          }

        if (isValid) {
            try {
              
                if (props.modalType === "Edit") {
                    const formData = new FormData();
                    formData.append('ImageFile', props.addEditAddonsModalImagePath);
                    formData.append('Addons.ID', props.addEditAddonsModalRowData.id);
                    formData.append('Addons.ProductTitle', props.addEditAddonsModalAddonProductTitle);
                    formData.append('Addons.ProductImagePath',props.addEditAddonsModalImagePath ? props.addEditAddonsModalImagePath.name : "");
                   
                    
                    let price = isNaN(props.addEditAddonsModalProductPrice) || props.addEditAddonsModalProductPrice == 0
                    ? 0
                    : props.addEditAddonsModalProductPrice;
                price = price ?? 0;

                let salePrice = isNaN(props.addEditAddonsModalProductSalePrice) || props.addEditAddonsModalProductSalePrice == 0
                    ? ""
                    : props.addEditAddonsModalProductSalePrice;
                salePrice = salePrice ?? "";
                    
                    formData.append('Addons.ProductPrice', price);
                    formData.append('Addons.ProductSalePrice',salePrice);

                    await editAddons({
                        method: 'PUT',
                        requestData: formData,
                    });
                } else {
                    
                    const formData = new FormData();
                    formData.append('ImageFile', props.addEditAddonsModalImagePath);
                    formData.append('Addons.ProductTitle', props.addEditAddonsModalAddonProductTitle);
                    formData.append('Addons.ProductImagePath', props.addEditAddonsModalImagePath ? props.addEditAddonsModalImagePath.name : "");
                    

                    let price = isNaN(props.addEditAddonsModalProductPrice) || props.addEditAddonsModalProductPrice == 0
                    ? 0
                    : props.addEditAddonsModalProductPrice;
                price = price ?? 0;

                let salePrice = isNaN(props.addEditAddonsModalProductSalePrice) || props.addEditAddonsModalProductSalePrice == 0
                    ? ""
                    : props.addEditAddonsModalProductSalePrice;
                salePrice = salePrice ?? "";
                    
                    formData.append('Addons.ProductPrice', price);
                    formData.append('Addons.ProductSalePrice',salePrice);
                    
                    await addAddons({
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
            open={props.addEditAddonsModalToggle}
            onClose={handleClose}
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {`${props.modalType === "Edit" ? "Edit" : "Add"} Addon`}
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
                                            props.setAddEditAddonsModalImagePathForComponent(reader.result);
                                            props.setAddEditAddonsModalImagePath(event.target.files[0]);
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
                                className={classes.addonImageAddButton}
                            >
                                {props.addEditAddonsModalImagePathForComponent ? (
                                    <img
                                        className={classes.addonImageAddButtonImage}
                                        alt="Addon Avatar"
                                        width={40}
                                        src={props.addEditAddonsModalImagePathForComponent}
                                    />
                                ) : (
                                    <AddPhotoAlternateIcon className={classes.addonImageAddButtonIcon} />
                                )}
                            </Button>
                            {props.addEditAddonsModalImagePath && <Button onClick={()=>{
                                props.setAddEditAddonsModalImagePath("");
                                props.setAddEditAddonsModalImagePathForComponent("");
                            }}>Remove Image</Button>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                required
                                ref={productTitleValidationFieldRef}
                                value={props.addEditAddonsModalAddonProductTitle}
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditAddonsModalAddonProductTitle(e.target.value)
                                }
                                label="Addon Title"
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
                                ref={productPriceValidationFieldRef}
                                value={props.addEditAddonsModalProductPrice}
                                disabled={isLoading}
                                onInput={(e) => {
                                    var value = parseFloat(e.target.value);
                                    if (value <= 0) value = 0;
                                    props.setAddEditAddonsModalProductPrice(value);
                                }}
                                required
                                label="Addon Price"
                                variant="outlined"
                            />
                            <Typography color={"red"} fontSize={11}>If the value is set to 0, the product becomes free.</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="number"
                                step=".00"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={productSalePriceValidationFieldRef}
                                value={props.addEditAddonsModalProductSalePrice}
                                disabled={isLoading}
                                onInput={(e) =>{
                                    var value = parseFloat(e.target.value);
                                    if (value <= 0) value = 0;
                                    props.setAddEditAddonsModalProductSalePrice(e.target.value)
                                }
                            }
                                label="Addon Sale Price"
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
    return { ...state.AddEditAddonsModalReducer, ...state.AuthUserReducer, ...state.OtherReducer };
};

export default connect(mapStateToProps, {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
    setAddEditAddonsModalToggle,
    setAddEditAddonsModalType,
    setAddEditAddonsModalRowData,
    setAddEditAddonsModalImagePath,
    setAddEditAddonsModalImagePathForComponent,
    setAddEditAddonsModalAddonProductTitle,
    setAddEditAddonsModalProductSalePrice,
    setAddEditAddonsModalProductPrice,
    setAddEditAddonsModalIsLoading,
    setAddEditAddonsModalReset
})(AddEditAddonsModal);
