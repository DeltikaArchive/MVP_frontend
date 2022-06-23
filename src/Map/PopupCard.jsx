import React, { useContext } from "react";
import { numberWithCommas, checkDataExist } from "../lib/utilityFunctions";
import PropertyImgNotAvailable from "../Images/PropertyImgNotAvailable.png";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function PopupCard(props) {
  const { pin } = props;
  const { setSelectedId } = useContext(AppContext);

  const choseId = () => {
    localStorage.setItem("propId", pin.prop_id);
    setSelectedId(pin.prop_id);
  };

  return (
    <div className="popupCard">
      {pin.IMG ? <img src={pin.IMG} alt="property img" /> : <img src={PropertyImgNotAvailable} alt="property img" />}
      <div className="d-flex mx-2">
        <p style={{ fontSize: "15px", fontWeight: "600" , marginRight:"8px"}}>
          {pin.property_cost ? `$${numberWithCommas(pin.PRICE)}` : "$3,695,000"}
        </p>
        <p style={{ fontSize: "15px", fontWeight: "600", color: "#fe007fdc" }}>
          85% similar
        </p>
      </div>
      <div style={{ fontSize: "15px" }} className="flexRowBetween mx-3">
        <span>{pin.BEDS} Beds</span>
        <span>|</span>
        <span>{pin.lot_size} Sqft.</span>
        <span>|</span>
        <span>{pin.property_type}</span>
      </div>
      <p className="popupDescription">{pin.address}</p>
      <Link
        to="/property"
        className="ms-auto me-2 chartYears"
        onClick={() => choseId()}
      >
        show more
      </Link>
    </div>
  );
}
