import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { loginUser } from "../actions/auth";
import { Modal, Typography } from "@material-ui/core";
import "./auth.scss";

function LoginForm(props) {
  const onSubmit = (form: Object) => {
    props.loginUser(form);
    if (props.isAuthenticated) {
      props.setOpen(false);
    }
  };

  return (
    <Modal
      className="todo-form"
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      <div>
        <Typography variant="h6">Sign In</Typography>
        <form onSubmit={props.handleSubmit(onSubmit)} className="ui form">
          <Field
            name="username"
            type="text"
            component={renderFields}
            label="Username"
          />
          <Field
            name="password"
            type="password"
            component={renderFields}
            label="Password"
          />
          <Field
            name="non_field_errors"
            type="hidden"
            component={hiddenFields}
          />
          <button className="login-btn">Login</button>
        </form>
      </div>
    </Modal>
  );
}

const renderFields = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className={`field ${touched && error ? "error" : ""}`}>
      <label>{label}</label>
      <input {...input} type={type} />
      {touched && error && (
        <span className="ui pointing red basic label">{error}</span>
      )}
    </div>
  );
};

const hiddenFields = ({ type, meta: { error } }) => {
  return (
    <div className="field">
      <input type={type} />
      {error && <div className="ui red message">{error}</div>}
    </div>
  );
};

function mapStateToProps(state) {
  return { isAuthenticated: state.auth.isAuthenticated };
}

export default reduxForm({ form: "loginForm" })(
  connect(mapStateToProps, { loginUser })(LoginForm)
);
