import type { FillLayer } from "react-map-gl";

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer: FillLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "percentile",
      stops: [
        [0, "#FEE5D9"],
        [1, "#FCBEA5"],
        [2, "#FC9B7C"],
        [3, "#FC7857"],
        [4, "#F75B3F"],
        [5, "#F14331"],
        [6, "#A40410"],
        [7, "#D72622"],
        [8, "#BA1018"],
        [9, "#9A000D"],
      ],
    },
    "fill-opacity": 0.8,
  },
};
