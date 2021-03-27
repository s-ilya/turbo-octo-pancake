import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import { worker } from "./services/mock-server";

async function main() {
  if (process.env.REACT_APP_MOCK_SERVER) {
    await worker.start();
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// noinspection JSIgnoredPromiseFromCall
main();
