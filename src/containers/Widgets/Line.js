import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    y: {
      // not 'yAxes: [{' anymore (not an array anymore)
      ticks: {
        color: "rgb(255, 255, 255)", // not 'fontColor:' anymore
        // fontSize: 18,
        // font: {
        //   size: 18, // 'size' now within object 'font {}'
        // },
        beginAtZero: true,
      },
    },
    x: {
      // not 'xAxes: [{' anymore (not an array anymore)
      ticks: {
        color: "rgb(255, 255, 255)", // not 'fontColor:' anymore
        //fontSize: 14,
        // font: {
        //   size: 14, // 'size' now within object 'font {}'
        // },
        beginAtZero: true,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 14,
          weight: "600",
        },
        color: "rgb(255, 255, 255)",
      },
    },
    title: {
      display: true,
      color: "rgb(255, 255, 255)",
      font: {
        size: 20,
        weight: "600",
      },
      text: "Total amount of hee for the day",
    },
  },
};

export function LineChart({ data, labels, totalHee }) {
  const dataInfo = {
    labels,
    datasets: [
      {
        label: `Total ${totalHee} hee`,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        color: "white",
        data: data,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(232,105,90,0.8)",
        hoverBorderColor: "orange",
      },
    ],
  };

  return <Line options={options} data={dataInfo} />;
}
