import { FETCH_CURRENT_USER } from '../actions';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      //authenticated / not authenticated
      return action.payload.data || false;
    default:
      return state;
  }
}
