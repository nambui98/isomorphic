import actions from "./actions";

const initState = { listCdn: {}, loading: false, loadingViewContent: false, versionId: null, contentVersion: null, editView: false, addCdn: false, statusAddCdn: false };

export default function cdnReducer(state = initState, action) {
  console.log("dsaueywuqruiweyrwqe", action);
  switch (action.type) {
    case actions.GET_LIST_CDN_SUCCESS:
      return {
        ...state,
        listCdn: action.payload.data,
        loading: false,
      };
    case actions.GET_LIST_CDN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_LIST_CDN_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actions.CHANGE_VERSION_ID:
      return {
        ...state,
        versionId: action.payload,
      };
    case actions.VIEW_VERSION_CONTENT_SUCCESS:
      return {
        ...state,
        contentVersion: action.payload.data,
        editView: false,
        addCdn: false,
        loadingViewContent: false,
      };
    case actions.VIEW_VERSION_CONTENT_PENDING:
      return {
        ...state,
        loadingViewContent: true,
      };
    case actions.VIEW_VERSION_CONTENT_ERROR:
      return {
        ...state,
        loadingViewContent: false,
      };
    case actions.VIEW_CHANGE:
      return {
        ...state,
        editView: action.payload,
      };
    case actions.ADD_CDN_ACTION:
      return {
        ...state,
        addCdn: true,
        editView: true,
      };
    case actions.EDIT_VIEW_VERSION_PENDING:
      return {
        ...state,
        statusAddCdn: false,
      };
    case actions.EDIT_VIEW_VERSION_SUCCESS:
      return {
        ...state,
        statusAddCdn: true,
      };
    default:
      return state;
  }
}
