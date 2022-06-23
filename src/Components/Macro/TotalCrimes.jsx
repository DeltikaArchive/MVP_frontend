import React from "react";
import { TotalCrimesData } from "../../lib/macroDB";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";

export default function TotalCrimes() {
  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Total Crimes:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={TotalCrimesData}
        options={{
          legend: { position: "bottom" },
          chartArea: { width: "80%", height: "70%" },
          hAxis: { minValue: 2011 },
          vAxis: { minValue: 0, maxValue: 200000, format: `short` },
          series: {
            0: { color: "#ffc30b" },
          },
        }}
      />
    </div>
  );
}
