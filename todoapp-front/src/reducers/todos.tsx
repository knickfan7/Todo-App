import { GET_TODOS, ADD_TODO, DELETE_TODO, EDIT_TODO } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        ...action.payload,
      };

    case ADD_TODO:
      return {
        ...state,
        ...action.payload,
      };

    case DELETE_TODO:
      return action.payload;

    case EDIT_TODO:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
