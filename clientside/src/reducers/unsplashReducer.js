export default function(state = null, action) {
  switch (action.type) {
    case "GET_PHOTOS":
      return {
        data: action.payload
      };
    case "GET_PHOTO":
      return {
        ...state,
        image: action.payload
      };
    default:
      return state;
  }
}
