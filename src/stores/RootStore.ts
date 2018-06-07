import * as Stores from "./";

export class RootStore {
	tasksStore: Stores.TasksStore;
	usersStore: Stores.UsersStore;

	constructor() {
		this.tasksStore = new Stores.TasksStore(this);
		this.usersStore = new Stores.UsersStore(this);

		return {
			tasksStore: this.tasksStore,
			usersStore: this.usersStore,
		}
	}
}

export default RootStore;