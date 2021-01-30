import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core";

function TodoEditModal(props) {
  const [changes, setChanges] = useState(props.todo);

  const onEdit = () => {
    props.onEdit(props.id, changes);
    props.setOpen(-1);
  };

  const onChange = (e, type) => {
    if (type === "task") {
      changes.task = e.target.value;
    } else {
      changes.description = e.target.value;
    }
    setChanges(changes);
  };

  const body = (
    <div>
      <h2>Edit Todo</h2>
      <hr />
      <label>Task Name:</label>
      <input
        type="text"
        defaultValue={changes.task}
        onChange={(e) => onChange(e, "task")}
      />

      <label>Description:</label>
      <input
        type="text"
        defaultValue={changes.description}
        onChange={(e) => onChange(e, "description")}
      />
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
        onClick={() => onEdit()}
      >
        Save
      </Button>
    </div>
  );

  return (
    <Modal
      className="modal lg"
      open={props.open === props.id}
      onClose={() => props.setOpen(-1)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default TodoEditModal;
