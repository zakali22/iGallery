export default function(state = null, action) {
  switch (action.type) {
    case "FETCH_USER":
      return {
        user: action.payload || false
      };
      break;
    default:
      return state;
  }
}
