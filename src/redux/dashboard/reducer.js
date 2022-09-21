import actions from "./actions";

const initState = { listDataHee: {}, loading: false };

export default function dashboardReducer(state = initState, action) {
  console.log("dsaueywuqruiweyrwqe", action);
  switch (action.type) {
    case actions.GET_HEE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_HEE_SUCCESS:
      return {
        ...state,
        loading: false,
        listDataHee: action.payload.data,
      };

    default:
      return state;
  }
}
