import { RootStore } from "./";
import { observable, action, computed, autorun } from "mobx";
import { ObjectOmit } from "typelevel-ts";

interface ITask {
	id: string;
	name: string,
	done: boolean,
	responsible: string;
}

type ISetupTask = ObjectOmit<ITask, "id">

export class TasksStore {
	rootStore: RootStore;

	@observable tasks: ITask[] = [];

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		try {
			this.tasks =
				JSON.parse(
					localStorage.getItem("tasks")!,
				) || [];
		} catch (err) {
			this.tasks = [];
		}

		autorun(() =>
			localStorage.setItem(
				"tasks",
				JSON.stringify(this.tasks),
			),
		);
	}

	getTasksByResponsible = (responsible: string) => {
		return this.tasks.filter(task => task.responsible === responsible);
	}

	@computed
	get countDoneTasks() {
		return this.tasks.filter(task => task.done).length;
	}

	@action
	add = (task: ISetupTask) => {
		const id = `${Math.floor(new Date().valueOf() * Math.random())}`;

		this.tasks.push({id, ...task});
	}

	@action
	remove = (taskId: string) => {
		this.tasks = this.tasks.filter(task => task.id !== taskId);
	}

	@action
	toggleDone = (taskId: string) => {
		this.tasks = this.tasks.map(task => {
			if (task.id !== taskId) return task;

			return {
				...task,
				done: !task.done,
			};
		});
	}
}