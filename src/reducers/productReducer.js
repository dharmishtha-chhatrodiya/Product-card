export default (state = [], action) => {
  switch (action.type) {
    // for Add New Item in table
    case "ADD_DATA":
      return [...state, action.payload];
    default:
      return state;
  }
};
