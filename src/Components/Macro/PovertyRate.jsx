import React from "react";
import { PovertyRateData } from "../../lib/macroDB";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { toPercentArray } from "../../lib/utilityFunctions";

export default function PovertyRate() {
  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Poverty Rate:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={toPercentArray(PovertyRateData)}
        options={{
          legend: { position: "bottom" },
          chartArea: { width: "80%", height: "70%" },
          hAxis: { minValue: 2011, format: `` },
          vAxis: { minValue: 0, format: `%` },
          series: {
            0: { color: "#ed7117" },
          },
        }}
      />
    </div>
  );
}
