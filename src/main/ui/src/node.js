import React, { useContext, useState } from "react";
import { DataContext } from "./dataContext";
import { scaleFactor } from "./initialData";

// const handleNodeClick = (node, appData) => {
//   //appData.setActiveNode(node);
// };
const Node = props => {
  const [nodeSelected, setNodeSelected] = useState(false);
  const { node } = props;
  const appData = useContext(DataContext);
  const activeNodeIndex = node.index;

  // console.log(
  //   "node.key: ",
  //   node.key,
  //   " appData.sourceNodeKey: ",
  //   appData.sourceNodeKey,
  //   " appData.targetNodeKey: ",
  //   appData.targetNodeKey
  // );
  const nodeColor =
    node.key === appData.graphData.from
      ? "green"
      : node.key === appData.graphData.to
      ? "red"
      : nodeSelected
      ? "orange"
      : "#21D4FD";

  const handleMouseDown = e => {
    e.preventDefault();
    setNodeSelected(true);
    const touchIsEnabled = e.changedTouches && e.changedTouches.length;
    const touchEvent = touchIsEnabled ? e.changedTouches[0] : e;
    // Record our starting point.
    appData.setOrigin({ x: touchEvent.clientX, y: touchEvent.clientY });
    appData.setActiveNodeIndex(activeNodeIndex);

    appData.setNodeOrigin({
      x: node.x,
      y: node.y
    });
    appData.setDragging(true);
  };

  const handleMouseUp = e => {
    setNodeSelected(false);
    appData.setDragging(false);
    appData.setActiveNodeIndex(-1);
  };

  return (
    <g
      // onClick={() => handleNodeClick(node, appData)}
      style={{ userSelect: "none" }}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <circle r={nodeSelected ? 30 : 15} fill={nodeColor} />
      <text dy={2} dx={18} fill="gold" fontFamily="arial">
        {`${node.key.toUpperCase()} (${(node.x / scaleFactor).toFixed(2)}, ${(
          node.y / scaleFactor
        ).toFixed(2)})`}
      </text>
    </g>
  );
};
export default Node;
