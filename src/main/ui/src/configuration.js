const isLocal = true;

const herokuServiceUrl =
  "https://a-star-search-demo.herokuapp.com/api/findRoute";
const localServiceUrl = "http://localhost:8085/api/findRoute";

export const serviceEndpoint = isLocal ? localServiceUrl : herokuServiceUrl;
