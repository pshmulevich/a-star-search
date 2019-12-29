package com.astarsearch.scenario;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.astarsearch.model.Edge;
import com.astarsearch.model.Point;
/**
 * This class can be used for testing of the search algorithm with predictable results
 *
 */
public class Scenario {
	private final List<Point> points = new ArrayList<>();
	private final Map<String, Point> pointsMap = new HashMap<>();
	private final List<Edge> edges = new ArrayList<>();
	private final Map<String, Edge> edgesMap = new HashMap<>();
	private final Map<String, List<Edge>> pointsToEdgesMap = new HashMap<>(); // maps point to edges coming from it
	
	public void createScenario() {
		Point a = addPoint("a", 1, 1, 5);
		Point b = addPoint("b", 4, 4, 3);
		Point c = addPoint("c", 1, 3, 2);
		Point d = addPoint("d", 2, 4, 7);
		Point e = addPoint("e", 2, 1, 3);
		Point f = addPoint("f", 3, 2, 5);
		Point g = addPoint("g", 3, 4, 6);
		Point h = addPoint("h", 5, 3, 2);
		Point i = addPoint("i", 4, 1, 3);
		
		//outer arc experiment:
		Point x = addPoint("x", 0, 1, 3);
		Point y = addPoint("y", 0, 5, 2);
		Point z = addPoint("z", 5, 6, 2);
		addEdge(a, x, 1);
		addEdge(x, y, 20); //was 2, temporarily make expensive
		addEdge(y, z, 1);
		addEdge(z, h, 13);
		//expecting route: hzyxa		
		
		//-------------------------------
		// expensive hypotenuse experiment
		Point w = addPoint("w", 1, 4, 3);
		addEdge(c, w, 1);
		addEdge(w, d, 1);
		//-------------------------				
		addEdge(a, c, 7);		
		//------------------------
//		addEdge(c, d, 3);
//		addEdge(a, e, 5);		
		addEdge(c, d, 10);
		addEdge(a, e, 50);
		//------------------------
		addEdge(c, e, 8);
		addEdge(d, f, 2);
		
		addEdge(d, g, 7);
		addEdge(g, b, 3);
		addEdge(b, g, 4);
		addEdge(h, i, 2);
		addEdge(i, e, 30); //Make this temporarily very expensive, was 3
		addEdge(e, f, 6);
		addEdge(f, b, 3);
		addEdge(f, i, 6);
		addEdge(b, h, 4);
		addEdge(f, d, 2);
		
//		Edge edgeCD = new Edge(c, d, 3);
//		Edge edgeDC = new Edge(d, c, 7);
		

		// Account for all the outbound edges in the scenario for each point
		for (Edge edge : edges) {
			String startPointName = edge.getStart().getName();
			List<Edge> outboundEdgesList = pointsToEdgesMap.get(startPointName);
			if (outboundEdgesList == null) {
				outboundEdgesList = new ArrayList<>();
			}
			outboundEdgesList.add(edge);
			pointsToEdgesMap.put(startPointName, outboundEdgesList);
			
		}
	}

	private Point addPoint(String name, int x, int y, double cost) {
		return new Point(name, x, y, cost, points, pointsMap);
	}

	private void addEdge(Point a, Point b, double cost) {
		new Edge(a, b, cost, edges, edgesMap);
		new Edge(b, a, cost, edges, edgesMap);
	}
	
	public List<Point> getPoints() {
		return points;
	}
	
	public Point getPoint(String name) {
		return pointsMap.get(name);
	}
	
	public List<Edge> getEdges() {
		return edges;
	}
	
	public Edge getEdge(String name) {
		return edgesMap.get(name);
	}
	
	public List<Edge> getOutboundEdges(Point point) {
		return pointsToEdgesMap.get(point.getName());
	}
	/*
	 Scenario scenario = new Scenario();
	 scenario.createScenario();
	 scenario.getEdges();
	 scenario.getPoints();
	 scenario.getPoint(name);
	 scenario.getEdge(name);
	 */

}
