import { UseState } from "./UseState.jsx";
import { ClassState } from "./ClassState.jsx";
import React from "react";

function App() {
	return (
		<div className="app">
			<UseState name="UseState" />
			<ClassState name="ClassState" />
		</div>
	);
}

export default App;
