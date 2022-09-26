import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Total amount of hee for the day",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function LineChart({ data, labels, totalHee }) {
  console.log("ksdafksdahfa", totalHee);
  const dataInfo = {
    labels,
    datasets: [
      {
        label: `Total ${totalHee} hee`,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: data,
      },
    ],
  };

  return <Line options={options} data={dataInfo} />;
}
