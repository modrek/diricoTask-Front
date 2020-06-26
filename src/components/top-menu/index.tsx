import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Face";
import { Breadcrumbs, Link } from "@material-ui/core";
import { NavLink } from 'react-router-dom';
import "./style.css";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export const TopMenu = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="nav-link dropdownlink" to="/" >   dirico.io </NavLink>
          <NavLink className="nav-link dropdownlink" to="/Folder" >   Folder </NavLink>
          {/* <Link color="inherit" href="/" onClick={() => console.log(12)}>
            Dirico.io
          </Link> */}
          {/* <Link
            color="inherit"
            href="/getting-started/installation/"
            onClick={() => console.log("22")}
          >
            Core
          </Link> */}
          <Typography color="textPrimary">Current</Typography>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};
