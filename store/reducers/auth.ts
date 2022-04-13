import { SIGN_UP } from "../actions/auth";
const initialState: {
  user:
    | {
        email: string;
        password: string;
      }
    | unknown;
} = {
  user: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
