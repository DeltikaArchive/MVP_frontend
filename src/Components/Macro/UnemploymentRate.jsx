import React from "react";
import { UnemploymentData } from "../../lib/macroDB";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { toPercentArray, fixDateArray } from "../../lib/utilityFunctions";

export default function UnemploymentRate() {
  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Unemployment Rate:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={toPercentArray(fixDateArray(UnemploymentData))}
        options={{
          legend: { position: "bottom" },
          chartArea: { width: "80%", height: "70%" },
          vAxis: { minValue: 0, format: `%` },
          series: {
            0: { color: "#ed7117" },
          },
        }}
      />
    </div>
  );
}
