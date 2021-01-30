import React from "react";
import { Button, Modal } from "@material-ui/core";

function TodoDeleteModal(props) {
  
  const onDelete = () => {
    props.onDelete(props.id);
    props.setOpen(-1);
  };
  
  const body = (
    <div>
      <h2>Delete Todo</h2>
      <hr />
      <p>Are you sure you want to delete the task: {props.task}</p>
      <hr />

      <Button
        variant="contained"
        className="todo-btn confirm"
        onClick={() => props.setOpen(-1)}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        className="todo-btn confirm"
        onClick={() => onDelete()}
      >
        Delete
      </Button>
    </div>
  );
  return (
    <Modal
      className="modal"
      open={props.open === props.id}
      onClose={() => props.setOpen(-1)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default TodoDeleteModal;
