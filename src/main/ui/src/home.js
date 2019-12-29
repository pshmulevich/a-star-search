import React from "react";
import GraphWithLabels from "./graphWithLabels";

const Home = () => {
  const width = window.innerWidth - 30;
  const height = window.innerHeight - 50;
  return (
    <div style={{ width, height }}>
      <GraphWithLabels width={width} height={height} />
    </div>
  );
};
export default Home;
