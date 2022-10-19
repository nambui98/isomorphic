import actions from "./actions";

const initState = { listDataHee: {}, dataMint: {}, loading: false, listDataInfoSpendingToWallet: [], dataShoeInfo: {}, dataActivityInfo: {}, dataActivityFee: {} };

export default function dashboardReducer(state = initState, action) {
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
    case actions.GET_INFO_SENDING_TO_WALLET_SUCCESS:
      return {
        ...state,
        listDataInfoSpendingToWallet: action.payload.data,
      };
    case actions.GET_SHOE_INFO_SUCCESS:
      return {
        ...state,
        dataShoeInfo: action.payload.data,
      };
    case actions.GET_ACTIVE_INFO_SUCCESS:
      return {
        ...state,
        dataActivityInfo: action.payload.data,
      };
    case actions.GET_ACTIVE_FEE_SUCCESS:
      return {
        ...state,
        dataActivityFee: action.payload.data,
      };
    case actions.GET_MINT_INFO_SUCCESS:
      return {
        ...state,
        dataMint: action.payload.data,
      };

    default:
      return state;
  }
}
