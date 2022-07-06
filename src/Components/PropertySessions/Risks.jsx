import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import Risk from './Risk';


function Risks() {
  const { result } = useContext(AppContext)
  
  const risks = [
    {
      type: "Violation",
      level: "N/A",
    },
    {
      type: "Flood zone",
      level: `${result.risk.flood_zone}`,
    },
    {
      type: "Crime score",
      level: "N/A",
    },
  ];
    return (
      <>
        <Risk risk={risks[0]} />
        <Risk risk={risks[1]} />
        <Risk risk={risks[2]} />
      </>
    );
}

export default Risks;