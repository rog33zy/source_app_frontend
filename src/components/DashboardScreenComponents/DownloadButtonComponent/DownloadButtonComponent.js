import React from "react";

import { Grid, Button } from "@material-ui/core";

const DownloadButtonComponent = (props) => {
  return (
    <Grid item xs={6} style={{ textAlign: "center" }}>
      <Button
        onClick={props.onClick}
        style={{ width: "90%" }}
        variant="contained"
        color="primary"
        disabled={props.disabled}
      >
        {props.label}
      </Button>
    </Grid>
  );
};

export default DownloadButtonComponent;
