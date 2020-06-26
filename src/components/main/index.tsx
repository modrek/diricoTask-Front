import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Assets from '../assets/index';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  fullWidth: {
    width: "100%"
  }
}));

// export const MainContent:React.FC<children> = ({ children }) => {
export const MainContent: React.FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />

      <div className={classes.title}>
        {/* <Typography variant="h6">Title</Typography> */}
        <Assets></Assets>
      </div>
      <div className={classes.content}></div>
    </main>
  );
};
