import React, { Component } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

import { shadeColor } from "../Dashboard/ColorUtils";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const DEFAULT_COLORS = [ "#DC3545", "#DC3545", "#DC3545", "#FFC107", "#28A745", "#28A745" ];

export default class MapChart extends Component {
  computeSatisfaction = () => {
    // compute the average satisfaction of every country that has payee
    // compute the corresponding tooltip of every country that has payee

    const { ppinfo } = this.props;
    let countryTooltip = {};
    let countryScore = {};
    let countryFeedCount = {};

    if (ppinfo) {
      ppinfo.forEach(info => {
        if (!(info.address.country in countryTooltip)) {
          countryTooltip[info.address.country] = "";
          countryScore[info.address.country] = -1;
          countryFeedCount[info.address.country] = -1;
        }
        countryTooltip[info.address.country] += `<br/>${info.info.first_name} ${info.info.last_name}: ${info.feedback_count === 0 ? "?" : (info.satisfaction / info.feedback_count).toFixed(1)} (${info.feedback_count})`;
        if (info.feedback_count > 0) {
          if (countryFeedCount[info.address.country] === -1) {
            countryScore[info.address.country] = 0;
            countryFeedCount[info.address.country] = 0;
          }
          countryScore[info.address.country] += info.satisfaction;
          countryFeedCount[info.address.country] += info.feedback_count;
        }
      });
      for (let key in countryScore) {
        if (countryFeedCount[key] !== -1)
          countryScore[key] = (countryScore[key] / countryFeedCount[key]).toFixed(1);
        countryTooltip[key] = `<center><b>${key}</b></center><b>Average Satisfaction:</b> ${countryScore[key] === -1 ? "?" : countryScore[key]}<br/>` + countryTooltip[key];
      }
    }
    return { countryScore, countryTooltip };
  };

  getCountry = (properties, countryScore) => {
    const { NAME, CONTINENT, ISO_A3 } = properties;
    if (NAME in countryScore) return NAME;
    if (CONTINENT in countryScore) return CONTINENT;
    if (ISO_A3 in countryScore) return ISO_A3;
    return "";
  };

  getDefaultColor = (properties, countryScore) => {
    const value = this.getCountry(properties, countryScore);
    if (value === "") return "#D6D6DA";
    const score = Math.floor(countryScore[value]);
    if (score === -1) return "#6C757D";
    return DEFAULT_COLORS[score];
  };

  getHoverColor = (properties, countryScore) => {
    return shadeColor(this.getDefaultColor(properties, countryScore), -20);
  };

  render() {
    const { countryScore, countryTooltip } = this.computeSatisfaction();

    return (
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <>
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const value = this.getCountry(geo.properties, countryScore);
                    this.props.setTooltipContent(countryTooltip[value]);
                  }}
                  onMouseLeave={() => {
                    this.props.setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: `${ this.getDefaultColor(geo.properties, countryScore) }`,
                      outline: "none"
                    },
                    hover: {
                      fill: `${ this.getHoverColor(geo.properties, countryScore) }`,
                      outline: "none"
                    },
                  }}
                /></>
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
};
