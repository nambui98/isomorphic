import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { formatHee } from "./Widgets";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "left",
      labels: {
        font: {
          size: 12,
          weight: "600",
        },
        color: "rgb(173 169 169)",
      },
    },
    title: {
      display: true,
      color: "rgb(173 169 169)",
      font: {
        size: 12,
        weight: "600",
      },
      text: "Amount activity for the day",
    },
  },
};

export function PieChart({ dataActivityFee, label }) {
  const dataInfo = {
    labels: dataActivityFee ? dataActivityFee.map((label) => label.activity) : [],
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(46, 138, 49, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 0, 37, 0.2)",
          "rgba(46, 138, 138, 0.2)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(46, 138, 49, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 0, 37, 1)", "rgba(46, 138, 138, 1)"],
        borderWidth: 1,
        data: dataActivityFee ? dataActivityFee.map((data) => formatHee(data.amount)) : [],
      },
    ],
  };

  return (
    <div style={{ width: "45%", marginTop: "70px" }}>
      <h1 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600", color: "rgb(255, 255, 255)" }}>{label}</h1>
      <Pie data={dataInfo} options={options} />
    </div>
  );
}
