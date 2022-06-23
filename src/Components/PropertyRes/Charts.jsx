import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Date", "Payload"],
  ["08/2020", -195.47],
  ["09/2020", 35.83],
  ["10/2020", 308.75],
  ["11/2020", 309.98],
  ["12/2020", -70.08],
  ["01/2021", -109.22],
  ["02/2021", -107.5],
  ["03/2021", -37.44],
  ["04/2021", -148.28],
  ["05/2021", 22.67],
  ["06/2021", -4.39],
  ["07/2021", -195.47],
];

export const options = {
  title: "Seasonality",
  hAxis: { titleTextStyle: { color: "#83B4D7" } },
  //   vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

export default function Chrats() {
  return <Chart chartType="AreaChart" width="100%" height="400px" style={{ color: "red" }} data={data} options={options} />;
}
