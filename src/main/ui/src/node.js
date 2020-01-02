import React, { useContext } from "react";
import { DataContext } from "./dataContext";
import { scaleFactor } from "./initialData";

const Node = props => {
  const appData = useContext(DataContext);
  const { node } = props;
  const nodeSelected = node.index === appData.activeNodeIndex;
  const nodeHighlighted = appData.dragging && nodeSelected;
  const nodeColor =
    node.key === appData.graphData.from
      ? "green"
      : node.key === appData.graphData.to
      ? "red"
      : nodeHighlighted
      ? "orange"
      : "#21D4FD";

  const handleMouseDown = e => {
    e.preventDefault();
    const touchIsEnabled = e.changedTouches && e.changedTouches.length;
    const touchEvent = touchIsEnabled ? e.changedTouches[0] : e;
    // Record our starting point.
    appData.setOrigin({ x: touchEvent.clientX, y: touchEvent.clientY });
    appData.setActiveNodeIndex(node.index);

    appData.setNodeOrigin({
      x: node.x,
      y: node.y
    });
    appData.setDragging(true);
  };

  const handleMouseUp = e => {
    appData.setDragging(false);
    appData.setActiveNodeIndex(-1);
  };

  return (
    <g
      style={{ userSelect: "none" }}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <circle r={nodeHighlighted ? 50 : 25} fill={nodeColor} />
      <text dy={2} dx={28} fill="gold" fontFamily="arial">
        {`${node.key.toUpperCase()} (${(node.x / scaleFactor).toFixed(2)}, ${(
          node.y / scaleFactor
        ).toFixed(2)})`}
      </text>
    </g>
  );
};
export default Node;
