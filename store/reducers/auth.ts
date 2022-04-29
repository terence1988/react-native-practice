import { SIGN_UP, SIGN_IN, LOG_OUT } from "../actions/auth";
const initialState: {
  token: string;
  userId: string;
} = {
  token: "",
  userId: "",
};

export default (state = initialState, action: any) => {
  // KHPEYVJnBNcHwTRi3gLhJzcBCPc2 -- userId
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case SIGN_IN:
      return { ...state, token: action.token, userId: action.userId };
    case LOG_OUT:
      return {
        ...state,
        token: "",
        userId: "",
      };
    default:
      return { ...state };
  }
};
