import {
  NEW_POST,
  GET_ONE_POST,
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case GET_ONE_POST:
      return action.payload;
    case NEW_POST:
      return action.payload;
    case UPDATE_POST:
      return action.payload;
    case DELETE_POST:
      return action.payload;
    default:
      return state;
  }
}
