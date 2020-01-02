import React, { useState, useLayoutEffect } from "react";
import GraphWithLabels from "./graphWithLabels";

const Home = () => {
  function useWindowSize() {
    const [size, setSize] = useState({ x: 0, y: 0 });
    useLayoutEffect(() => {
      function updateSize() {
        setSize({ x: window.innerWidth, y: window.innerHeight });
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const { x, y } = useWindowSize();
  const width = x;
  const height = y - 87;
  return (
    <div id="home">
      <GraphWithLabels width={width} height={height} />
    </div>
  );
};
export default Home;
