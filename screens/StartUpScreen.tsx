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
//     "token": "eyJhbGciOiJzzzzzzzzzzzzzXwA",
//     "userId": "zzzzzzzzzzzzzzzhJzcBCPc2",
//   }

// This string can be compared :\ ?
