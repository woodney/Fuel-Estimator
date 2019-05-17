import React from "react";
import { render } from "react-dom";
import "./index.css";
import AppContent from "./AppContent";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Redux"
    };
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContent />
        </PersistGate>
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
