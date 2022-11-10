function ascendingSort(contact1, contact2) {
  const name1 = contact1.name ? contact1.name.toUpperCase() : "~";
  const name2 = contact2.name ? contact2.name.toUpperCase() : "~";
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

const actions = {
  GET_LIST_GROUP: "GET_LIST_GROUP",
  GET_LIST_GROUP_SUCCESS: "GET_LIST_GROUP_SUCCESS",
  GET_LIST_GROUP_PENDING: "GET_LIST_GROUP_PENDING",
  CHANGE_GROUP_ID: "CHANGE_GROUP_ID",
  CHANGE_VIEW: "CHANGE_VIEW",
  CHANGE_GROUP: "CHANGE_GROUP",
  EDIT_GROUP: "EDIT_GROUP",
  ACTIVE_VIEW: "ACTIVE_VIEW",
  DELETE_GROUP: "DELETE_GROUP",
  UPDATE_GROUP: "UPDATE_GROUP",
  ADD_GROUP_ACTION: "ADD_GROUP_ACTION",
  ADD_GROUP: "ADD_GROUP",
  ADD_GROUP_SUCCESS: "ADD_GROUP_SUCCESS",
  ADD_GROUP_PENDING: "ADD_GROUP_PENDING",
  DELETE_GROUP_REQUEST: "DELETE_GROUP_REQUEST",
  DELETE_GROUP_REQUEST_PENDING: "DELETE_GROUP_REQUEST_PENDING",
  DELETE_GROUP_REQUEST_SUCCESS: "DELETE_GROUP_REQUEST_SUCCESS",
  LIST_PERMISSION_BY_GROUP: "LIST_PERMISSION_BY_GROUP",
  LIST_PERMISSION_BY_GROUP_SUCCESS: "LIST_PERMISSION_BY_GROUP_SUCCESS",
  ADD_PERMISSIONS: "ADD_PERMISSIONS",
  GET_LIST_PERMISSIONS: "GET_LIST_PERMISSIONS",
  GET_LIST_PERMISSIONS_SUCCESS: "GET_LIST_PERMISSIONS_SUCCESS",
  PERMISSIONS_SELECTED: "PERMISSIONS_SELECTED",
  UPDATE_GROUP_PERMISSIONS: "UPDATE_GROUP_PERMISSIONS",
  UPDATE_GROUP_PERMISSIONS_PENDING: "UPDATE_GROUP_PERMISSIONS_PENDING",
  UPDATE_GROUP_PERMISSIONS_SUCCESS: "UPDATE_GROUP_PERMISSIONS_SUCCESS",
  UPDATE_ROLE_GROUP: "UPDATE_ROLE_GROUP",
  UPDATE_ROLE_GROUP_SUCCESS: "UPDATE_ROLE_GROUP_SUCCESS",
  UPDATE_ROLE_GROUP_PENDING: "UPDATE_ROLE_GROUP_PENDING",
  changeIdGroup: (payload) => ({
    type: actions.CHANGE_GROUP_ID,
    payload,
  }),
  viewChange: (payload) => ({
    type: actions.CHANGE_VIEW,
    payload,
  }),
  updateGroup: (payload) => ({
    type: actions.UPDATE_GROUP,
    payload,
  }),
  addGroupAction: (payload) => ({
    type: actions.ADD_GROUP,
    payload,
  }),
  deleteGroup: (payload) => ({
    type: actions.DELETE_GROUP_REQUEST,
    payload,
  }),
  getListPermissionByGroup: (payload) => ({
    type: actions.LIST_PERMISSION_BY_GROUP,
    payload,
  }),
  allPermissionSelected: (payload) => ({
    type: actions.PERMISSIONS_SELECTED,
    payload,
  }),
  updatePermissionGroup: (payload) => ({
    type: actions.UPDATE_GROUP_PERMISSIONS,
    payload,
  }),
  updateGroupByRole: (payload) => ({
    type: actions.UPDATE_ROLE_GROUP,
    payload,
  }),
  editContact: (newContact) => {
    return (dispatch, getState) => {
      const contacts = getState().GroupPermission.listGroup;
      const newContacts = [];
      contacts.forEach((contact) => {
        if (contact.id === newContact.id) {
          newContacts.push(newContact);
        } else {
          newContacts.push(contact);
        }
      });
      dispatch({
        type: actions.EDIT_GROUP,
        groups: newContacts.sort(ascendingSort),
      });
    };
  },
};
export default actions;
