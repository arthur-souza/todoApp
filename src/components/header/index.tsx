import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const s = require("./style.scss");

interface IProps {
	title: string;
}

export class Header extends React.Component<IProps, {}> {
	render() {
		return (
			<div className={s.header}>
				<AppBar position="static" color="default">
					<Toolbar>
						<Typography variant="title" color="inherit">
							{this.props.title}
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

export default Header;