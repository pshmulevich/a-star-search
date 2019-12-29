package com.astarsearch.model;

import java.util.List;
import java.util.Map;

public class Edge {
	private final String name;
	private final Point start;
	private final Point end;
	private  final double cost; 
	
	public Edge(Point start, Point end, double costFactor, List<Edge> edges, Map<String, Edge> edgesMap) {
		this.name = start.getName() + "_" + end.getName();
		this.start = start;
		this.end = end;
		this.cost = costFactor * Math.hypot((end.getX() - start.getX()), (end.getY() - start.getY()));
		
		edges.add(this);
		edgesMap.put(this.name, this);
	}

	public String getName() {
		return name;
	}

	public Point getStart() {
		return start;
	}

	public Point getEnd() {
		return end;
	}

	public double getCost() {		
		return cost;
	}

}
