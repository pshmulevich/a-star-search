package com.astarsearch.route;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.astarsearch.model.Edge;
import com.astarsearch.model.Node;
import com.astarsearch.model.Point;
import com.astarsearch.model.dto.RoutingResultsDTO;
import com.astarsearch.model.dto.ScenarioDTO;
import com.astarsearch.scenario.DynamicScenario;

/**
 * Performs A-Star search from a lowest-cost path from a origin node to a destination node
 * @param scenarioData TODO
 * @return 
 */
@Component
public class RouteSearch {

	public RoutingResultsDTO aStarSearch(ScenarioDTO scenarioData) {

		DynamicScenario scenario = new DynamicScenario(scenarioData);

		String originName = scenarioData.getOriginNode();
		Assert.hasLength(originName, "originName must not be null and must not be empty");
		String destinationName = scenarioData.getDestinationNode();
		Assert.hasLength(destinationName, "destinationName must not be null and must not be empty");

		final Point originPoint = scenario.getPoint(originName);
		final Point destinationPoint = scenario.getPoint(destinationName);

		Node originNode = createNode(null, null, originPoint, scenario.getOutboundEdges(originPoint));
		//TODO: need to figure out the first 2 parameters
		Node destinationNode = createNode(null, null, destinationPoint, scenario.getOutboundEdges(destinationPoint));

		Comparator<Node> comparator  = new Comparator<Node>() {
			//override compare method
			public int compare(Node node1, Node node2) {
				double fCost1 = node1.getFCost(destinationPoint);
				double fCost2 = node2.getFCost(destinationPoint);

				if(fCost1 > fCost2) {
					return 1;
				} else if (fCost1 < fCost2) {
					return -1;
				} else {
					return 0;
				}
			}
		};

		//		 Creates a PriorityQueue with the specified initial capacity
		//		 that orders its elements according to the specified comparator.		 
		//		 Parameters:
		//		 initial capacity for this priority queue, comparator		 
		//		 Throws:IllegalArgumentException - if initialCapacity is less than 1

		PriorityQueue<Node> queue = new PriorityQueue<Node>(20, comparator);
		queue.add(originNode);


		boolean found = false;
		RoutingResultsDTO routingResults = null;
		while(!queue.isEmpty() && !found) {
			Node lowestCostRoute = queue.poll(); //lowest cost will always be popped off of the head of the queue
			printRoute(lowestCostRoute);
			if(lowestCostRoute.equals(destinationNode)) { // Have you reached the destination check. 
				found = true;
				routingResults = new RoutingResultsDTO("Success", toEdges(lowestCostRoute));
				continue; //skip remaining lines, go back to the loop
			}
			List<Node> moreRoutes = createMoreRoutes(lowestCostRoute, scenario);
			queue.addAll(moreRoutes);
		}

		return routingResults != null ? routingResults : new RoutingResultsDTO("Failed", null);
	}

	private void printRoute(Node lowestCostRoute) {
		Node node = lowestCostRoute;
		while(node != null) {
			System.out.print(node.getCurrentPoint().getName());
			node = node.getParent();
		}
		System.out.println();

	}

	public static class RouteEdge {
		private final String sourceKey;
		private final String targetKey;
		public RouteEdge(String sourceKey, String targetKey) {
			this.sourceKey = sourceKey;
			this.targetKey = targetKey;
		}
		public String getSourceKey() {
			return sourceKey;
		}
		public String getTargetKey() {
			return targetKey;
		}

		@Override
		public String toString() {
			return "[" + sourceKey + "," + targetKey + "]";
		}
	}
	/**
	 * Converts lowest cost route to a list of consecutive edges
	 * @param lowestCostRoute
	 * @return list of edges
	 */
	private List<RouteEdge> toEdges(Node lowestCostRoute) {
		Node node = lowestCostRoute;
		String destination = node.getCurrentPoint().getName();

		List<RouteEdge> lowestCostRouteEdges = new ArrayList<>();

		while(node != null) {
			System.out.print(node.getCurrentPoint().getName());			
			node = node.getParent();
			if(node != null) {
				// Moving in reverse, know only destination when we 
				String source = node.getCurrentPoint().getName();
				RouteEdge routeEdge = new RouteEdge(source, destination);
				lowestCostRouteEdges.add(routeEdge);
				destination = source; //next destination is previous source
			}
		}
		Collections.reverse(lowestCostRouteEdges);
		System.out.println(lowestCostRouteEdges);
		return lowestCostRouteEdges;

	}
	/**
	 * 
	 * @param parentNode
	 * @param leadingEdge
	 * @param point
	 * @param neighbors
	 * @return a new node
	 */
	private static Node createNode(Node parentNode, Edge leadingEdge, Point point, List<Edge> neighbors) {
		return new Node(parentNode, leadingEdge, point, neighbors);
	}
	/**
	 * Move along outbound edges until you reach destination
	 * @param parent
	 * @param scenario 
	 * @return created route array list
	 */
	private List<Node> createMoreRoutes(Node parent, DynamicScenario scenario) {
		List<Node> createdRoutes = new ArrayList<>();

		//Create a list of edges from the parent node.
		List<Edge> neighbors = parent.getNeighbors();
		for(Edge neighbor : neighbors) {
			Point neighborPoint = neighbor.getEnd();
			Node neighborNode = createNode(parent, neighbor, neighborPoint, scenario.getOutboundEdges(neighborPoint));
			createdRoutes.add(neighborNode);			
		}		

		return createdRoutes;
	}
}