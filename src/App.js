import React from "react";
import logo from "./assets/logo.png";
import LayerTable from "./components/LayerMapTable";
import "./App.css";

function App() {
	return (
		<div className="App">
			<img className="logo" src={logo}/>
			<LayerTable/>
		</div>
	);
}

export default App;
