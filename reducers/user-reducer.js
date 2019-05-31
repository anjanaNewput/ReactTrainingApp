import { USER_LOGIN, IS_LOADING, FORM_STATE } from '../actions/user-action.js';

export default function user(state = {}, action) {

  switch (action.type) {
    case USER_LOGIN:
      state = {
        ...state,
        'user': action.user
      };
		  break;
    case IS_LOADING:
      state = {
        ...state,
        'isLoading': action.isLoading
      }
      break;
    case FORM_STATE:
      state = {
        ...state,
        'formData': action.formData
      }
      break;
    default:
      state = {
        ...state
      }
    }
    return state;
}
