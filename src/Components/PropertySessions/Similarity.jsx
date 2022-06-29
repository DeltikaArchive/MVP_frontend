import React, { useContext} from "react";
import { AppContext } from "../../Context/AppContext";
import InfoIcon from "@mui/icons-material/Info";
import { Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import CompsSaleTable from "./CompsSaleTable";
import CompsRentTable from "./CompsRentTable";
import CompsSTRTable from "./CompsSTRTable";
import Comps from "./Comps";

function Similarity({ compsSale, compsRent, compsSTR }) {
    const { result } = useContext(AppContext);
    
  let SIMILARITY_TABLE_DATA = [];
  if (compsSale) {
    SIMILARITY_TABLE_DATA = result[7];
  } else if (compsRent) {
    SIMILARITY_TABLE_DATA = result[8];
  } else {
    SIMILARITY_TABLE_DATA = result[9];
  }

   const renderTooltip = (props) => (
     <Tooltip id="button-tooltip" {...props}>
    The properties that are most similar to the target . 
     </Tooltip>
   ); 

  let backgroundStyle;

  if (compsSale) {
    backgroundStyle = { backgroundColor: "#df6fbe15" };
  } else if (compsRent) {
    backgroundStyle = { backgroundColor: "#f1fe0015" };
  } else {
    backgroundStyle = { backgroundColor: "#00fedc19" };
  }
  return (
    <Col className="propertySession-1" style={backgroundStyle}>
      <div>
        <div className="d-flex">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <InfoIcon fontSize="" style={{ color: "#6b46c18c" }} />
          </OverlayTrigger>
          <h6 className="mb-2" style={{ fontWeight: "600" }}>
            &nbsp;Similarity Analytics
          </h6>
        </div>
        {/* <Comps/> */}
        {compsSale && (
          <p
            style={{
              fontWeight: "600",
              color: "#6b46c1",
              marginBottom: "12px",
            }}
          >
            Sold in the last <u>180</u> days
          </p>
        )}
        {compsSale && (
          <CompsSaleTable SIMILARITY_TABLE_DATA={SIMILARITY_TABLE_DATA} />
        )}
        {compsRent && (
          <CompsRentTable SIMILARITY_TABLE_DATA={SIMILARITY_TABLE_DATA} />
        )}
        {compsSTR && <CompsSTRTable SIMILARITY_TABLE_DATA={SIMILARITY_TABLE_DATA} />}
      </div>
    </Col>
  );
}

export default Similarity;
