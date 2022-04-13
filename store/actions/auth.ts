import { firebaseKEY } from "../../constants";

export const SIGN_UP = "SIGN_UP";

export const signup = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (reduxThunkDispatch: Function) => {
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
    console.log(email, "awaits response");


    //Note that despite the method being named json(), the result is not JSON
    //but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.

    //console.log(resData);

    reduxThunkDispatch({
      type: SIGN_UP,
    });
  };
  // isn't this call back?
};
