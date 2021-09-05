import React from "react";

import { Grid } from "@material-ui/core";
import Skeleton from "react-loading-skeleton";

import PaperComponent from "../../UI/PaperComponent/PaperComponent";
import TextFieldComponent from "../../UI/TextFieldComponent/TextFieldComponent";

import classes from "./TotalComponent.module.css";

const TotalComponent = (props) => {
  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={2}>
        <div className={classes.TotalComponent}>
          <PaperComponent height={40}>
            {props.isSelectTextField ? (
              <TextFieldComponent
                select={true}
                label={props.label}
                disabled={props.disabled}
                selectOptions={props.selectOptions}
                exportValueFunction={props.exportValueFunction}
                defaultValue={props.defaultValue}
              />
            ) : (
              <React.Fragment>
                {(
                  <React.Fragment>
                    {" "}
                    {props.heading}:&nbsp;
                    <strong>
                      {props.value}
                      &nbsp;
                      {props.symbol}
                    </strong>{" "}
                  </React.Fragment>
                ) || <Skeleton />}
              </React.Fragment>
            )}
          </PaperComponent>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default TotalComponent;
