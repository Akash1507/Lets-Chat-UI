import React from "react";
import ReactDom from "react-dom";
import Chat from "./containers/Chat";

class App extends React.Component {
  render() {
    return <Chat />;
  }
}

ReactDom.render(<App />, document.getElementById("app"));
