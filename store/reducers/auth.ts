import { SIGN_UP, SIGN_IN } from "../actions/auth";
const initialState: {
  token: string;
  userId: string;
} = {
  token: "",
  userId: "",
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId,
       };
    case SIGN_IN:
      return {
       token: action.token,
       userId: action.userId,
      };
    default:
      return { ...state };
  }
};
