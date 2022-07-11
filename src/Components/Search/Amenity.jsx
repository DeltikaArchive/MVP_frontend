import React from 'react';
import Amenities from '../PropertySessions/Amenities';

function Amenity() {
    return (
      <div className="mx-3">
        <div className="h3 text-align-left p-3 mb-0 with-bottom-border">
          Amenities
        </div>
            <div className="m-3">
                <Amenities/>
        </div>
      </div>
    );
}

export default Amenity;