import * as React from "react";
import * as ReactDOM from "react-dom"
import { Provider } from "mobx-react";
import { RootStore } from "./stores";

const rootStore = new RootStore();

ReactDOM.render(
	<Provider {...rootStore}>
		<div>Hello</div>
	</Provider>,
	document.getElementById("root"),
);
