import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTodos, deleteTodo, editTodo } from "../actions/todos";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import TodoDelete from "./tododelete";
import TodoEdit from "./todoedit";

function TodoList(props) {
  const { getTodos } = props;
  const [open, setOpen] = useState();
  const [edit, setEdit] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  const onDelete = (id) => {
    props.deleteTodo(id);
  };

  const onEdit = (id, changes) => {
    props.editTodo(id, changes);
  };

  const handleClick = (id, type) => {
    if (type === "del") {
      setOpen(id);
    } else {
      setEdit(id);
    }
  };

  return (
    <div>
      <Typography variant="h5">My Todos</Typography>
      <Grid container spacing={3}>
        {props.todos.map((todo, id) => (
          <Grid item xs={3} key={id}>
            <Card className="card">
              <CardHeader title={todo.task} subheader={todo.description} />
              <CardContent>{"Created: " + todo.created}</CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  className="todo-edit"
                  onClick={() => handleClick(todo.id, "edit")}
                >
                  Edit
                </Button>
                {edit === todo.id && (
                  <TodoEdit
                    open={edit}
                    setOpen={setEdit}
                    todo={todo}
                    task={todo.task}
                    onEdit={onEdit}
                    id={todo.id}
                  />
                )}

                <Button
                  variant="contained"
                  className="todo-btn"
                  onClick={() => handleClick(todo.id, "del")}
                >
                  Delete
                </Button>
                {open === todo.id && (
                  <TodoDelete
                    open={open}
                    setOpen={setOpen}
                    task={todo.task}
                    id={todo.id}
                    onDelete={onDelete}
                  />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return { todos: Object.values(state.todos) };
}

export default connect(mapStateToProps, { getTodos, deleteTodo, editTodo })(
  TodoList
);
