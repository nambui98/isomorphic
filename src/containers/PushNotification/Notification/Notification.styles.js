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

  .button-primary {
    background: linear-gradient(180deg, #ff8a50 2.08%, #ff6d24 66.9%);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    color: white;
    font-style: italic;
    margin-left: 16px;
    &:hover {
      color: white;
      border: none;
    }
  }

  .disabled-button {
    display: none;
  }

  .ant-input-lg,
  .ant-select-selector {
    border-radius: 8px !important;
  }

  .text-label-input {
    font-weight: 500;
  }
`;

export default WithDirection(NotiWrapper);
