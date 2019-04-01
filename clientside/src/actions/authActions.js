import axios from "axios";

export const fetchUser = async () => {
  const res = await axios.get("/auth/users");
  console.log(res.data);
  return {
    type: "FETCH_USER",
    payload: res.data
  };
};

export const editUser = async (data, id) => {
  const res = await axios.post(`/auth/edit/${id}`, data);

  console.log(res.data);
  return {
    type: "EDIT_USER",
    payload: res.data
  };
};
