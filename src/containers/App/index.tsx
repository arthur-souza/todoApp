import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tasks from "../Tasks";
import Users from "../Users";
import "normalize.css";

const s = require("./style.scss");

interface IProps {}

@observer
export class App extends React.Component<IProps, {}> {
	@observable currentTab: number = 0;

	@action
	handleChangeTab = (tab: number) => {
		this.currentTab = tab;
	}

	render() {
		const currentTab = this.currentTab;

		return (
			<div className={s.container}>
				<header className={s.header}>
					<Tabs
						value={currentTab}
						onChange={(_, value) => this.handleChangeTab(value)}
						indicatorColor="secondary"
						textColor="secondary"
						centered
					>
						<Tab label="Tarefas" />
						<Tab label="Pessoas" />
					</Tabs>
				</header>

				<div className={s.content}>
					{currentTab === 0 && <Tasks />}
					{currentTab === 1 && <Users />}
				</div>
			</div>
		)
	}
}

export default App;