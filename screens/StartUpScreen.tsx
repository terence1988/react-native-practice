import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { SIGN_IN } from "../store/actions/auth";

interface UserData {
  expiresAt: string;
  token: string;
  userId: string;
}

const StartUpScreen = (props: any) => {
  const { getItem, setItem } = useAsyncStorage("userData");

  const dispatch = useDispatch();

  const readItemfromStraorage = async () => {
    const user = await getItem().then((res) => JSON.parse(res as string));

    if (!user || !user.token || !user.userId) {
      props.navigation.navigate("Auth");
    }

    if (user && user.expiresAt && new Date().toISOString() >= user.expiresAt) {
      //it can be done directly -- good2know
      props.navigation.navigate("Auth");
    }

    if (user) {
      dispatch({
        type: SIGN_IN,
        userId: user.userId,
        token: user.token,
      });
      props.navigation.navigate("Main");
    }
  };

  useEffect(() => {
    readItemfromStraorage();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default StartUpScreen;

// Object {
//     "expiresAt": "2022-04-28T07:02:24.927Z",
//     "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcm4tc3RvcmUtYXBwLTM0NjIwMCIsImF1ZCI6InJuLXN0b3JlLWFwcC0zNDYyMDAiLCJhdXRoX3RpbWUiOjE2NTExMjU3NDUsInVzZXJfaWQiOiJLSFBFWVZKbkJOY0h3VFJpM2dMaEp6Y0JDUGMyIiwic3ViIjoiS0hQRVlWSm5CTmNId1RSaTNnTGhKemNCQ1BjMiIsImlhdCI6MTY1MTEyNTc0NSwiZXhwIjoxNjUxMTI5MzQ1LCJlbWFpbCI6ImF3c3Rlc3QxMTExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhd3N0ZXN0MTExMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.VHBNfBAI69Ax7OSOn4RkRQiuqhki0xu0hmoIuS_xnwbuPgo2iSHQpDqfFH6Am-imX1ig_RNJHXFf7bYSvcVvCbhcRmM1F48mefkhDKfuYZefDFbGtDACn80rqBW94kYL98cK3Mlv6tJOQSzOXmHhrB-GCOONREZR4dpye9W_PIyKHfE-a6XszdUkcQZlnVma3YGbOyUa8PkNcJv6D-w4qDWihITG7E2w1Nv4z5I3tyUItBKQdaLKCAeDE_xJ6kczTaP5-nyxGBQOHQKqKjsFUFEob43uRo-8ffBPzxogr89MpQgiEfT6w6Wzitz08oHgupCXWALBeBmO9QNjUbiXwA",
//     "userId": "KHPEYVJnBNcHwTRi3gLhJzcBCPc2",
//   }

// This string can be compared :\ ?
