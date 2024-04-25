import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip
} from "@mui/material/";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Folder from "@mui/icons-material/Folder";
import { withStyles, makeStyles } from "@mui/styles";

const useStyles = (theme) => ({
  menuPaper: {
    backgroundColor: "#dea701",
    padding:0,
    border: "1px solid #E14425",
  },
});
class ListMenu extends Component {
  state = {
    anchorEl: null,
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  menuItemStyles = {
    minWidth: 200,
    textAlign: "center",

    borderBottom: "1px solid gray",
  };

  containerStyles = {
    display: "flex",
  };
  render() {
    const { items, iconMenuColor } = this.props;
    const { classes, selectedItemId } = this.props;
    return (
      <div style={this.containerStyles}>
        <IconButton
          onClick={this.handleClick}
          style={{
            ...(iconMenuColor !== undefined ? { color: iconMenuColor } : null),
            margin: "auto",
            padding: 0,
          }}
        >
          <MoreVertIcon
            color={iconMenuColor !== undefined ? iconMenuColor : undefined}
          />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          classes={{ paper: classes.menuPaper }}
          onClose={this.handleClose}
        >
          {items.map((item, i) => (
            <MenuItem
              style={{
                ...this.menuItemStyles,
                ...(selectedItemId == item.id
                  ? this.props.selectedItemStyle
                  : null),
              }}
              key={i}
              disabled={item.disabled}
              onClick={item.onClick}
            >
               <Folder style={{width: 15,
    height: 15,
    marginRight: 5}} />
             {item.text}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

ListMenu.propTypes = {
  items: PropTypes.array.isRequired,
  iconMenuColor: PropTypes.string,
};

export default withStyles(useStyles)(ListMenu);
