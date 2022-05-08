import { firebaseKEY } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";

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
      // It's in Auth -- Don't forget

      const expirationDate = new Date(
        new Date().getTime() + Number(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);

      reduxThunkDispatch({
        type: SIGN_UP,
        token: resData.idToken,
        userId: resData.localId,
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
      const resData = await response.json();

      const expirationDate = new Date(
        new Date().getTime() + Number(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);

      reduxThunkDispatch({
        type: SIGN_IN,
        token: resData.idToken,
        userId: resData.localId,
      });

      // [Unhandled promise rejection: Error: Email not found]
      // at node_modules\regenerator-runtime\runtime.js:63:36 in tryCatch
      // at node_modules\regenerator-runtime\runtime.js:294:29 in invoke

      // Object {
      //   "displayName": "",
      //   "email": "awstest1111@gmail.com",
      //   "expiresIn": "3600",
      //   "idToken": "eyJhbGciOixxxxxxM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcm4tc3RvcmUtYXBwLTM0NjIwMCIsImF1ZCI6InJuLXN0b3JlLWFwcC0zNDYyMDAiLCJhdXRoX3RpbWUiOjE2NTExMTAyOTMsInVzZXJfaWQiOiJLSFBFWVZKbkJOY0h3VFJpM2dMaEp6Y0JDUGMyIiwic3ViIjoiS0hQRVlWSm5CTmNId1RSaTNnTGhKemNCQ1BjMiIsImlhdCI6MTY1MTExMDI5MywiZXhwIjoxNjUxMTEzODkzLCJlbWFpbCI6ImF3c3Rlc3QxMTExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhd3N0ZXN0MTExMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.hA81kiTR2aIJiJMqo1CSaJNqH7d0rcGM0AiXsetM_8ASpN4V3lfujQ4OaFjJDtZ5lDSYPdtYsRxWDvuYLd63_6pYomJ1aka_Ew_4a8DeoN9fVXIskPUtX_YfP7FNu_PBJIB71-2pA_ArKeqoerlFaK7q1Kved-OQRu4D3HSPbwGAd0rHmsP_ukEWzh22OVL5evZrPQNIHcQg-mcs4BhyoI4XTi6NNm3Jba2BqtrMRlnOfin8dQZNFfGRftCVHnq_GClCupw-tVsmTxZAY4bpUK9Co_h6TkvORPcppRbF-oXjLlHI-J_FYP8cdMZ7BB20ycSg4qiYca7MTAScvw6Dcw",
      //   "kind": "identitytoolkit#VerifyPasswordResponse",
      //   "localId": "KHPEYVJnBNcHwTRi3gLhJzcBCPc2",
      //   "refreshToken": "AIwUxxxxx5NitqfLq-crDo0tD1C2nazChPILRZFiig7DNiuc1k8265LljNK0D24003KD_DRh44fUwHpTdbHLJtHI2cqXBc9Lthim9Ae18HhtW7hopoiIGgUTvTUMApuyWT6FhDnwTYyXnyzjBDIVK8KCRtSe4TweoJndq3N5m5azFJ1FT8h54IBq0B_ZCqKX0xuF1nyk9bABwgSB_vlDWZCj77TeGXWrdZIrsPg",
      //   "registered": true,
      // }
    }
  };
};

export const logout = () => {
AsyncStorage.removeItem("userData");
  return {
    type: LOG_OUT
  }
}


const saveDataToStorage = (token: string, userId: string, expiresAt: Date) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiresAt: expiresAt.toISOString(),
    })
  );
};
