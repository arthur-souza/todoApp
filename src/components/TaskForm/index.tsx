import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react"

// Meterial-UI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const s = require("./style.scss");

export interface ITaskFields {
	name: string;
	category: string;
}

interface IProps {
	onSubmit: (fields: ITaskFields) => void;
	categoryOptions: {
		label: string;
		value: string | number;
	}[];
	defaultCategory?: string;
}

@observer
export class TaskForm extends React.Component<IProps, {}> {
	@observable name: string = "";
	@observable category: string = "";

	@action
	changeName = (name: string) => this.name = name;

	@action
	changeCategory = (category: string) => this.category = category;

	handleSubmit = (e: any) => {
		e.preventDefault();

		this.props.onSubmit({
			name: this.name,
			category: this.category,
		});

		this.changeCategory("");
		this.changeName("");
	}

	componentWillMount() {
		if (this.props.defaultCategory) {
			this.category = this.props.defaultCategory;
		}
	}

	componentWillUpdate() {
		if (this.props.defaultCategory) {
			this.category = this.props.defaultCategory;
		}
	}

	render() {
		return (
			<Card className={s.card}>
				<div className={s.title}>Adicionar nova tarefa</div>
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
						<FormControl className={s.select}>
							<InputLabel htmlFor="category">Categoria</InputLabel>
							<Select
								value={this.category}
								onChange={(e) => this.changeCategory(e.target.value)}
								input={<Input name="category" id="category" />}
							>
								{this.props.categoryOptions.map((category, index) => (
									<MenuItem value={category.value} key={index}>{category.label}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<Button variant="raised" size="medium" color="primary" type="submit">
						Adicionar
				</Button>
				</form>
			</Card>
		)
	}
}