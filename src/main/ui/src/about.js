import React from "react";
import diagram from "./assets/a-star_service.png";

const About = () => {
  return (
    <div id="about">
      <div className="textinfo">
        <h2>Application</h2>
        <div className="application">
          <p>
            This application allows you to find the shortest path from the Start
            node (marked in green) to the End node (marked in red). When you
            click the "Submit" button, the program sends the search scenario to
            the RESTful A-star search engine to find the most cost-effective
            route through all of the nodes and edges and highlights the
            determined path in red.
          </p>
          <p>
            You can click on and drag the nodes in any direction to change their
            positions and test the algorithm's capability. The node you click
            and hold will be enlarged and colored orange until you release it.
            The application will remember the last node positions unless you
            click the "Reset" button and the original positions will be
            restored.
          </p>
          <img className="diagram" src={diagram} alt="Diagram" />
        </div>

        <h2>A-Star Search Algorithm</h2>
        <div className="algorithm">
          The A-Star, or A-*, search is a path-finding algorithm that is known
          for its efficiency. The cost of a path is determined by the sum of the
          distance from the starting node and the estimated remaining distance
          to the destination node. The algorithm builds new routes by looking at
          the neighbor nodes at the end of the best existing routes and uses a
          priority queue to sort routes until it finds the route with the lowest
          cost.
        </div>
      </div>
    </div>
  );
};
export default About;
