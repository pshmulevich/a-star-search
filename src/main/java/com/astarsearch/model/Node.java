package com.astarsearch.model;

import java.util.List;

public class Node {
	private final Point currentPoint;
	private final Node parentNode;
	//	private final String value;
	private final double g_cost; // cost of distance from start
	//private final double h_cost; // cost of distance left (estimated)
	//private final double f_cost; // full cost (estimated)
	private final List<Edge> neighbors;

	public Node(Node parentNode, Edge leadingEdge, Point currentPoint, List<Edge> neighbors) {
		this.parentNode = parentNode;
		this.currentPoint = currentPoint;
		this.neighbors = neighbors;
		this.g_cost = parentNode == 
				null ? currentPoint.getCost() : currentPoint.getCost() + 
						leadingEdge.getCost() + parentNode.getGCost();
	}

	public Point getCurrentPoint() {
		return currentPoint;
	}

	public List<Edge> getNeighbors() {
		return neighbors;
	}

	public String toString(){
		return currentPoint.getName();
	}

	//Autogenerated; Identity of the node depends on its point
	// Node is parent object of point
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((currentPoint == null) ? 0 : currentPoint.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Node other = (Node) obj;
		if (currentPoint == null) {
			if (other.currentPoint != null)
				return false;
		} else if (!currentPoint.equals(other.currentPoint))
			return false;
		return true;
	}

	public double getFCost(Point destinationPoint) {
		return g_cost + estimateHCost(destinationPoint);
	}

	private double estimateHCost(Point destinationPoint) {
		return Math.hypot((destinationPoint.getX() - currentPoint.getX()), (destinationPoint.getY() - currentPoint.getY()));
	}

	public double getGCost() {
		return g_cost;
	}

	public Node getParent() {
		return parentNode;
	}
}
