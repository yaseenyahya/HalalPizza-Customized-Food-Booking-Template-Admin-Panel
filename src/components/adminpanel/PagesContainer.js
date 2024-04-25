import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@mui/material"; // Change import
import { makeStyles } from "@mui/styles"; // Change import
import clsx from "clsx";
import AdminUsers from "./AdminUsers";
import AdminCategories from "./AdminCategories";
import AdminSliders from "./AdminSliders";
import AdminAddons from "./AdminAddons";
import AdminProducts from "./AdminProducts";
//import AdminUsersHistory from "./AdminUsersHistory";
const useStyles = makeStyles((theme) => ({
    mainContainer: {

    },
}));

const PagesContainer = (props) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <Container maxWidth={false}>
            {(location.pathname === "/admin"  ||  
            location.pathname === "/" || 
            location.pathname === "/adminpanel" || 
            location.pathname === "/adminusers") && <AdminUsers />}
            {
            location.pathname === "/admincategories" && <AdminCategories/>
            }
            {
            location.pathname === "/adminsliders" && <AdminSliders/>
            }
            {
            location.pathname === "/adminaddons" && <AdminAddons/>
            }
            {
            location.pathname === "/adminproducts" && <AdminProducts/>
            }
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(PagesContainer);
