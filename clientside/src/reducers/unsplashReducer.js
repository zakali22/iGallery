export default function(state = null, action) {
  switch (action.type) {
    case "GET_PHOTOS":
      return action.payload;
    case "GET_PHOTO":
      return {
        ...state,
        imageLink: action.payload
      };
    default:
      return state;
  }
}
