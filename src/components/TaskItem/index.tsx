import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const s = require("./style.scss");

interface IProps {
	name: string;
	category: string;
	done: boolean;
	id: string;
	handleToggle: (taskId: string) => void;
	handleDelete: (taskId: string) => void;
}

export class TaskItem extends React.Component<IProps, {}> {
	render() {
		return (
			<ListItem dense button>
				<ListItemText
					primary={
						<div className={s.title}>
							<span className={s.title_name}>{this.props.name}</span>
							<span className={s.title_separator}>-</span>
							<span className={s.title_category}>{this.props.category}</span>
						</div>
					}
				/>
				<ListItemSecondaryAction>
					<Checkbox
						onChange={() => this.props.handleToggle(this.props.id)}
						checked={this.props.done}
					/>
					<IconButton
						title="Delete"
						onClick={() => this.props.handleDelete(this.props.id)}
					>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}