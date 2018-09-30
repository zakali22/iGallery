import axios from "axios";

export const getPhotos = () => async dispatch => {
  const res = await axios.get("/api/unsplash/getPhotos");
  console.log(res.data);
  dispatch({
    type: "GET_PHOTOS",
    payload: res.data
  });
};
