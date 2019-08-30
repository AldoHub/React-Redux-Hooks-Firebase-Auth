import React from 'react';

import Routes from "./routes";
import Nav from "./components/Nav";

import Store from "./store/store";
import {Provider} from "react-redux";




function App() {

  return (

    <Provider store={Store}>
      <div className="App">
       <Nav/>
        <main>
          <Routes />
        </main>
    
      </div>
    </Provider>
  );
}

export default App;
