//dataContext is needed for providing the context and
// provide it for consumption

import React, { createContext, useState } from "react";
import initialData, {
  initialZoomFactor,
  initialScenarioData
} from "./initialData";
import useLocalStorage from "./useLocalStorage";

export const DataContext = createContext();

// This context provider is passed to any component requiring the context
export const DataProvider = ({ children }) => {
  //const [activeNode, setActiveNode] = useState(null);
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
  const [dragging, setDragging] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [nodeOrigin, setNodeOrigin] = useState({ x: 0, y: 0 });
  const [bestRoute, setBestRoute] = useLocalStorage("bestRoute", []);

  const [scenarioData, setScenarioData] = useLocalStorage(
    "scenarioData",
    initialScenarioData
  );
  // The high-level information about the scenario
  const [graphData, setGraphData] = useLocalStorage("initialData", initialData);

  const [zoomFactor, setZoomFactor] = useLocalStorage(
    "zoomFactor",
    initialZoomFactor
  );

  return (
    <DataContext.Provider
      value={{
        // activeNode,
        // setActiveNode,
        dragging,
        setDragging,
        coordinates,
        setCoordinates,
        origin,
        setOrigin,
        graphData,
        setGraphData,
        scenarioData,
        setScenarioData,
        nodeOrigin,
        setNodeOrigin,
        activeNodeIndex,
        setActiveNodeIndex,
        bestRoute,
        setBestRoute,
        zoomFactor,
        setZoomFactor
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
