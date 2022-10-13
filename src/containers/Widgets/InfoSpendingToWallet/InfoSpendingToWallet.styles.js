import styled from "styled-components";
import WithDirection from "@iso/lib/helpers/rtl";

const WrapperSpendingToWallet = styled.div`
  display: flex;
  gap: 20px;

  .info {
    padding: 10px;
    width: 350px;
    font-size: 16px;
    background: rgb(50, 53, 70);
    border-radius: 8px;
    box-shadow: rgb(88 102 126 / 8%) 0px 4px 24px, rgb(88 102 126 / 12%) 0px 1px 2px;
    color: white;

    .info-title {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    .info-amount {
      color: #858ca2;
    }

    > p {
      line-height: 30px;
      font-width: 500;
    }
  }
`;

export default WithDirection(WrapperSpendingToWallet);
