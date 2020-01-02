import React, { useContext } from "react";
import { DataContext } from "./dataContext";

const About = () => {
  const appData = useContext(DataContext);
  return (
    <div>
      <h1>About</h1>
      <h2>This Application</h2>
      <p>
        This application has nodes which have edges between them depicting
        distances. By clicking the submit button you can find the most efficient
        path to the destination node. The nodes are moveable and the distances
        between the nodes will increase or decrease as you move the selected
        node. This Application was written with a Java Spring-Boot server side
        and a React User interface.
      </p>

      <h2>A-Star Search Algorithm</h2>
      <p>
        This algorithm is a graph-traversal or path-finding algorithm. It is
        known for its efficiency.
      </p>
    </div>
  );
};
export default About;
