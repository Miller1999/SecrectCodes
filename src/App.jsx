import { UseState } from "./UseState.jsx";
import { UseReducer } from "./UseReducer.jsx";
import React from "react";

function App() {
	return (
		<div className="app">
			<UseState name="UseState" />
			<UseReducer name="UseReducer" />
		</div>
	);
}

export default App;
