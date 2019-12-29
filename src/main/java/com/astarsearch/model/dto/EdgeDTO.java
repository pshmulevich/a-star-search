package com.astarsearch.model.dto;

public class EdgeDTO {
	private String sourceKey;
	private String targetKey;
	private String label;
	private NodeDTO source;
	private NodeDTO target;
	
	public String getSourceKey() {
		return sourceKey;
	}
	public void setSourceKey(String sourceKey) {
		this.sourceKey = sourceKey;
	}
	public String getTargetKey() {
		return targetKey;
	}
	public void setTargetKey(String targetKey) {
		this.targetKey = targetKey;
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
