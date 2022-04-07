import React from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.authScreen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <View style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onValueChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password."
              onValueChange={() => {}}
              initialValue=""
            />
            <View style={styles.btnContainer}>
              <Button title="Login" onPress={() => {}} style={buttonStyle} />
              <Button title="Sign Up" onPress={() => {}} style={buttonStyle} />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
    borderRadius: 10,
  },
  btnContainer: {
    marginTop: 10,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

// passing styles to button as props
const buttonStyle = {
  button: {
    backgroundColor: "#61dafb",
    marginVertical: 4,
  },
  text: {
    paddingVertical: 0,
    lineHeight: 16,
  },
};

export default AuthScreen;
