package com.astarsearch.model.dto;

public class EdgeDTO {
	private String from;
	private String to;
	private String label;
	private NodeDTO source;
	private NodeDTO target;
	
	public String getFrom() {
		return from;
	}
	public void setFrom(String sourceKey) {
		this.from = sourceKey;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String targetKey) {
		this.to = targetKey;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public NodeDTO getSource() {
		return source;
	}
	public void setSource(NodeDTO source) {
		this.source = source;
	}
	public NodeDTO getTarget() {
		return target;
	}
	public void setTarget(NodeDTO target) {
		this.target = target;
	}
}
