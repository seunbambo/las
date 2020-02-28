import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#EAFAF1"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    fontSize: 14,
    marginLeft: 3,
    color: 'white',
    padding: 10,
    backgroundColor: "#4FDB93",
    borderRadius: 4
  },
  iconButton2: {
    fontSize: 14,
    marginLeft: 3,
    color: 'white',
    padding: 6,
    
    backgroundColor: "#4FDB93",
    borderRadius: 4
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function TransparentButton() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search..."
        inputProps={{ "aria-label": "search google maps" }}
      />

    </Paper>
  );
}
