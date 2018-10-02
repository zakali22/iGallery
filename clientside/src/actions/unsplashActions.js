import axios from "axios";

export const getPhotos = page => async dispatch => {
  const res = await axios.get(`/api/unsplash/getPhotos/${page}`);
  console.log(res.data);
  dispatch({
    type: "GET_PHOTOS",
    payload: res.data
  });
};
