import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const markers = [
  { markerOffset: -15, name: "Alice Gorman", coordinates: [2.3522, 48.8566] },
  { markerOffset: -15, name: "Annie Edison", coordinates: [-77.0428, -12.0464] }
];
  
const MapChart = () => {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC"
          stroke="#D6D6DA"/>)
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "10px" }}
          >
            {name}
          </text>
        </Marker>
      ))}

    </ComposableMap>
  );
};

export default MapChart;
