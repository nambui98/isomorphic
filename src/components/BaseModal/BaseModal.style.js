import styled from "styled-components";
const ModalStyle = styled.div`
  .modal-primary {
    z-index: 100;

    .ant-modal-content {
      height: calc(100vh - 40px);
      overflow: auto;
    }
  }
`;

export default ModalStyle;
