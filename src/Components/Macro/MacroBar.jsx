import React, { useState } from "react";
import { Heading } from "@chakra-ui/react";

export default function MacroBar() {
  const [city, setCity] = useState("Houston");

  return (
    <div className="Searchbar">
      <div className="d-flex flex-row ">
        <Heading size="lg" className="m-3">
          Market analysis report for:
        </Heading>
        <select size="lg" value={city} className="macroBarSelect" onChange={(e) => setCity(e.target.value)}>
          <option value="Houston">Houston</option>
          <option value="los angeles">los angeles</option>
          <option value="All">All</option>
        </select>
      </div>
    </div>
  );
}
