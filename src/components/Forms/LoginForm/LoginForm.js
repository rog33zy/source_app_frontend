import React from "react";

import { connect } from "react-redux";

import { authAction } from "../../../store/actions";

import { TextFieldComponent, PaperComponent } from "../../UI";

import { Button, CircularProgress } from "@material-ui/core";

const LoginForm = (props) => {
  const [usernameOrEmailValue, setUsernameOrEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const onSubmitLoginFormHandler = (event) => {
    event.preventDefault();
    props.onLogginIn(usernameOrEmailValue, passwordValue);
  };

  return (
    <div>
      <form onSubmit={onSubmitLoginFormHandler}>
        <div style={{ width: "30%", margin: "0 auto" }}>
          <PaperComponent>
            <div style={{ margin: "14px" }}>
              <TextFieldComponent
                label="Email or Username"
                defaultValue=""
                exportValueFunction={setUsernameOrEmailValue}
                required={true}
              />

              <TextFieldComponent
                label="Password"
                defaultValue=""
                type="password"
                exportValueFunction={setPasswordValue}
                required={true}
              />

              {props.isLoading ? (
                <div style={{ marginLeft: "150px" }}>
                  <CircularProgress />
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "12px" }}
                  type="submit"
                >
                  login
                </Button>
              )}
              <div
                style={{ marginLeft: "20px", marginTop: "5px", color: "red" }}
              >
                {" "}
                {props.error}
              </div>
            </div>
          </PaperComponent>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLoading: state.auth.loading, error: state.auth.error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogginIn: (usernameOrEmail, password) =>
      dispatch(authAction(usernameOrEmail, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
