const actions = {
  GET_ALL_ROLE: "GET_ALL_ROLE",
  GET_ALL_ROLE_PENDING: "GET_ALL_ROLE_PENDING",
  GET_ALL_ROLE_SUCCESS: "GET_ALL_ROLE_SUCCESS",
  GET_ALL_ROLE_ERROR: "GET_ALL_ROLE_ERROR",
  CHANGE_ROLE_ID: "CHANGE_ROLE_ID",
  ADD_NEW_ROLE: "ADD_NEW_ROLE",
  ADD_NEW_ROLE_PENDING: "ADD_NEW_ROLE_PENDING",
  ADD_NEW_ROLE_SUCCESS: "ADD_NEW_ROLE_SUCCESS",
  EDIT_ROLE: "EDIT_ROLE",
  EDIT_ROLE_SUCCESS: "EDIT_ROLE_SUCCESS",
  EDIT_ROLE_PENDING: "EDIT_ROLE_PENDING",
  changeIdRole: (id) => ({
    type: actions.CHANGE_ROLE_ID,
    payload: id,
  }),
  editRole: (payload) => ({
    type: actions.EDIT_ROLE,
    payload,
  }),
  addRoleName: (payload) => ({
    type: actions.ADD_NEW_ROLE,
    payload,
  }),
};
export default actions;
