import React, { useState } from "react";
import RentComparison from "./RentComparison";
import UnitBreakdown from "./UnitBreakdown";
import InventoryComparison from "./InventoryComparison";

export default function CompsRent() {
  return (
    <>
      <UnitBreakdown />
      <InventoryComparison />
      <RentComparison />
    </>
  );
}
