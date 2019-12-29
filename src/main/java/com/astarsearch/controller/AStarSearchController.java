package com.astarsearch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astarsearch.model.dto.RoutingResultsDTO;
import com.astarsearch.model.dto.ScenarioDTO;
import com.astarsearch.route.RouteSearch;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AStarSearchController {
	
	@Autowired
	private RouteSearch routeSearch;
	
	
	
	@PostMapping(path = "/findRoute")
	public ResponseEntity<RoutingResultsDTO> findRoutePost(@RequestBody ScenarioDTO scenarioData) {
		try {
			System.out.println("Request for Routing received:" + scenarioData);
			RoutingResultsDTO route = routeSearch.aStarSearch(scenarioData);
			return new ResponseEntity<>(route, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
