import React from "react";

import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import { logoutAction } from "../../../store/actions";

import { AppBar, Toolbar, Button } from "@material-ui/core";

import classes from "./AppBarComponent.module.css";

import gnaLogo from "../../../assets/images/GNALOGO2.png";

function DenseAppBar(props) {
  let authRedirect = null;
  const isAuthenticated = localStorage.getItem("gnaAuthenticated");
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  } else {
    authRedirect = <Redirect to="/dashboard" />;
  }

  const logoutHandler = () => {
    props.onLogout();
  };
  return (
    <div>
      {authRedirect}
      <AppBar position="static">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          variant="dense"
        >
          <div className={classes.gnaLogoContainer}>
            <img className={classes.gnaLogo} src={gnaLogo} alt="GNA" />
          </div>
          {props.isAuthenticated ? (
            <Button style={{ color: "white" }} onClick={logoutHandler}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.accessToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logoutAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DenseAppBar);
