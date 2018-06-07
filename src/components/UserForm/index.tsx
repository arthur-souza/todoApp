import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react"

// Meterial-UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const s = require("./style.scss");

export interface IUserFields {
	name: string;
	email: string;
}

interface IProps {
	onSubmit: (fields: IUserFields) => void;
}

@observer
export class UserForm extends React.Component<IProps, {}> {
	@observable name: string = "";
	@observable email: string = "";

	@action
	changeName = (name: string) => this.name = name;

	@action
	changeEmail = (email: string) => this.email = email;

	handleSubmit = (e: any) => {
		e.preventDefault();

		this.props.onSubmit({
			name: this.name,
			email: this.email,
		});

		this.changeName("");
		this.changeEmail("");
	}

	render() {
		return (
			<Card className={s.card}>
				<div className={s.title}>Adicionar novo usuário</div>
				<form onSubmit={this.handleSubmit} className={s.form}>
					<div className={s.inputGroup}>
						<TextField
							value={this.name}
							onChange={(e) => this.changeName(e.target.value)}
							label="Nome"
							name="nome"
							required
						/>
					</div>
					<div className={s.inputGroup}>
						<TextField
							type="email"
							value={this.email}
							onChange={(e) => this.changeEmail(e.target.value)}
							label="E-mail"
							name="email"
							required
						/>
					</div>

					<Button variant="raised" size="medium" color="primary" type="submit">
						Adicionar
				</Button>
				</form>
			</Card>
		)
	}
}