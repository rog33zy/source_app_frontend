import React from "react";

import { connect } from "react-redux";

import { Switch, Route } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";

import { CssBaseline } from "@material-ui/core";

import GNATheme from "./customTheme/CustomTheme";

import { DashboardScreen, LoginScreen } from "./screens/";

import { authCheckStateAction } from "./store/actions";

import AppBarComponent from "./components/UI/AppBarComponent/AppBarComponent";

function App(props) {
  React.useEffect(() => {
    props.onTryAutoLogin();
  }, [props]);

  let routes = (
    <Switch>
      <Route exact path="/" component={LoginScreen} />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/dashboard" component={DashboardScreen} />
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={GNATheme}>
      <CssBaseline />
      <Switch>
        <AppBarComponent>{routes}</AppBarComponent>
      </Switch>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.accessToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(authCheckStateAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
