import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

export default function SimplePaper(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      margin: "15px",
      justifyContent: "center",
      alignContent: "center",
      [theme.breakpoints.up("md")]: {
        height: props.height,
      },
      [theme.breakpoints.up("xl")]: {
        height: props.lgHeight,
      },
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={1} className={classes.root} onClick={props.onClick}>
        {props.children}{" "}
      </Paper>
    </div>
  );
}
