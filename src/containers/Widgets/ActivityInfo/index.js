import React from "react";
import WrapperSpendingToWallet from "../InfoSpendingToWallet/InfoSpendingToWallet.styles";

export const formatNumber = (price) => (price ? price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : price);

export default function ActivityInfo({ dataActivityInfo }) {
  const dataFilter = Object.keys(dataActivityInfo).map((action) => {
    return (
      <div key={action} className="info">
        <div className="info-title">{action}</div>
        <p>
          Total Routes: &nbsp;<span className="info-amount">{dataActivityInfo[action].totalRoutes}</span>
        </p>
        <p>
          Total HeeEarn: &nbsp;<span className="info-amount">{dataActivityInfo[action].totalHeeEarn}</span>
        </p>
        <p>
          Total Distance: &nbsp;<span className="info-amount">{formatNumber(dataActivityInfo[action].totalDistance)}</span>
        </p>
        <p>
          Total BurntEnergy: &nbsp;<span className="info-amount">{formatNumber(dataActivityInfo[action].totalBurntEnergy)}</span>
        </p>
        <p>
          Avg Time: &nbsp;<span className="info-amount">{formatNumber(dataActivityInfo[action].avgTime)}</span>
        </p>
        <p>
          Avg: &nbsp;<span className="info-amount">{dataActivityInfo[action].avgEValue}</span>
        </p>
      </div>
    );
  });

  return <WrapperSpendingToWallet>{dataFilter}</WrapperSpendingToWallet>;
}
