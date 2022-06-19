// for Add New Item in table
export const AddCart = (data) => async (dispatch) => {
  dispatch({ type: "ADD_DATA", payload: data });
};
