import React from "react";
import { Heading } from "@chakra-ui/react";

export default function MigrationTo() {
  return (
    <div className="">
      <Heading size="md">Migration Data:</Heading>
      <iframe
        src="https://public.tableau.com/shared/62ZZWC2N2?:showVizHome=no"
        width={800}
        height={650}
        title="MigrationTo"
      ></iframe>
    </div>
  );
}
