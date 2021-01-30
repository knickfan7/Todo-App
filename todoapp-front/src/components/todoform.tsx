import React from "react";
import { Field, reduxForm } from "redux-form";
import { Card, CardHeader, CardContent } from "@material-ui/core";

function TodoForm(props) {
  const onSubmit = (form) => {
    props.onSubmit(form);
  };

  return (
    <div className="task-form">
      <Card>
        <CardHeader title={"Create Todo"}></CardHeader>
        <CardContent>
          <form
            onSubmit={props.handleSubmit(onSubmit)}
            className="task-form error"
          >
            <Field name="task" component={renderFields} label="Task Title: " />
            <Field
              name="description"
              component={renderFields}
              label="Description: "
            />
            <button className="task-btn">Add</button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const validate = (formValues) => {
  const errors: any = {};

  if (!formValues.task) {
    errors.task = "Please enter at least 1 character";
  }

  return errors;
};

const renderFields = ({ input, label, meta: { touched, error } }) => {
  return (
    <div className={`field ${touched && error ? "error" : ""}`}>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      {touched && error && (
        <span className="ui pointing red basic label">{error}</span>
      )}
    </div>
  );
};

export default reduxForm({
  form: "todoForm",
  touchOnBlur: false,
  validate,
})(TodoForm);
