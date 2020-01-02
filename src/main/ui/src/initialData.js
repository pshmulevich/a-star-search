export const scaleFactor = 200;
export const initialZoomFactor = 1.0;

export const initialScenarioData = {
  from: "a",
  to: "q",
  nodes: {
    a: { x: 1, y: 1, key: "a" },
    b: { x: 2, y: 0.4, key: "b" },
    c: { x: 3, y: 1, key: "c" },
    d: { x: 1.7, y: 1.95, key: "d" },
    e: { x: 2, y: 1.79941, key: "e" },
    f: { x: 2.8835, y: 3.9827, key: "f" },
    g: { x: 0.998, y: 4, key: "g" },
    h: { x: 1.053, y: 5.59554, key: "h" },
    i: { x: 4, y: 0.7, key: "i" },
    j: { x: 3.4, y: 2.1, key: "j" },
    k: { x: 5, y: 1, key: "k" },
    l: { x: 3.3, y: 3.104, key: "l" },
    m: { x: 4.779, y: 4, key: "m" },
    n: { x: 4.5, y: 4.5, key: "n" },
    o: { x: 5.7, y: 4.9, key: "o" },
    p: { x: 4.7, y: 5.8, key: "p" },
    q: { x: 5.9, y: 5.9, key: "q" },
    r: { x: 3.7, y: 4, key: "r" }
  },
  edges: [
    { from: "a", to: "b" },
    { from: "b", to: "c" },
    { from: "c", to: "l" },
    { from: "b", to: "d" },
    { from: "d", to: "e" },
    { from: "e", to: "f" },
    { from: "e", to: "g" },
    { from: "g", to: "h" },
    { from: "h", to: "r" },
    { from: "l", to: "r" },
    { from: "l", to: "j" },
    { from: "l", to: "m" },
    { from: "j", to: "i" },
    { from: "j", to: "k" },
    { from: "k", to: "o" },
    { from: "o", to: "m" },
    { from: "m", to: "r" },
    { from: "r", to: "p" },
    { from: "q", to: "n" },
    { from: "p", to: "q" }
  ]
};

export const initialScenarioData1 = {
  from: "a",
  to: "q",
  nodes: {
    a: { x: 1, y: 1, key: "a" },
    q: { x: 2.7, y: 2, key: "q" }
  },
  edges: [{ from: "a", to: "q" }]
};

export const toInitialData = scenarioData => {
  return {
    to: scenarioData.to,
    from: scenarioData.from,
    originalNodesMap: scenarioData.nodes,
    originalLinks: scenarioData.edges
  };
};

const initialData = toInitialData(initialScenarioData);

export default initialData;

//postProcessData is data that can be used by what graph requires
// Keeps object references to change data
export const postProcessData = data => {
  const linksMap = {};
  const updatedLinks = data.originalLinks.map(link => {
    link.source = data.originalNodesMap[link.from];
    link.target = data.originalNodesMap[link.to];
    linksMap[`${link.from},${link.to}`] = link;
    linksMap[`${link.to},${link.from}`] = link;
    return link;
  });
  // We can now use updatedLinks
  data.links = updatedLinks;
  data.linksMap = linksMap;

  const nodes = Object.values(data.originalNodesMap);
  const indexedNodes = nodes.map((node, index) => {
    node.x = node.x * scaleFactor;
    node.y = node.y * scaleFactor;
    node.index = index; // This creates index attribute in the existing node object
    return node;
  });
  //We can now use indexedNodes
  data.nodes = indexedNodes;
  return data;
};
