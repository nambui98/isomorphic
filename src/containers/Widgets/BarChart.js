import React from "react";
import { Chart as ChartJS, CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      color: "rgb(255, 255, 255)",
      font: {
        size: 20,
        weight: "600",
      },
      text: "Mint Information",
    },
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
  },

  scales: {
    x: {
      stacked: true,
      ticks: {
        color: "rgb(255, 255, 255)", // not 'fontColor:' anymore
        // fontSize: 18,
        // font: {
        //   size: 18, // 'size' now within object 'font {}'
        // },
        beginAtZero: true,
      },
    },
    y: {
      stacked: true,
      ticks: {
        color: "rgb(255, 255, 255)", // not 'fontColor:' anymore
        // fontSize: 18,
        // font: {
        //   size: 18, // 'size' now within object 'font {}'
        // },
        beginAtZero: true,
      },
    },
  },
};

export function BarChart({ data }) {
  const labels = Object.keys(data);

  const dataInfo = {
    labels,
    datasets: [
      {
        label: "Daily",
        data: labels.map((v) => data[v].styleRate?.Daily),
        backgroundColor: "rgb(255, 99, 132)",
        color: "white",
      },
      {
        label: "Fitness",
        data: labels.map((v) => data[v].styleRate?.Fitness),
        backgroundColor: "rgb(75, 192, 192)",
        color: "white",
      },
      {
        label: "Racer",
        data: labels.map((v) => data[v].styleRate?.Racer),
        backgroundColor: "rgb(53, 162, 235)",
        color: "white",
      },
    ],
  };

  return <Bar options={options} data={dataInfo} />;
}
