import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import RootContext from "./RootContext";

import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <RootContext.Provider value={{}}>
            <App title={"CSIS 3750"} />
        </RootContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
