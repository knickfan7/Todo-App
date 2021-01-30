import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todos";
import TodoForm from "./todoform";

function TodoCreate(props) {
  const onSubmit = (formValues) => {
    props.addTodo(formValues);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <TodoForm destroyOnUnmount={false} onSubmit={onSubmit} />
    </div>
  );
}


export default connect(null, { addTodo })(TodoCreate);
