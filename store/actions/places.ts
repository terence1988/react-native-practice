export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title: string) => {
  return {
    type: ADD_PLACE,
    placeData: { title },
  };
};
