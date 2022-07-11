import React from 'react';
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import Amenities from './Amenities';

function Amenity() {
  const amenityTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      List of amenities included in the property.
    </Tooltip>
  );
    return (
      <div className="mx-3">
        <div className="h3 text-align-left p-3 mb-0 with-bottom-border">
          Amenities{" "}
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={amenityTooltip}
          >
            <InfoIcon className="note-trigger" fontSize="small" />
          </OverlayTrigger>
        </div>
        <div className="m-3">
          <Amenities />
        </div>
      </div>
    );
}

export default Amenity;