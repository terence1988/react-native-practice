import { ADD_PLACE, FETCH_PLACES } from "../actions/places";
import Place from "../../models/place";

const initialState: {
  places: Place[];
} = {
  places: [],
  // places: [{id:"guid-2222",title:"title-2222"}],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id,
        action.placeData.title,
        action.placeData.imageUri
      );
      return {
        ...state,
        places: state.places.concat(newPlace),
      };

    case FETCH_PLACES:
      return {
        ...state,
        places: action.placesData.map(
          (place: any) => new Place(place.id, place.title, place.imageUri)
        ),
      };
    default:
      return { ...state };
  }
};
