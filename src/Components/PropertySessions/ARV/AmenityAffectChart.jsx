import React from "react";
import {
    Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Amenity Affect ",
    },
  },
};

const labels = ["1 bed", "2 bed", "3 bed", "4 bed", "5 bed", "6 bed", "7 bed"];

const data = {
  labels,
  datasets: [
    {
      label: "With",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(204, 179, 255)",
    },
    {
      label: "Without",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(205, 217, 239)",
    },
  ],
};
console.log(data.datasets[0].data);

function AmenityAffectChart() {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default AmenityAffectChart;
