import fakeData from "./data";
import contactActions from "./actions";

const contacts = new fakeData(10).getAll();

const initState = {
  contacts,
  selectedId: contacts[0].id,
  editView: false,
  addRole: false,
};

export default function contactReducer(state = initState, action) {
  switch (action.type) {
    case contactActions.CHANGE_CONTACT:
      return {
        ...state,
        selectedId: action.id,
        editView: false,
        addRole: false,
      };
    case contactActions.ADD_CONTACT:
      return {
        ...state,
        contacts: action.contacts,
        selectedId: action.selectedId,
        editView: true,
        addRole: true,
      };
    case contactActions.EDIT_CONTACT:
      return {
        ...state,
        contacts: action.contacts,
      };
    case contactActions.DELETE__CONTACT:
      return {
        ...state,
        contacts: action.contacts,
        selectedId: action.selectedId,
      };
    case contactActions.EDIT_VIEW:
      console.log("kadshfhewuqf", action);
      return {
        ...state,
        editView: action.view,
      };
    default:
      return state;
  }
}

export { contacts };
