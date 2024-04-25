import React from "react";
import { connect } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText, SvgIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import GroupAdd from "@mui/icons-material/GroupAdd";
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import DiscountIcon from '@mui/icons-material/Discount';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
const useStyles = makeStyles((theme) => ({
  drawerNavigationList: {
    flex: 1
  },
  linksButton: {

    cursor: "pointer",
    borderBottom: "1px solid #d5cfcf!important",

    backgroundColor: "#ebebeb!important",
    fontWeight: "bold!important",
    textTransform: "capitalize!important",

  },
  linksButtonSelected: {
    background: "white!important",
    color: "#505050!important",
    //border: "1px solid #505050!important",
  },
  linkBorderTop:{
    borderTop: "1px solid #d5cfcf!important"
  }
}));

const pages = [
  { text: "Users", link: "adminusers", icon: <GroupAdd /> },
  { text: "Categories", link: "admincategories", icon: <CategoryIcon /> },
  { text: "Addons", link: "adminaddons", icon: <DiscountIcon /> },
  { text: "Products", link: "adminproducts", icon: <InventoryIcon /> },
  { text: "Sliders", link: "adminsliders", icon: <ViewCarouselIcon /> },
];

const NavigationList = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <List className={classes.drawerNavigationList}>
      {pages.map((page, index) => {
     
        return <ListItem key={page.link} 
          className={clsx(classes.linksButton, {
            [classes.linksButtonSelected]:
              ((location.pathname === "/admin" ||
              location.pathname === "/" ||
                location.pathname === "/userpanel" ||
                location.pathname === "/adminusers") &&
                page.link === "adminusers" ||
                (location.pathname === "/admincategories" &&
                    page.link === "admincategories") ||
                  (location.pathname === "/adminaddons" &&
                    page.link === "adminaddons") ||
                  (location.pathname === "/adminproducts" &&
                    page.link === "adminproducts") ||
                  (location.pathname === "/adminsliders" &&
                    page.link === "adminsliders")),
                  [classes.linkBorderTop]:index == 0
          })}
          onClick={() => {
            navigate("/" + page.link);
          }}>
          <ListItemIcon>
            {page.icon}
          </ListItemIcon>
          <ListItemText primary={page.text} />
        </ListItem>
      })}
    </List>
  );
};

export default connect(null)(NavigationList);
