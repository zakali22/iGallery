export default function(state = null, action) {
  switch (action.type) {
    case "GET_PHOTOS":
      return action.payload;
      break;
    default:
      return state;
  }
}
