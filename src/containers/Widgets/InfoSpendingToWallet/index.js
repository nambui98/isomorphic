import React from "react";
import { formatMoney } from "../Widgets";
import WrapperSpendingToWallet from "./InfoSpendingToWallet.styles";

export default function InfoSpendingToWallet({ listDataInfoSpendingToWallet }) {
  let dataSpendingToWallet = null;

  if (listDataInfoSpendingToWallet) {
    dataSpendingToWallet = listDataInfoSpendingToWallet.map((dataInfo, index) => (
      <div className="info" key={index}>
        <div className="info-title">
          <img
            src={dataInfo.currency === "HEE" ? "https://hub.befitter.io/assets/icons/hee.svg" : "https://hub.befitter.io/assets/icons/fiu.svg"}
            alt="fiu"
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
          <span>{dataInfo.currency}</span>
        </div>
        <p>
          Total Transaction : &nbsp;<span className="info-amount">{dataInfo.totalTransaction}</span>
        </p>
        <p>
          Total Amount : &nbsp;<span className="info-amount">{formatMoney(dataInfo.totalAmount)}</span>
        </p>
        <p>
          Avg Amount : &nbsp;<span className="info-amount">{formatMoney(dataInfo.totalAmount)}</span>
        </p>
      </div>
    ));
  }

  return <WrapperSpendingToWallet>{dataSpendingToWallet}</WrapperSpendingToWallet>;
}
