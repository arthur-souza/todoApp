import { RootStore } from "./";
import { observable, action, autorun } from "mobx";
import { ObjectOmit } from "typelevel-ts";

interface IUser {
	id: string;
	name: string,
	email: string,
}

type ISetupTask = ObjectOmit<IUser, "id">

export class UsersStore {
	rootStore: RootStore;

	@observable users: IUser[] = [];

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		try {
			this.users =
				JSON.parse(
					localStorage.getItem("users")!,
				) || [];
		} catch (err) {
			this.users = [];
		}

		autorun(() =>
			localStorage.setItem(
				"users",
				JSON.stringify(this.users),
			),
		);
	}

	getUser = (userId: string) => {
		return this.users.find(user => user.id === userId);
	}

	@action
	add = (user: ISetupTask) => {
		const id = `${Math.floor(new Date().valueOf() * Math.random())}`;

		this.users.push({id, ...user});
	}

	@action
	remove = (userId: string) => {
		this.users = this.users.filter(user => user.id !== userId);
	}
}