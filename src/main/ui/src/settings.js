import React, { useContext } from "react";
import { DataContext } from "./dataContext";

const Settings = () => {
  const appData = useContext(DataContext);
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};
export default Settings;
