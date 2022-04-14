import { firebaseKEY } from "../../constants";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";

type credential = {
  email: string;
  password: string;
};

export const signup = ({ email, password }: credential) => {
  return async (reduxThunkDispatch: Function) => {
    // Auth from mobile resolved to IPv6 addresses so you NEED IT!!!

    //rn has two errors so some errors will not be handled by trycatch

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseKEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    ); // wtf - key has a return
    console.log("response:OK", response.ok);

    if (!response.ok) {
      let message = "Something went wrong";
      const errorResData = await response.json();
      const errirId = errorResData.error.message; // The message from firebase
      if (errirId === "EMAIL_EXISTS") {
        message = "Email exists";
      }
      if (errirId === "PERATION_NOT_ALLOWED") {
        message = "Contact admin";
      }
      if (errirId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        message = "Sign up too many times";
      }
      throw new Error(message);
    } else {
      const resData = await response.json();

      // Note that despite the method being named json(), the result is not JSON
      // but is instead the result of taking JSON as input and
      // parsing it to produce a JavaScript object.

      console.log(resData);

      reduxThunkDispatch({
        type: SIGN_UP,
      });
    }
  };
};

export const signin = ({ email, password }: credential) => {
  return async (reduxThunkDispatch: Function) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    ); // wtf - key has a return

    if (!response.ok) {
      let message = "Something went wrong";
      const errorResData = await response.json();
      const errirId = errorResData.error.message; // The message from firebase
      if (errirId === "EMAIL_NOT_FOUND") {
        message = "Email not found";
      }
      if (errirId === "INVALID_PASSWORD") {
        message = "Invalid password";
      }
      if (errirId === "USER_DISABLED") {
        message = "User disabled";
      }
      throw new Error(message);
    } else {
      reduxThunkDispatch({
        type: SIGN_IN,
      });

      // [Unhandled promise rejection: Error: Email not found]
      // at node_modules\regenerator-runtime\runtime.js:63:36 in tryCatch
      // at node_modules\regenerator-runtime\runtime.js:294:29 in invoke
    }
  };
};
