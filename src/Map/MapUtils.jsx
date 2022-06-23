export const STARTING_MAP_ZOOM = 9;

//Houston
// export const MAP_VIEWPORT = {
//   latitude: 29.76045,
//   longitude: -95.36978,
//   zoom: STARTING_MAP_ZOOM,
// };

// Los Angeles
export const MAP_VIEWPORT = {
  latitude: 34.0522,
  longitude: -118.2437,
  zoom: STARTING_MAP_ZOOM,
};

// whole US
// export const STARTING_MAP_ZOOM = 3.4;
// export const MAP_VIEWPORT = {
//   latitude: 38,
//   longitude: -99,
//   zoom: STARTING_MAP_ZOOM,
// };

//rearrange the geom data format
export const geomFix = (multi) => {
  let str = multi.substr(16);
  str = str.substr(0, str.length - 3);
  const myArray = str.split(",");
  const cordFix = [];
  myArray.forEach((str) => {
    const cords = str
      .trim()
      .split(" ")
      .map((x) => +x);
    cordFix.push(cords);
  });
  return cordFix;
};

export const createPolygonsCollection = (data) => {
  const polyData = {
    type: "FeatureCollection",
    features: [],
  };
  data &&
    data.forEach((area) => {
      const fix = [[geomFix(area.geom)]];
      const data = {
        type: "Feature",
        properties: {
          gid: area.gid,
          objectid: area.objectid,
          perimeter: area.perimeter,
          polyid: area.polyid,
          snbname: area.snbname,
          //percentile is what effects the polygon color
          percentile: Math.round(area.polyid / 10),
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: fix,
        },
      };
      //skip the bad data
      if (area.gid !== 39 && area.gid !== 55) {
        polyData.features.push(data);
      }
    });
  return polyData;
};

export const createClusters = async (data) => {
  const allPins =
    data &&
    data.map((pins) => {
      return {
        type: "Feature",
        properties: { dbh: 0 },
        geometry: {
          type: "Point",
          coordinates: [pins.longitude, pins.latitude],
        },
      };
    });
  const clusters = {
    type: "FeatureCollection",
    features: allPins,
  };
  //   console.log(clusters);
  return clusters;
};

export const checkExist = (x) => {
  if (!x) return 0;
  return x;
};
