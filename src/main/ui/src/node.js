import React, { useContext } from "react";
import { DataContext } from "./dataContext";

// const handleNodeClick = (node, appData) => {
//   //appData.setActiveNode(node);
// };
const Node = props => {
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
    node.key === appData.sourceNodeKey
      ? "green"
      : node.key === appData.targetNodeKey
      ? "red"
      : "#21D4FD";

  const handleMouseDown = e => {
    e.preventDefault();
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
      <circle r={15} fill={nodeColor} />
      <text dy={2} dx={18} fill="white" fontFamily="arial">
        {`${node.key} (${node.x}, ${node.y})`}
      </text>
    </g>
  );
};
export default Node;
