import * as Stores from "./";

export class RootStore {
	tasksStore: Stores.TasksStore;

	constructor() {
		this.tasksStore = new Stores.TasksStore(this);

		return {
			tasksStore: this.tasksStore
		}
	}
}

export default RootStore;