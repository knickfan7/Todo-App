import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registerUser } from "../actions/auth";
import { Modal, Typography } from "@material-ui/core";

const required = (value) => (value ? undefined : "Required");
const minLength = (min: number) => (value: String) =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;

const passwordMin = minLength(8);

const maxLength = (max: number) => (value: String) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const passwordMax = maxLength(15);

function RegisterForm(props) {
  const onSubmit = (form: Object) => {
    props.registerUser(form);
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
        <Typography variant="h6">Sign Up</Typography>
        <form onSubmit={props.handleSubmit(onSubmit)} className="ui form">
          <Field
            name="username"
            type="text"
            component={renderFields}
            label="Username"
            validate={required}
          />
          <Field
            name="email"
            type="email"
            component={renderFields}
            label="Email"
            validate={required}
          />
          <Field
            name="password"
            type="password"
            component={renderFields}
            label="Password"
            validate={[required, passwordMin, passwordMax]}
          />
          <button className="login-btn">Register</button>
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

function mapStateToProps(state) {
  return { isAuthenticated: state.auth.isAuthenticated };
}

export default reduxForm({ form: "registerForm" })(
  connect(mapStateToProps, { registerUser })(RegisterForm)
);
