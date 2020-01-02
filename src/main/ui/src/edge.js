import React from "react";
import { scaleFactor } from "./initialData";

const Edge = props => {
  const { link } = props;
  if (!link.source) {
    console.error("Link source does not exist", link);
    return "";
  }
  if (!link.target) {
    console.error("Link target does not exist", link);
    return "";
  }
  const midX = (link.source.x + link.target.x) / 2;
  const midY = (link.source.y + link.target.y) / 2;
  const x1 = link.source.x;
  const y1 = link.source.y;
  const x2 = link.target.x;
  const y2 = link.target.y;
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)).toFixed(
    0
  );
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={link.strokeWidth || 2}
        stroke={link.color || "lightBlue"}
        strokeOpacity={0.6}
      />
      <text
        textAnchor="middle"
        dy={midY - 4}
        dx={midX}
        fill="steelblue"
        fontFamily="arial"
      >
        {` (${(length / scaleFactor).toFixed(2)})`}
      </text>
    </g>
  );
};

export default Edge;
