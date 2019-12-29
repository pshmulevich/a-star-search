package com.astarsearch.model.dto;

public class ScenarioDTO {
	
	private EdgeDTO[] edges;
	private NodeDTO[] nodes;
	private String originNode;
	private String destinationNode;
	
	public EdgeDTO[] getEdges() {
		return edges;
	}
	public void setEdges(EdgeDTO[] edges) {
		this.edges = edges;
	}
	public NodeDTO[] getNodes() {
		return nodes;
	}
	public void setNodes(NodeDTO[] nodes) {
		this.nodes = nodes;
	}
	public String getOriginNode() {
		return originNode;
	}
	public void setOriginNode(String originNode) {
		this.originNode = originNode;
	}
	public String getDestinationNode() {
		return destinationNode;
	}
	public void setDestinationNode(String destinationNode) {
		this.destinationNode = destinationNode;
	}
}
