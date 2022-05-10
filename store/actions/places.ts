export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = "FETCH_PLACES";
import { generateUUID } from "../../utils";
import { realTimeDB } from "../../constants";
import * as FileSystem from "expo-file-system";

export const addPlace = (title: string, imageUri?: string) => {
  return async (reduxDispatch: Function, getState: Function) => {
    const authToken = getState().auth.token;

    if (!authToken) {
      console.log(`Found no token`);
      return;
    }
    const _id = generateUUID().slice(0, 7);
    let imageLocation = "";
    try {
      if (imageUri) {
        imageLocation = `${FileSystem.documentDirectory}${_id}.jpg`;
        await FileSystem.moveAsync({ from: imageUri, to: imageLocation });
      }
    } catch (err) {
      console.log(err); // Like handle http errors
    }

    const response = await fetch(
      `${realTimeDB}/places.json?auth=${authToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: _id,
          title,
          imageUri: imageLocation,
        }),
      }
    );
    //Firebase also have a schema check, it doesn't allow adding property on the fly
    return reduxDispatch({
      type: ADD_PLACE,
      placeData: {
        id: _id,
        title,
        imageUri: imageLocation,
      },
    });
  };
};

export const fetchPlaces = () => {
  return async (reduxDispatch: Function) => {
    const resData = await (await fetch(`${realTimeDB}/places.json`)).json();
    const placesData = [];

    for (const key in resData) {
      if (resData.hasOwnProperty(key)) {
        placesData.push(resData[key]);
      }
    }

    return reduxDispatch({
      type: FETCH_PLACES,
      placesData,
    });
  };
};
