import axios from "axios";
import { GET_TODOS, ADD_TODO, DELETE_TODO, EDIT_TODO } from "./types";
import { tokenConfig } from "./auth";
import { reset } from "redux-form";

export const getTodos = () => async (dispatch, state) => {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/todos/",
    tokenConfig(state)
  );
  dispatch({
    type: GET_TODOS,
    payload: response.data,
  });
};

export const addTodo = (todo: Object) => async (dispatch, state) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/add/",
    {
      ...todo,
    },
    tokenConfig(state)
  );

  dispatch({
    type: ADD_TODO,
    payload: response.data,
  });
  dispatch(reset("todoForm"));
};

export const deleteTodo = (id: number) => async (dispatch, state) => {
  const response = await axios.delete(
    "http://127.0.0.1:8000/api/delete/" + id + "/",
    tokenConfig(state)
  );

  dispatch({
    type: DELETE_TODO,
    payload: response.data,
  });
};

export const editTodo = (id: number, changes: Object) => async (dispatch, state) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/edit/" + id + "/",
    {
      id,
      changes,
    },
    tokenConfig(state)
  );
  dispatch({
    type: EDIT_TODO,
    payload: response.data,
  });
};
