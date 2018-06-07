import * as React from "react";
import { observer, inject } from "mobx-react";
import List from "@material-ui/core/List";
import { TasksStore, UsersStore } from "../../stores";
import { TaskForm, ITaskFields } from "../../components/TaskForm";
import { TaskItem } from "../../components/TaskItem";
import Card from "@material-ui/core/Card";

const s = require("./style.scss");

interface IProps {
	tasksStore?: TasksStore;
	usersStore?: UsersStore;
}

@inject("tasksStore", "usersStore")
@observer
export class Tasks extends React.Component<IProps, {}> {
	addNewTask = (values: ITaskFields) => {
		this.props.tasksStore!.add({
			name: values.name,
			responsible: values.user,
			done: false,
		})
	}

	deleteTask = (taskId: string) => {
		this.props.tasksStore!.remove(taskId);
	}

	toggleDone = (taskId: string) => {
		this.props.tasksStore!.toggleDone(taskId);
	}

	getUserName = (userId: string) => {
		const user = this.props.usersStore!.getUser(userId);

		return user ? user.name : null;
	}

	render() {
		return (
			<div className={s.container}>
				<TaskForm
					onSubmit={this.addNewTask}
					UsersOptions={this.props.usersStore!.users.map(user => ({
						name: user.name,
						id: user.id,
					}))}
				/>

				<div className={s.tasksInfo}>
					<Card className={s.taskInfo}>
						<div className={s.taskInfo_value}>{this.props.tasksStore!.tasks.length}</div>
						<div className={s.taskInfo_name}>Total</div>
					</Card>
					<Card className={s.taskInfo}>
						<div className={s.taskInfo_value}>{this.props.tasksStore!.countDoneTasks}</div>
						<div className={s.taskInfo_name}>Concluídas</div>
					</Card>
				</div>

				<div className={s.taskList}>
					<List>
						{this.props.tasksStore!.tasks.map((task, index) => (
							<TaskItem
								key={index}
								name={task.name}
								user={this.getUserName(task.responsible) || ""}
								done={task.done}
								id={task.id}
								handleToggle={this.toggleDone}
								handleDelete={this.deleteTask}
							/>
						))}
					</List>
				</div>
			</div>
		);
	}
}

export default Tasks;
