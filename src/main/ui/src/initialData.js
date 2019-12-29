const scaleFactor = 100;
export const initialZoomFactor = 1.0;
const originalNodesMap = {
  a: { x: 1 * scaleFactor, y: 1 * scaleFactor, key: "a" },
  b: { x: 2 * scaleFactor, y: 0.4 * scaleFactor, key: "b" },
  c: { x: 3 * scaleFactor, y: 1 * scaleFactor, key: "c" },
  d: { x: 1.7 * scaleFactor, y: 1.95 * scaleFactor, key: "d" },
  e: { x: 2 * scaleFactor, y: 1.79941 * scaleFactor, key: "e" },
  f: { x: 2.8835 * scaleFactor, y: 3.9827 * scaleFactor, key: "f" },
  g: { x: 0.998 * scaleFactor, y: 4 * scaleFactor, key: "g" },
  h: { x: 1.053 * scaleFactor, y: 5.59554 * scaleFactor, key: "h" },
  i: { x: 4 * scaleFactor, y: 0.7 * scaleFactor, key: "i" },
  j: { x: 3.4 * scaleFactor, y: 2.1 * scaleFactor, key: "j" },
  k: { x: 5 * scaleFactor, y: 1 * scaleFactor, key: "k" },
  l: { x: 3.3 * scaleFactor, y: 3.104 * scaleFactor, key: "l" },
  m: { x: 4.779 * scaleFactor, y: 4 * scaleFactor, key: "m" },
  n: { x: 4.5 * scaleFactor, y: 4.5 * scaleFactor, key: "n" },
  o: { x: 5.7 * scaleFactor, y: 4.9 * scaleFactor, key: "o" },
  p: { x: 4.7 * scaleFactor, y: 5.8 * scaleFactor, key: "p" },
  q: { x: 5.9 * scaleFactor, y: 5.9 * scaleFactor, key: "q" },
  r: { x: 3.7 * scaleFactor, y: 4 * scaleFactor, key: "r" }
};
const initialData = {
  originalNodesMap: originalNodesMap,
  originalLinks: [
    { sourceKey: "a", targetKey: "b" },
    { sourceKey: "b", targetKey: "c" },
    { sourceKey: "c", targetKey: "l" },
    { sourceKey: "b", targetKey: "d" },
    { sourceKey: "d", targetKey: "e" },
    { sourceKey: "e", targetKey: "f" },
    { sourceKey: "e", targetKey: "g" },
    { sourceKey: "g", targetKey: "h" },
    { sourceKey: "h", targetKey: "r" },
    { sourceKey: "l", targetKey: "r" },
    { sourceKey: "l", targetKey: "j" },
    { sourceKey: "l", targetKey: "m" },
    { sourceKey: "j", targetKey: "i" },
    { sourceKey: "j", targetKey: "k" },
    { sourceKey: "k", targetKey: "o" },
    { sourceKey: "o", targetKey: "m" },
    { sourceKey: "m", targetKey: "r" },
    { sourceKey: "r", targetKey: "p" },
    { sourceKey: "q", targetKey: "n" },
    { sourceKey: "p", targetKey: "q" }
  ]
};

export const initialSourceNodeKey = "a";
export const initialTargetNodeKey = "q";

export const linksMap = {};

//postProcessData is data that can be used by what graph requires
// Keeps object references to change data
export const postProcessData = data => {
  const updatedLinks = data.originalLinks.map(link => {
    link.source = data.originalNodesMap[link.sourceKey];
    link.target = data.originalNodesMap[link.targetKey];
    linksMap[`${link.sourceKey},${link.targetKey}`] = link;
    linksMap[`${link.targetKey},${link.sourceKey}`] = link;
    return link;
  });
  // We can now use updatedLinks
  data.links = updatedLinks;

  const nodes = Object.values(data.originalNodesMap);
  const indexedNodes = nodes.map((node, index) => {
    node.index = index; // This creates index attribute in the existing node object
    return node;
  });
  //We can now use indexedNodes
  data.nodes = indexedNodes;
  return data;
};
export default initialData;
