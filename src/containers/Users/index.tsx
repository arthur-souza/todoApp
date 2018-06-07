import * as React from "react";
import { observer, inject } from "mobx-react";
import { UsersStore } from "../../stores";
import { UserForm, IUserFields } from "../../components/UserForm";
import Card from "@material-ui/core/Card";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"

const s = require("./style.scss");

interface IProps {
	usersStore?: UsersStore;
}

@inject("usersStore")
@observer
export class Users extends React.Component<IProps, {}> {
	addNewUser = (values: IUserFields) => {
		this.props.usersStore!.add(values);
	}

	deleteUser = (userId: string) => {
		this.props.usersStore!.remove(userId);
	}

	render() {
		return (
			<div className={s.container}>
				<UserForm
					onSubmit={this.addNewUser}
				/>

				<div className={s.tasksInfo}>
					<Card className={s.taskInfo}>
						<div className={s.taskInfo_value}>
							{this.props.usersStore!.users.length}
						</div>
						<div className={s.taskInfo_name}>Total</div>
					</Card>
				</div>

				<div className={s.taskList}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nome</TableCell>
								<TableCell>E-mail</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.usersStore!.users.map(user => (
								<TableRow key={user.id}>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										<IconButton
											title="Delete"
											onClick={() => this.deleteUser(user.id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	}
}

export default Users;
