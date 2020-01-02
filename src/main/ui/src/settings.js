import React, { useState, useContext } from "react";
import dJSON from "dirty-json";

import { DataContext } from "./dataContext";
import { toInitialData, postProcessData } from "./initialData";

const Settings = ({ history }) => {
  const appData = useContext(DataContext);

  const [scenarioDataInput, setScenarioDataInput] = useState(
    JSON.stringify(appData.scenarioData, null, 2)
  );
  const [error, setError] = useState(undefined);

  const parseJsonInfo = () => {
    setError(undefined);
    //read in the JSON value
    try {
      var jsonObject = dJSON.parse(scenarioDataInput);
      console.log("settings:parseJsonInfo jsonObject:", jsonObject);
      appData.setScenarioData(jsonObject);
      appData.setGraphData(postProcessData(toInitialData(jsonObject)));
      // Move back to home page
      history.push("/");
    } catch (parsingError) {
      console.error("Not a valid JSON", parsingError);
      setError(parsingError);
    }
  };

  return (
    <div>
      <h1>Settings:</h1>
      <p>Enter new node data:</p>
      <div>
        <textarea
          className={(error ? "errorsFound " : "") + "scenarioData"}
          value={scenarioDataInput}
          onChange={e => setScenarioDataInput(e.target.value)}
          placeholder={"Please Enter JSON data"}
        />
      </div>
      <button onClick={parseJsonInfo}>Submit Node Data</button>
      <div className="errorMessage">{!error || error.toString()}</div>
    </div>
  );
};
export default Settings;
