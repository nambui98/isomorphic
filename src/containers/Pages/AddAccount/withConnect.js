import { connect } from "react-redux";
import roleAction from "@iso/redux/role/actions";
import accountAction from "@iso/redux/account/actions";

function mapStateToProps(state) {
  const { listRole } = state.Role;

  return {
    listRole,
  };
}

function mapDispatchToProps(dispatch) {
  const { addAccountAction } = accountAction;

  return {
    getAllRole: () => dispatch({ type: roleAction.GET_ALL_ROLE }),
    addAccount: (payload) => dispatch(addAccountAction(payload)),
  };
}

// export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true });
export default connect(mapStateToProps, mapDispatchToProps);
