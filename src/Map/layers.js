export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "apartments",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "MediumPurple",
    "circle-stroke-color": "Indigo",
    "circle-stroke-width": 2,
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "apartments",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 14,
  },
  paint: {
    "text-color": "white",
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "apartments",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "MediumPurple",
    "circle-radius": 4,
    "circle-stroke-width": 2,
    "circle-stroke-color": "Indigo",
  },
};
