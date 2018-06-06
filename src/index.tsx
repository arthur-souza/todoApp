import * as React from "react";
import * as ReactDOM from "react-dom"
import { Provider } from "mobx-react";
import { RootStore } from "./stores";
import App from "./containers/App";

const rootStore = new RootStore();

ReactDOM.render(
	<Provider {...rootStore}>
		<App />
	</Provider>,
	document.getElementById("root"),
);
