const actions = {
  GET_HEE: "GET_HEE",
  GET_HEE_PENDING: "GET_HEE_PENDING",
  GET_HEE_SUCCESS: "GET_HEE_SUCCESS",

  getHeeInfo: (payload) => ({
    type: actions.GET_HEE,
    payload,
  }),
};
export default actions;
