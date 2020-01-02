package com.astarsearch.scenario;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.Assert;

import com.astarsearch.model.Edge;
import com.astarsearch.model.Point;
import com.astarsearch.model.dto.EdgeDTO;
import com.astarsearch.model.dto.NodeDTO;
import com.astarsearch.model.dto.ScenarioDTO;
/**
 * Allows to load scenario data from a scenario DTO (JSON file)
 *
 */
public class DynamicScenario {
	private final List<Point> points = new ArrayList<>();
	private final Map<String, Point> pointsMap = new HashMap<>();
	private final List<Edge> edges = new ArrayList<>();
	private final Map<String, Edge> edgesMap = new HashMap<>();
	private final Map<String, List<Edge>> pointsToEdgesMap = new HashMap<>(); // maps point to edges coming from it
	

	public DynamicScenario(ScenarioDTO scenarioData) {
		createScenario(scenarioData);
	}
	
	public void createScenario(ScenarioDTO scenarioData) {
		
		int nodeCost = 0;
		NodeDTO[] nodesData = scenarioData.getNodes();
		Assert.notEmpty(nodesData, "nodesData must not be null or empty");
		
		for(NodeDTO nodeData : nodesData) {
			addPoint(nodeData.getKey(), nodeData.getX(), nodeData.getY(), nodeCost);
		}
		
		double edgeCostFactor = 1.0;
		EdgeDTO[] edgesData = scenarioData.getEdges();
		Assert.notEmpty(edgesData, "edgesData must not be null or empty");
		
		for(EdgeDTO edgeData : edgesData) {
			String from = edgeData.getFrom();
			Assert.hasLength(from, "Value of \"from\" must not be null or empty");

			Point sourcePoint = getPoint(from);
			
			String to = edgeData.getTo();
			Assert.hasLength(from, "Value of \"to\" must not be null or empty");

			Point targetPoint = getPoint(to);
			
			addEdge(sourcePoint, targetPoint, edgeCostFactor);
		}
		

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
	
	public Point getPoint(String key) {
		Assert.isTrue(pointsMap.containsKey(key), "Point with key " + key + " does not exist.");
		return pointsMap.get(key);
	}
	
	public List<Edge> getEdges() {
		return edges;
	}
	
	public Edge getEdge(String name) {
		return edgesMap.get(name);
	}
	
	public List<Edge> getOutboundEdges(Point point) {
		String pointName = point.getName();
		return pointsToEdgesMap.get(pointName);
	}
}
