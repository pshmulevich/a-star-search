import React, { useContext } from "react";
import { DataContext } from "./dataContext";
import { Graph } from "@vx/network";
import Node from "./node";
import Edge from "./edge";
import axios from "axios";
import { serviceEndpoint } from "./configuration";

const GraphWithLabels = ({ width, height }) => {
  const appData = useContext(DataContext);
  const graphData = appData.graphData;
  const activeNodeIndex = appData.activeNodeIndex;

  const updateEdges = (edges, color, thickness) => {
    edges.forEach(edge => {
      const edgeKey = `${edge.sourceKey},${edge.targetKey}`;
      const link = graphData.linksMap[edgeKey];
      link.color = color;
      link.strokeWidth = thickness;
    });
  };

  const handleSubmit = () => {
    //clear selected edges before computing new best route
    updateEdges(appData.bestRoute, undefined, undefined);
    appData.setBestRoute([]);

    const serviceUrl = serviceEndpoint;

    const scenarioData = {
      //request body AKA payload
      edges: appData.graphData.links,
      nodes: appData.graphData.nodes,
      originNode: appData.graphData.from,
      destinationNode: appData.graphData.to
    };
    console.log("post request to", serviceUrl, "payload:", scenarioData);
    axios.post(serviceUrl, scenarioData).then(
      response => {
        console.log("Route data: ", response.data);

        //Make selected edges red
        updateEdges(response.data.edges, "red", 6);
        appData.setBestRoute(response.data.edges);
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
  const handleOnMouseLeave = e => {
    e.preventDefault();
    appData.setDragging(false);
    appData.setActiveNodeIndex(-1);
  };

  const graphWidth = graphData.graphRight - graphData.graphLeft;
  const zoomFactor = width / graphWidth;

  appData.setZoomFactor(zoomFactor);

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        <svg
          viewBox={`${graphData.graphLeft} ${graphData.graphTop} ${
            graphData.graphRight
          } ${graphData.graphBottom}`}
          preserveAspectRatio="xMinYMin slice"
          onTouchMove={handleOnMouseMove}
          onMouseMove={handleOnMouseMove}
          onMouseLeave={handleOnMouseLeave}
          onMouseUp={handleOnMouseLeave}
          onTouchEnd={handleOnMouseLeave}
        >
          <Graph
            className="graph"
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
