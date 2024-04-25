import React from "react";
import { connect } from "react-redux";
import { Container, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  linksContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none!important",
    },
    marginRight: 20,
  },
  linksButton: {
    background: "#505050!important",
    border: "0px!important",
    marginRight: "5px!important",
    width: "130px!important",
    color: "white!important",
    fontWeight: "bold!important",
    textTransform: "capitalize!important",
    "&:hover": {
      background: "white!important",
      color: "#505050!important",
      border: "1px solid #505050!important",
    },
  },
  linksButtonSelected: {
    background: "white!important",
    color: "#505050!important",
    border: "1px solid #505050!important",
  },
}));

const pages = [
  { text: "Users", link: "adminusers" },
  { text: "Categories", link: "admincategories" },
  { text: "Addons", link: "adminaddons" },
  { text: "Products", link: "adminproducts" },
  { text: "Sliders", link: "adminsliders" },
];

const NavigationList = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container disableGutters={true} maxWidth="lg">
      <Box
        className={classes.linksContainer}
        display="flex"
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
      >
        {pages.map((page) => (
          <Button
            variant="outlined"
            key={page.text}
            onClick={() => {
              navigate("/" + page.link);
            }}
            className={clsx(classes.linksButton, {
              [classes.linksButtonSelected]:
                ((location.pathname === "/admin" || 
                location.pathname === "/" || 
                location.pathname === "/adminpanel" ||
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
            })}
          >
            {page.text}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default connect(null)(NavigationList);
