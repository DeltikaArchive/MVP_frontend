import React from "react";
import { PopulationData } from "../../lib/macroDB";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";

export default function PopulationGrowth() {
  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Population Growth:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={PopulationData}
        options={{
          legend: { position: "bottom" },
          curveType: "function",
          chartArea: { width: "80%", height: "70%" },
          hAxis: { minValue: 1990 },
          vAxis: { minValue: 0, format: `short` },
          series: {
            0: { color: "#e2431e" },
            1: { color: "#e7711b" },
            2: { color: "#f1ca3a" },
          },
        }}
      />
    </div>
  );
}
