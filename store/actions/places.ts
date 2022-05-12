export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = "FETCH_PLACES";
import { generateUUID } from "../../utils";
import { realTimeDB } from "../../constants";
import * as FileSystem from "expo-file-system";
import { insertPlace, queryPlaces } from "../../helpers/db";
import { SQLResultSet } from "expo-sqlite";

export const addPlace = (title: string, imageUri?: string) => {
  return async (reduxDispatch: Function, getState: Function) => {
    const authToken = getState().auth.token;

    // if (!authToken) {
    //   console.log(`Found no token`);
    //   return;
    // }
    const _id = generateUUID().slice(0, 7);
    let imageLocation = "";
    try {
      if (imageUri) {
        imageLocation = `${FileSystem.documentDirectory}${_id}.jpg`;
        await FileSystem.moveAsync({ from: imageUri, to: imageLocation });
        const dbResult = await insertPlace(
          title,
          imageLocation,
          "Dummy Address",
          10.5,
          10.5
        );
        return reduxDispatch({
          type: ADD_PLACE,
          placeData: {
            id: (dbResult as SQLResultSet).insertId?.toString(),
            title,
            imageUri: imageLocation,
          },
        });
      }
    } catch (err) {
      console.log(err); // Like handle http errors
    }

    // const response = await fetch(
    //   `${realTimeDB}/places.json?auth=${authToken}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id: _id,
    //       title,
    //       imageUri: imageLocation,
    //     }),
    //   }
    // );
    //Firebase also have a schema check, it doesn't allow adding property on the fly
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

export const loadPlaces = () => {
  return async (reduxDispatch: Function) => {
    const sqlResult = await queryPlaces(); // it's an object :/
    return reduxDispatch({
      type: FETCH_PLACES,
      placesData: (sqlResult as SQLResultSet).rows._array,
    });
  };
};

// WebSQLResultSet {
//   "insertId": undefined,
//   "rows": WebSQLRows {
//     "_array": Array [
//       Object {
//         "address": "Dummy Address",
//         "id": 1,
//         "imageUri": "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540mt1988%252Freact-native-practice/f56dfed.jpg",
//         "lat": 10.5,
//         "lng": 10.5,
//         "title": "Tokyo",
//       },
//     ],
//     "length": 1,
//   },
//   "rowsAffected": 0,
// }
