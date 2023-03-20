import { createContext } from "react";

export const ServerContext = createContext(null);

/*
import React, { createContext, Component } from "react";

export const ServerContext = createContext();

class ServerContextProvider extends Component {
  state = {
    server: {
      serverName: "",
      serverType: [],
      serverJavaAddress: "",
      serverJavaPort: "25565",
      serverbedrockAddress: "",
      serverBedrockPort: "25565",
      serverCountry: "",
      serverThumbnail: "",
      serverIcon: "",
      serverDescription: "",
      serverShortDescription: "",
      serverTypes: "",
    },
    step: 0,
  };
  render() {
    return (
      <ServerContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ServerContext.Provider>
    );
  }
}

export default ServerContextProvider;
*/
