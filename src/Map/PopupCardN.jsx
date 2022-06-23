import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { AppContext } from "../Context/AppContext";
import PropertyImgNotAvailable from "../Images/PropertyImgNotAvailable.png";
import { numberWithCommas } from "../lib/utilityFunctions";

function PopupCardN({ pin }) {
  const { showCompsSale, showCompsRent, showCompsSTR } = useContext(AppContext);
 
  return (
    <Card style={{ width: "15rem" }}>
      {pin.IMG ? (
        <Card.Img variant="top" src={pin.IMG} />
      ) : (
        <Card.Img variant="top" src={PropertyImgNotAvailable} />
      )}

      <Card.Body>
        <Card.Title
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {showCompsSale && (
            <span className="me-2">
              ${numberWithCommas(pin.sale_closing_price)}
            </span>
          )}
          {showCompsRent && (
            <span className="me-2">${numberWithCommas(pin.rental_price)}</span>
          )}

          {showCompsSTR && (
            <span className="me-2">${numberWithCommas(pin.REV_PAR)}</span>
          )}

          <span
            style={{ color: "#fe0061", fontSize: "13px", fontWeight: "600" }}
          >
            {Math.floor(pin.similarity * 10000) / 100}% similar
          </span>
        </Card.Title>
        <Card.Text>
          <div style={{ fontSize: "13px", textAlign: "left" }}>
            {showCompsSale && (
              <>
                <span>{numberWithCommas(pin.building_area)} Sqft.</span>
                <span> | </span>
              </>
            )}
            <span>{pin.bedrooms} Beds </span>
            <span> | </span>
            <span>{pin.total_bathrooms_numeric} Baths</span>
          </div>
          <div style={{ fontSize: "13px", textAlign: "left" }}>
            Address: {pin.address}
          </div>
        </Card.Text>
        {/* <Button variant="link" style={{ fontSize: "13px" }}>
          Show more
        </Button> */}
      </Card.Body>
      <Card.Footer>
        
      </Card.Footer>
    </Card>
  );
}

export default PopupCardN;
