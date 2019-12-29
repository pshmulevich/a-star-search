import React, { useContext } from "react";
import { DataContext } from "./dataContext";
import { Graph } from "@vx/network";
import Node from "./node";
import Edge from "./edge";
import axios from "axios";
import { linksMap } from "./initialData";

const GraphWithLabels = ({ width, height }) => {
  const appData = useContext(DataContext);
  const graphData = appData.graphData;
  const activeNodeIndex = appData.activeNodeIndex;

  const updateEdges = (edges, color) => {
    edges.forEach(edge => {
      const edgeKey = `${edge.sourceKey},${edge.targetKey}`;
      const link = linksMap[edgeKey];
      link.color = color;
      //console.log("Edgekey: ", edgeKey, "color: ", color,  "link.color: ", link.color);
    });
  };

  const handleSubmit = () => {
    //clear selected edges before computing new best route
    updateEdges(appData.bestRoute, undefined);
    appData.setBestRoute([]);
    //console.log("appData.graph data", appData.graphData);

    const serviceUrl = "/api/findRoute";

    const scenarioData = {
      //request body AKA payload
      edges: appData.graphData.links,
      nodes: appData.graphData.nodes,
      originNode: appData.sourceNodeKey,
      destinationNode: appData.targetNodeKey
    };
    console.log("post request to", serviceUrl, "payload:", scenarioData);
    axios.post(serviceUrl, scenarioData).then(
      response => {
        console.log("Route data: ", response.data);

        //Make selected edges red
        updateEdges(response.data.edges, "red");
        appData.setBestRoute(response.data.edges);
        //this.props.history.push("/otherPage");
      },
      error => {
        console.error(error);
      }
    );
  };
  const handleReset = () => {
    localStorage.clear();
    window.location.reload(false);
  };
  //console.log("appData.graphData: ", appData.graphData);
  const handleOnMouseMove = e => {
    e.preventDefault();
    if (appData.dragging) {
      const touchIsEnabled = e.changedTouches && e.changedTouches.length;
      const touchEvent = touchIsEnabled ? e.changedTouches[0] : e;
      // Set state for the change in coordinates.
      const xMove =
        (touchEvent.clientX - appData.origin.x) / appData.zoomFactor;
      const yMove =
        (touchEvent.clientY - appData.origin.y) / appData.zoomFactor;

      const x0 = appData.nodeOrigin.x;
      const y0 = appData.nodeOrigin.y;
      graphData.nodes[activeNodeIndex].x = x0 + xMove;
      graphData.nodes[activeNodeIndex].y = y0 + yMove;
      appData.setGraphData(graphData);
      // tells react to redraw, allows for smooth movement of node
      appData.setCoordinates({
        x: xMove,
        y: yMove
      });
    }
  };

  const nodeXValues = appData.graphData.nodes.map(node => {
    return node.x;
  });
  const nodeYValues = appData.graphData.nodes.map(node => {
    return node.y;
  });
  const graphHeight = Math.max(...nodeYValues) - Math.min(...nodeYValues) + 200;
  const graphWidth = Math.max(...nodeXValues) - Math.min(...nodeXValues) + 200;
  const zoomFactor = Math.min(width / graphWidth, height / graphHeight);
  appData.setZoomFactor(zoomFactor);
  console.log(zoomFactor);
  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width / zoomFactor} ${height / zoomFactor}`}
          // width={width}
          // height={height}
          onTouchMove={handleOnMouseMove}
          onMouseMove={handleOnMouseMove}
          onMouseLeave={e => {
            e.preventDefault();
            appData.setDragging(false);
            appData.setActiveNodeIndex(-1);
          }}
        >
          <rect
            width={width / zoomFactor}
            height={height / zoomFactor}
            fill="black"
          />
          <Graph
            graph={appData.graphData}
            nodeComponent={Node}
            linkComponent={Edge}
          />
        </svg>
      </div>
    </div>
  );
};

export default GraphWithLabels;
