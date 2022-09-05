import styled from "styled-components";
import WithDirection from "@iso/lib/helpers/rtl";

const NotiWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .button-group {
    margin: auto;
  }
`;

export default WithDirection(NotiWrapper);
