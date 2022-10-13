import React from "react";
import WrapperSpendingToWallet from "../InfoSpendingToWallet/InfoSpendingToWallet.styles";

export default function ShoeInfo({ dataShoeInfo }) {
  return (
    <WrapperSpendingToWallet>
      <div className="info">
        <div className="info-title">
          <img src={"https://hub.befitter.io/assets/icons/shoe-standard.svg"} alt="fiu" loading="lazy" style={{ objectFit: "cover" }} width="24px" height="25px" />
          <span>SHOE</span>
        </div>
        <p>
          Main Wallet : &nbsp;<span className="info-amount">{dataShoeInfo.inMainWallet}</span>
        </p>
        <p>
          Spending : &nbsp;<span className="info-amount">{dataShoeInfo.inSpending}</span>
        </p>
        <p>
          Genesis : &nbsp;<span className="info-amount">{dataShoeInfo.genesis}</span>
        </p>
      </div>
    </WrapperSpendingToWallet>
  );
}
