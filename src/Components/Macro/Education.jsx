import React from "react";
import { EducationData } from "../../lib/macroDB";
import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";

export default function Education() {
  return (
    <div className="macroCell">
      <Heading size="md" className="mb-1 pushLeft">
        Education attainment in Houston:
      </Heading>
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={EducationData}
        options={{
          legend: { position: "bottom" },
          chartArea: { width: "80%", height: "70%" },
          hAxis: { minValue: 2012, format: `` },
          vAxis: { minValue: 0, format: "short" },
        }}
      />
    </div>
  );
}
