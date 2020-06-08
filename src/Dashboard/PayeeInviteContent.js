import React, { Component, useState } from 'react';
import ReactTooltip from "react-tooltip";
import MapChart from '../components/MapChart';

export default function PayeeInvite(props) {
  const [content, setContent] = useState("");

  return (
    <div className="dashboard">
      <MapChart setTooltipContent={setContent} {...props} />
      <ReactTooltip html={true}>{content}</ReactTooltip>
    </div>
  );
}
