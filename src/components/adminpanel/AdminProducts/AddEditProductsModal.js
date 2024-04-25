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
    Box,
    FormControlLabel,
    Checkbox,
    TextField
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
    setAddEditProductsModalToggle,
    setAddEditProductsModalType,
    setAddEditProductsModalRowData,
    setAddEditProductsModalImagePath,
    setAddEditProductsModalImagePathForComponent,
    setAddEditProductsModalDetailsImagePath,
    setAddEditProductsModalDetailsImagePathForComponent,
    setAddEditProductsModalProductCategoryId,
    setAddEditProductsModalProductTitle,
    setAddEditProductsModalProductDetails,
    setAddEditProductsModalProductPrice,
    setAddEditProductsModalProductSalePrice,
    setAddEditProductsModalProductVariationTitle,
    setAddEditProductsModalProductVariationData,
    setAddEditProductsModalProductOtherSelectionsSerializedData,
    setAddEditProductsModalProductStatusEnabled,
    setAddEditProductsModalProductDealStatus,
    setAddEditProductsModalIsLoading,
    setAddEditProductsModalReset
} from "../../../store/actions/AddEditProductsModalActions";
import {

    setAddEditProductsVariationTitleModalToggle,
    setAddEditProductsVariationTitleModalId,
    setAddEditProductsVariationModalToggle,
    setAddEditProductsVariationModalId,
    setAddEditProductsVariationTitleModalTitleText,
    setAddEditProductsVariationModalReset,
} from "../../../store/actions/AddEditProductsVariationModalActions";
import { useSnackbar } from "notistack";
import useSwaggerRequest from "../../../hooks/useSwaggerHook";
import ValidationSelectField from "../../otherComponents/ValidationSelectField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddIcon from '@mui/icons-material/Add';
import AddVariationDataModal from "./AddVariationDataModal";
import AddVariationTitleModal from "./AddVariationTitleModal";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import _ from "lodash";
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
    productImageAddButton: {
        border: "1px dashed gray",

        padding: "0px!important",
        margin: "auto",
        display: "block",
        width: "100%",
    },
    productImageAddButtonIcon: {
        width: "150px!important",
        height: "150px!important",
        color: "gray"
    },
    productImageAddButtonImage: {

        height: "150px!important",
        width: "auto"
    },
    productVariationContainer: {
        display: "flex!important",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#DBDBDB",
        padding: "10px 0px",
    },
    productOtherSelectionContainer: {
        display: "flex!important",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#DBDBDB",
        padding: "10px 0px",
    },
    productOtherSelectionCheckBoxContainer: {
        display: "flex!important",
        alignItems: "center",
    },
    productVariationDeleteButtonContainer: {
        display: "flex!important",
        alignItems: "center",
    },
    productVariationImage: {
        height: 60
    },
    productVariationDeleteButton: {
        marginRight: "10px!important"
    },
    otherSelectionTitleTextField: {
        marginTop: "30px!important",
        marginBottom: "30px!important"
    }
}));

const AddEditProductsModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const dialogContentRef = useRef(null);

    const url = `${props.configData.backend_domain}${props.configData.backend_port !== '' ? ':' + props.configData.backend_port : ''}`;

    const addPicButtonRef = useRef(null);
    const addDetialsPicButtonRef = useRef(null);

    const productTitleValidationFieldRef = useRef(null);
    const productDetailsValidationFieldRef = useRef(null);
    const productPriceValidationFieldRef = useRef(null);
    const productSalePriceValidationFieldRef = useRef(null);
    const categoryValidationFieldRef = useRef(null);
    const enabledValidationFieldRef = useRef(null);

    const { loading: getCategoriesLoading, error: getCategoriesError, data: getCategoriesResult, makeRequest: getCategories } = useSwaggerRequest('/api/categories/all');


    const handleClose = () => {

        props.setAddEditProductsModalReset();
    };

    useEffect(() => {

        if (props.modalType === "Edit") {

            if (props.addEditProductsModalRowData) {
                fillDataForEdit()
            }
        }
        getCategories({
            method: 'GET',

        });
        getAddons({
            method: 'GET',

        });
    }, []);

    const fillDataForEdit = async () => {

        const productImageResponse = await fetch(`${url}/api/image/${props.addEditProductsModalRowData.productImagePath}`);
        const productImageArrayBuffer = await productImageResponse.arrayBuffer();


        const productImageblob = new Blob([productImageArrayBuffer]);


        const productSimulatedFile = new File([productImageblob], props.addEditProductsModalRowData.productImagePath, {
            lastModified: new Date().getTime(),
            type: 'image/png',
        });


        const productDetailImageResponse = await fetch(`${url}/api/image/${props.addEditProductsModalRowData.productDetailsImagePath}`);
        const productDetailImageArrayBuffer = await productDetailImageResponse.arrayBuffer();


        const productDetailImageblob = new Blob([productDetailImageArrayBuffer]);


        const productDetailSimulatedFile = new File([productDetailImageblob], props.addEditProductsModalRowData.productDetailsImagePath, {
            lastModified: new Date().getTime(),
            type: 'image/png',
        });


        props.setAddEditProductsModalImagePathForComponent(URL.createObjectURL(productImageblob));
        props.setAddEditProductsModalImagePath(productSimulatedFile);
        props.setAddEditProductsModalDetailsImagePathForComponent(URL.createObjectURL(productDetailImageblob));
        props.setAddEditProductsModalDetailsImagePath(productDetailSimulatedFile);
        props.setAddEditProductsModalProductTitle(props.addEditProductsModalRowData.productTitle);
        props.setAddEditProductsModalProductDetails(props.addEditProductsModalRowData.productDetails);
        props.setAddEditProductsModalProductPrice(props.addEditProductsModalRowData.productPrice);
        props.setAddEditProductsModalProductSalePrice(props.addEditProductsModalRowData.productSalePrice);
        props.setAddEditProductsModalProductStatusEnabled(props.addEditProductsModalRowData.enabled);

        props.setAddEditProductsModalProductVariationTitle(props.addEditProductsModalRowData.variationSelectionTitle);
        props.setAddEditProductsModalProductVariationData(props.addEditProductsModalRowData.variationSelectionItemsSerialized ? JSON.parse(props.addEditProductsModalRowData.variationSelectionItemsSerialized) : null);
        props.setAddEditProductsModalProductOtherSelectionsSerializedData(props.addEditProductsModalRowData.otherSelectionSerialized ? JSON.parse(props.addEditProductsModalRowData.otherSelectionSerialized) : null);

        props.setAddEditProductsModalProductDealStatus(props.addEditProductsModalRowData.productType);

    }

    useEffect(() => {
        if (props.modalType === "Edit") {

            if (props.addEditProductsModalRowData) {
                props.setAddEditProductsModalProductCategoryId(props.addEditProductsModalRowData.categoryID);
            }
        }
    }, [getCategoriesResult]);
    const { loading: editProductsLoading, error: editProductsError, data: editProductsResult, makeRequest: editProducts } = useSwaggerRequest(`/api/products/edit/${props.addEditProductsModalRowData?.id}`, false, 'multipart/form-data');
    useEffect(() => {
        if (editProductsError) {

            enqueueSnackbar(editProductsError.message, { variant: "error" });

        }
    }, [editProductsError]);

    useEffect(() => {
        if (editProductsResult) {
            enqueueSnackbar("Product updated successfully.", { variant: "success" });
            handleClose();
            props.getProductsCallback();

        }
    }, [editProductsResult]);

    const { loading: addProductsLoading, error: addProductsError, data: addProductsResult, makeRequest: addProducts } = useSwaggerRequest(`/api/products/add`, false, 'multipart/form-data');


    useEffect(() => {
        if (addProductsError) {

            enqueueSnackbar(addProductsError.message, { variant: "error" });

        }
    }, [addProductsError]);

    useEffect(() => {
        if (addProductsResult) {
            enqueueSnackbar("Product added successfully.", { variant: "success" });
            handleClose();
            props.getProductsCallback();

        }
    }, [addProductsResult]);

    const isLoading = editProductsLoading || addProductsLoading;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        let isValid = true;

        if (isNaN(props.addEditProductsModalProductPrice) || parseFloat(props.addEditProductsModalProductPrice) <= 0 ) {
                                     
            productPriceValidationFieldRef.current.setEmpty();
            props.setAddEditProductsModalProductPrice("");

            await new Promise(resolve => setTimeout(resolve, 300));
        }

        if(parseFloat(props.addEditProductsModalProductSalePrice) >=  parseFloat(props.addEditProductsModalProductPrice)){
            isValid = false;
            alert("Sale price must be less than price.")
          }
          
        if (props.addEditProductsModalImagePath.length == 0) {
            isValid = false;
            alert("Product image is required");
        }
        if (props.addEditProductsModalDetailsImagePath.length == 0) {
            isValid = false;
            alert("Product detail image is required");
        }


        if (!productTitleValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!productDetailsValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!productPriceValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!productSalePriceValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!categoryValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!enabledValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        
        if (isValid) {
            try {

                if (props.modalType === "Edit") {

                    const formData = new FormData();
                    formData.append('Products.ID', props.addEditProductsModalRowData.id);
                    formData.append('ProductImagePath', props.addEditProductsModalImagePath);
                    formData.append('ProductDetailsImagePath', props.addEditProductsModalDetailsImagePath);

                    formData.append('Products.ProductTitle', props.addEditProductsModalProductTitle);
                    formData.append('Products.ProductImagePath', props.addEditProductsModalImagePath.name);
                    formData.append('Products.ProductDetailsImagePath', props.addEditProductsModalDetailsImagePath.name);
                    formData.append('Products.ProductDetails', props.addEditProductsModalProductDetails);

                    let price = isNaN(props.addEditProductsModalProductPrice) || props.addEditProductsModalProductPrice == 0
                        ? ""
                        : props.addEditProductsModalProductPrice;
                    price = price ?? "";

                    let salePrice = isNaN(props.addEditProductsModalProductSalePrice) || props.addEditProductsModalProductSalePrice == 0
                        ? ""
                        : props.addEditProductsModalProductSalePrice;
                    salePrice = salePrice ?? "";

                    formData.append('Products.ProductPrice', price);
                    formData.append('Products.ProductSalePrice', salePrice);

                    formData.append('Products.CategoryID', props.addEditProductsModalProductCategoryId);
                    formData.append('Products.Enabled', props.addEditProductsModalProductStatusEnabled);

                    formData.append('Products.ProductType', props.addEditProductsModalProductDealStatus);
                    formData.append('Products.variationSelectionTitle', props.addEditProductsModalProductVariationTitle ?  props.addEditProductsModalProductVariationTitle : "Variation");
                    formData.append('Products.variationSelectionItemsSerialized', props.addEditProductsModalProductVariationData && props.addEditProductsModalProductVariationData.length > 0 ? JSON.stringify(props.addEditProductsModalProductVariationData) : "");
                    formData.append('Products.OtherSelectionSerialized', props.addEditProductsModalProductOtherSelectionsSerializedData && props.addEditProductsModalProductOtherSelectionsSerializedData.length > 0 ? JSON.stringify(props.addEditProductsModalProductOtherSelectionsSerializedData) : "");



                    await editProducts({
                        method: 'PUT',
                        requestData: formData,
                    });
                } else {

                    const formData = new FormData();
                    formData.append('ProductImagePath', props.addEditProductsModalImagePath);
                    formData.append('ProductDetailsImagePath', props.addEditProductsModalDetailsImagePath);
                    formData.append('Products.ProductTitle', props.addEditProductsModalProductTitle);
                    formData.append('Products.ProductImagePath', props.addEditProductsModalImagePath.name);
                    formData.append('Products.ProductDetailsImagePath', props.addEditProductsModalDetailsImagePath.name);
                    formData.append('Products.ProductDetails', props.addEditProductsModalProductDetails);

                    let price = isNaN(props.addEditProductsModalProductPrice) || props.addEditProductsModalProductPrice == 0
                        ? ""
                        : props.addEditProductsModalProductPrice;
                    price = price ?? "";

                    let salePrice = isNaN(props.addEditProductsModalProductSalePrice) || props.addEditProductsModalProductSalePrice == 0
                        ? ""
                        : props.addEditProductsModalProductSalePrice;
                    salePrice = salePrice ?? "";

                    formData.append('Products.ProductPrice', price);
                    formData.append('Products.ProductSalePrice', salePrice);


                    formData.append('Products.CategoryID', props.addEditProductsModalProductCategoryId);
                    formData.append('Products.Enabled', props.addEditProductsModalProductStatusEnabled);

                    formData.append('Products.ProductType', props.addEditProductsModalProductDealStatus);
                    formData.append('Products.variationSelectionTitle', props.addEditProductsModalProductVariationTitle ?  props.addEditProductsModalProductVariationTitle : "Variation");
                    formData.append('Products.variationSelectionItemsSerialized', props.addEditProductsModalProductVariationData && props.addEditProductsModalProductVariationData.length > 0 ? JSON.stringify(props.addEditProductsModalProductVariationData) : "");
                    formData.append('Products.OtherSelectionSerialized', props.addEditProductsModalProductOtherSelectionsSerializedData && props.addEditProductsModalProductOtherSelectionsSerializedData.length > 0 ? JSON.stringify(props.addEditProductsModalProductOtherSelectionsSerializedData) : "");
                    await addProducts({
                        method: 'POST',
                        requestData: formData,
                    });
                }
            } catch (e) {
                // Handle any errors here
            }
        }
    };
    const { loading: getAddonsLoading, error: getAddonsError, data: getAddonsResult, makeRequest: getAddons } = useSwaggerRequest('/api/addons/all');
    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.addEditProductsModalToggle}
            onClose={handleClose}

            fullScreen
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {`${props.modalType === "Edit" ? "Edit" : "Add"} Product`}
                </Typography>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent ref={dialogContentRef} dividers className={classes.dialogContent}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography>Product Image</Typography>
                            <input
                                onChange={(event) => {
                                    if (event.target.files.length > 0) {
                                        let reader = new FileReader();
                                        reader.readAsDataURL(event.target.files[0]);
                                        reader.onload = function () {
                                            //props.setCropImageModalImage(reader.result);
                                            //props.setCropImageModalToggle(true);
                                            props.setAddEditProductsModalImagePathForComponent(reader.result);
                                            props.setAddEditProductsModalImagePath(event.target.files[0]);
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
                                className={classes.productImageAddButton}
                            >
                                {
                                    props.addEditProductsModalImagePathForComponent ?
                                        <img
                                            className={classes.productImageAddButtonImage}
                                            alt="Product Avatar"
                                            width={40}
                                            src={props.addEditProductsModalImagePathForComponent}
                                        /> :
                                        <AddPhotoAlternateIcon className={classes.productImageAddButtonIcon} />
                                }
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography>Product Detail Image</Typography>
                            <input
                                onChange={(event) => {
                                    if (event.target.files.length > 0) {
                                        let reader = new FileReader();
                                        reader.readAsDataURL(event.target.files[0]);
                                        reader.onload = function () {
                                            //props.setCropImageModalImage(reader.result);
                                            //props.setCropImageModalToggle(true);
                                            props.setAddEditProductsModalDetailsImagePathForComponent(reader.result);
                                            props.setAddEditProductsModalDetailsImagePath(event.target.files[0]);
                                        };
                                        reader.onerror = function (error) {
                                            alert("Error: ", error);
                                        };
                                    }
                                }}
                                ref={addDetialsPicButtonRef}
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
                                    addDetialsPicButtonRef.current.click();
                                }}
                                className={classes.productImageAddButton}
                            >
                                {
                                    props.addEditProductsModalDetailsImagePathForComponent ?
                                        <img
                                            className={classes.productImageAddButtonImage}
                                            alt="Product Detail Avatar"
                                            width={40}
                                            src={props.addEditProductsModalDetailsImagePathForComponent}
                                        /> :
                                        <AddPhotoAlternateIcon className={classes.productImageAddButtonIcon} />
                                }
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>

                            <ValidationSelectField
                                className={classes.textField}
                                value={
                                    props.addEditProductsModalProductCategoryId
                                }
                                ref={categoryValidationFieldRef}
                                values={getCategoriesResult && getCategoriesResult.map(category => [category.id, category.name])}
                                disabled={isLoading || getCategoriesLoading}
                                onChange={(e) => {

                                    props.setAddEditProductsModalProductCategoryId(e.target.value);
                                }}
                                label="Select Category *"
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
                                required
                                ref={productTitleValidationFieldRef}
                                value={props.addEditProductsModalProductTitle}
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditProductsModalProductTitle(e.target.value)
                                }
                                label="Product Title"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={productDetailsValidationFieldRef}
                                value={props.addEditProductsModalProductDetails}
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditProductsModalProductDetails(e.target.value)
                                }
                                required
                                label="Product Details"
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
                                value={props.addEditProductsModalProductPrice}
                                disabled={isLoading}
                              
                                onInput={(e) => {
                                    var value = parseFloat(e.target.value);

                                    if (value < 0) value = "0";

                                    props.setAddEditProductsModalProductPrice(value)

                                }
                                }
                                
                                required
                                label="Product Price"
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
                               
                               
                                ref={productSalePriceValidationFieldRef}
                                value={props.addEditProductsModalProductSalePrice}
                                disabled={isLoading}
                                onInput={(e) => {
                                    var value = parseFloat(e.target.value);

                                    if (value < 0) value = "0";

                                    props.setAddEditProductsModalProductSalePrice(value)

                                }
                                }

                                label="Product Sale Price"
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationSelectField
                                className={classes.textField}
                                value={
                                    props.addEditProductsModalProductStatusEnabled
                                }
                                ref={enabledValidationFieldRef}
                                values={[
                                    [1, "ENABLED"],
                                    [2, "DISABLED"],

                                ]}
                                disabled={isLoading}
                                onChange={(e) => {

                                    props.setAddEditProductsModalProductStatusEnabled(e.target.value);
                                }}
                                label="Select Status *"
                                required
                            />

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ValidationSelectField
                                className={classes.textField}
                                value={
                                    props.addEditProductsModalProductDealStatus
                                }
                                ref={enabledValidationFieldRef}
                                values={[
                                    [2, "DEAL"],
                                    [1, "SIMPLE ITEM"],

                                ]}
                                disabled={isLoading}
                                onChange={(e) => {

                                    props.setAddEditProductsModalProductDealStatus(e.target.value);
                                }}
                                label="Select Product Type *"
                                required
                            />

                        </Grid>
                        <Grid item xl={12}>
                            <Typography display={"inline"} fontSize={17} fontWeight={700}>{props.addEditProductsModalProductVariationTitle && props.addEditProductsModalProductVariationTitle.length > 0 ? props.addEditProductsModalProductVariationTitle : "Variation"}</Typography>
                            <Button onClick={() => {
                                props.setAddEditProductsVariationTitleModalToggle(true);
                                props.setAddEditProductsVariationTitleModalId("variation1");
                                props.setAddEditProductsVariationTitleModalTitleText(props.addEditProductsModalProductVariationTitle && props.addEditProductsModalProductVariationTitle.length > 0 ? props.addEditProductsModalProductVariationTitle : "Variation");
                            }}><EditNoteIcon />Edit</Button>
                            <Button onClick={() => {
                                props.setAddEditProductsVariationModalToggle(true);
                                props.setAddEditProductsVariationModalId("variation1");
                            }}><AddIcon />Add</Button>
                        </Grid>

                        <AddVariationDataModal onSave={(image, name, id,price,salePrice) => {
                            if (id == "variation1") {
                                let data = _.cloneDeep(props.addEditProductsModalProductVariationData ?? []);
                                if (_.find(data, itm => itm.name == name)) {
                                    alert("Item already exist.")
                                } else {
                                    data.push({ image: image, name: name,price:price,salePrice: salePrice});
                                    props.setAddEditProductsModalProductVariationData(data);
                                    props.setAddEditProductsVariationModalReset();
                                }
                            }

                        }} />
                        <AddVariationTitleModal onSave={(text, id) => {

                            if (id == "selection1") {
                                props.setAddEditProductsModalProductVariationTitle(text);
                            }
                            props.setAddEditProductsVariationModalReset();
                        }} />
                    </Grid>
                    <Grid>
                        {
                            props.addEditProductsModalProductVariationData ?
                                props.addEditProductsModalProductVariationData.map((item, index) => {
                                    const { name, image,price,salePrice } = item;
                                    return (
                                        <Container maxWidth={false} className={classes.productVariationContainer}>
                                            <div className={classes.productVariationDeleteButtonContainer}>
                                                <Button onClick={() => {
                                                    if (index >= 0 && index < props.addEditProductsModalProductVariationData.length) {
                                                        let data = _.cloneDeep(props.addEditProductsModalProductVariationData);
                                                        data.splice(index, 1);
                                                        props.setAddEditProductsModalProductVariationData(data);
                                                    }
                                                }} className={classes.productVariationDeleteButton}><DeleteSweepIcon /></Button>
                                                <Typography>{name}</Typography>
                                            </div>
                                           
                                            <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '1rem',
                                                        }}
                                                    >
                                                        {image ? (
                                                            <img
                                                                src={image}
                                                                alt="variation image"
                                                                height={70}
                                                                loading="lazy"
                                                                style={{ borderRadius: '5%' }}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </Box>
                                                    <div>
                                                        <span
                                                            style={
                                                               salePrice && salePrice !== ""
                                                                    ? { color: "red", textDecoration: "line-through", marginRight: 20 }
                                                                    : parseFloat(price) === 0
                                                                        ? { color: "green" }
                                                                        : null
                                                            }
                                                        >
                                                            {parseFloat(price) === 0 ? "Free" : `$${price}`}
                                                        </span>
                                                        {salePrice && salePrice !== "" && (
                                                            <span style={{ color: "green" }}>{`$${salePrice}`}</span>
                                                        )}
                                                    </div>
                                        </Container>
                                    )
                                }) :
                                <Typography>No items added.</Typography>
                        }
                        <hr />
                        <br />
                    </Grid>
                    <>
                        <Button variant="outlined"
                            onClick={() => {
                                var data =
                                    props.addEditProductsModalProductOtherSelectionsSerializedData &&
                                        props.addEditProductsModalProductOtherSelectionsSerializedData.length > 0
                                        ? _.cloneDeep(props.addEditProductsModalProductOtherSelectionsSerializedData)
                                        : [];
                                data.push({ title: "other selection" + (data.length + 1), data: [] });
                                props.setAddEditProductsModalProductOtherSelectionsSerializedData(data);

                                setTimeout(() => {
                                    if (dialogContentRef.current) {
                                        dialogContentRef.current.scrollTop = dialogContentRef.current.scrollHeight;
                                    }
                                }, 200);


                            }}
                        >
                            Add Other Selection
                        </Button>
                        {props.addEditProductsModalProductOtherSelectionsSerializedData &&
                            props.addEditProductsModalProductOtherSelectionsSerializedData.map(
                                (otherSelectionData, index) => (
                                    <div key={index}>
                                        <hr />
                                        <div style={{ display: "flex" }}>
                                            <TextField className={classes.otherSelectionTitleTextField} value={otherSelectionData.title} onInput={(e) => {
                                                var dataAll = _.cloneDeep(props.addEditProductsModalProductOtherSelectionsSerializedData);
                                                dataAll[index].title = e.target.value;
                                                props.setAddEditProductsModalProductOtherSelectionsSerializedData(dataAll);
                                            }}></TextField>
                                            <Button onClick={() => {
                                                var dataAll = _.cloneDeep(props.addEditProductsModalProductOtherSelectionsSerializedData);
                                                dataAll.splice(index, 1);
                                                props.setAddEditProductsModalProductOtherSelectionsSerializedData(dataAll);
                                            }}><DeleteSweepIcon /></Button>
                                        </div>
                                        {getAddonsResult &&
                                            getAddonsResult.length > 0 &&
                                            getAddonsResult.map((data, dataIndex) => (
                                                <Container key={dataIndex} maxWidth={false} className={classes.productOtherSelectionContainer}>
                                                    <div maxWidth={false} className={classes.productOtherSelectionCheckBoxContainer}>
                                                        <Checkbox
                                                            checked={props.addEditProductsModalProductOtherSelectionsSerializedData[index].data.includes("id-" + data.id)}
                                                            onChange={(e) => {
                                                                var dataAll = _.cloneDeep(props.addEditProductsModalProductOtherSelectionsSerializedData);
                                                                const itemId = "id-" + data.id;

                                                                if (e.target.checked) {
                                                                    const isItemAdded = dataAll[index].data.includes(itemId);

                                                                    if (isItemAdded) {
                                                                        // Item is already added, remove it

                                                                    } else {

                                                                        dataAll[index].data.push(itemId);
                                                                        props.setAddEditProductsModalProductOtherSelectionsSerializedData(dataAll);
                                                                    }
                                                                } else {
                                                                    dataAll[index].data = dataAll[index].data.filter((id) => id !== itemId);

                                                                    props.setAddEditProductsModalProductOtherSelectionsSerializedData(dataAll);
                                                                }
                                                            }}
                                                        />
                                                        <Typography>{data.productTitle}</Typography>
                                                    </div>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '1rem',
                                                        }}
                                                    >
                                                        {data.productImagePath ? (
                                                            <img
                                                                src={`${url}/images/${data.productImagePath}`}
                                                                alt="addon image"
                                                                height={70}
                                                                loading="lazy"
                                                                style={{ borderRadius: '5%' }}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </Box>
                                                    <div>
                                                        <span
                                                            style={
                                                                data.productSalePrice && data.productSalePrice !== ""
                                                                    ? { color: "red", textDecoration: "line-through", marginRight: 20 }
                                                                    : parseFloat(data.productPrice) === 0
                                                                        ? { color: "green" }
                                                                        : null
                                                            }
                                                        >
                                                            {parseFloat(data.productPrice) === 0 ? "Free" : `$${data.productPrice}`}
                                                        </span>
                                                        {data.productSalePrice && data.productSalePrice !== "" && (
                                                            <span style={{ color: "green" }}>{`$${data.productSalePrice}`}</span>
                                                        )}
                                                    </div>

                                                </Container>
                                            ))}
                                    </div>
                                )
                            )}
                    </>;

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
    return { ...state.AddEditProductsModalReducer, ...state.AuthUserReducer, ...state.OtherReducer };
};

export default connect(mapStateToProps, {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
    setAddEditProductsModalToggle,
    setAddEditProductsModalType,
    setAddEditProductsModalRowData,
    setAddEditProductsModalImagePath,
    setAddEditProductsModalImagePathForComponent,
    setAddEditProductsModalDetailsImagePath,
    setAddEditProductsModalDetailsImagePathForComponent,
    setAddEditProductsModalProductCategoryId,
    setAddEditProductsModalProductTitle,
    setAddEditProductsModalProductDetails,
    setAddEditProductsModalProductPrice,
    setAddEditProductsModalProductSalePrice,

    setAddEditProductsModalProductVariationTitle,
    setAddEditProductsModalProductVariationData,
    setAddEditProductsModalProductOtherSelectionsSerializedData,
    setAddEditProductsModalProductStatusEnabled,
    setAddEditProductsModalProductDealStatus,
    setAddEditProductsModalIsLoading,
    setAddEditProductsModalReset,

    setAddEditProductsVariationTitleModalToggle,
    setAddEditProductsVariationTitleModalId,
    setAddEditProductsVariationModalToggle,
    setAddEditProductsVariationModalId,
    setAddEditProductsVariationTitleModalTitleText,
    setAddEditProductsVariationModalReset,
})(AddEditProductsModal);
