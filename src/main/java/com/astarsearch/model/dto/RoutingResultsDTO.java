package com.astarsearch.model.dto;

import java.util.List;

import com.astarsearch.route.RouteSearch.RouteEdge;

public class RoutingResultsDTO {
	private final String status;
	private final List<RouteEdge> edges;

	public RoutingResultsDTO(String status, List<RouteEdge> edges) {
		this.status = status;
		this.edges = edges;
	}

	public String getStatus() {
		return status;
	}

	public List<RouteEdge> getEdges() {
		return edges;
	}
}
