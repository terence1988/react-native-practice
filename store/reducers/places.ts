import { ADD_PLACE } from "../actions/places";
import Place from "../../models/place";
import { generateUUID } from "../../utils";

const initialState: {
  places: Place[];
} = {
  places: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        generateUUID().slice(0, 7),
        action.placeData.title
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return { ...state };
  }
};
