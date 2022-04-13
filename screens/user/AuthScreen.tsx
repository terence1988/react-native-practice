import React, { SetStateAction, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

type IFormValues = {
  email: string;
  password: string;
};

type IFormValidities = {
  [key in keyof IFormValues]: boolean;
}; // keyof IFormValues is a string

interface IFormState {
  inputValues: IFormValues;
  inputValidities: IFormValidities;
  formIsValid: boolean;
}

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state: IFormState, action: any) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid =
        updatedFormIsValid && updatedValidities[key as keyof IFormValidities]; //Good to know
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const signupHandler = () => {
    dispatch(
      authActions.signup({
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      })
    );
  };

  return (
    <SafeAreaView>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.authScreen}
          keyboardVerticalOffset={-130} //??????? A big need to fix it
        >
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
                onInputChange={inputChangeHandler}
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
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <View style={styles.btnContainer}>
                <Button title="Login" onPress={() => {}} style={buttonStyle} />
                <Button
                  title="Sign Up"
                  onPress={signupHandler}
                  style={buttonStyle}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
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
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  btnContainer: {
    marginTop: 10,
  },
  gradient: {
    width: "100%",
    height: "100%",
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
