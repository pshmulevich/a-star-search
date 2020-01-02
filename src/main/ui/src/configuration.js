const MODES = {
  local: "local",
  heroku: "heroku",
  sameServer: "sameServer"
};

const mode = MODES.sameServer;

const herokuServiceUrl =
  "https://a-star-search-demo.herokuapp.com/api/findRoute"; // for production testing
const localServiceUrl = "http://localhost:8085/api/findRoute"; // for Spring Boot work
const sameServerServiceUrl = "/api/findRoute"; // for deploy

export const serviceEndpoint =
  mode === MODES.local
    ? localServiceUrl
    : mode === MODES.heroku
    ? herokuServiceUrl
    : sameServerServiceUrl;
