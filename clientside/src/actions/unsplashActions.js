import axios from "axios";

export const getPhotos = page => async dispatch => {
  const res = await axios.get(`/api/unsplash/getPhotos/${page}`);
  dispatch({
    type: "GET_PHOTOS",
    payload: res.data
  });
};

export const getPhoto = id => async dispatch => {
  const res = await axios.get(`/api/unsplash/getPhoto/${id}`);
  dispatch({
    type: "GET_PHOTO",
    payload: res.data
  });
};

export const searchPhoto = query => async dispatch => {
  const res = await axios.post(`/api/unsplash/searchPhoto`, {
    search: query
  });

  dispatch({
    type: "SEARCH_PHOTO",
    payload: res.data
  });
};
