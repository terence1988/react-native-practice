import { INIT_APP } from "../actions/init";

const initialState = {
  initialized: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        initialized: action.initialized,
      };
    default:
      return { ...state };
  }
};
