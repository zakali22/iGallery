export default function(state = null, action) {
  switch (action.type) {
    case "FETCH_USER":
      return {
        user: action.payload
      };
      break;
    case "EDIT_USER":
      return {
        user: action.payload
      };
      break;
    default:
      return state;
  }
}
