import React from "react";

const SECURITY_CODE = "paradigma";

export function UseState({ name }) {
	const [state, setState] = React.useState({
		value: "",
		error: false,
		loading: false,
		deleted: false,
		confirmed: false,
	});
	// Funciones para estados semideclarativos
	const onConfirm = () => {
		setState({
			...state,
			error: false,
			loading: false,
			confirmed: true,
		});
	};
	const onError = () => {
		setState({
			...state,
			error: true,
			loading: false,
		});
	};
	const onWrite = (newValue) => {
		setState({
			...state,
			value: newValue,
		});
	};
	const onCheck = () => {
		setState({
			...state,
			loading: true,
		});
	};
	const onDelete = () => {
		setState({
			...state,
			deleted: true,
		});
	};
	const onReset = () => {
		setState({
			...state,
			confirmed: false,
			deleted: false,
			value: "",
		});
	};

	React.useEffect(() => {
		if (state.loading) {
			setTimeout(() => {
				if (state.value === SECURITY_CODE) {
					onConfirm();
				} else {
					onError();
				}
			}, 1000);
		}
	}, [state.loading]);

	if (!state.deleted && !state.confirmed) {
		return (
			<div>
				<h2>Eliminar {name}</h2>
				<p>Por favor, escribe el codigo de seguridad.</p>
				{state.error && !state.loading && <p>Error: El codigo es incorrecto</p>}
				{state.loading && <p>Cargando...</p>}
				<input
					placeholder="Codigo de seguridad"
					value={state.value}
					onChange={(event) => {
						onWrite(event.target.value);
					}}
				/>
				<button
					onClick={() => {
						onCheck();
					}}
				>
					Comprobar
				</button>
			</div>
		);
	} else if (state.confirmed && !state.deleted) {
		return (
			<React.Fragment>
				<p>Pedimos confirmación, ¿Estas seguro?</p>
				<button
					onClick={() => {
						onDelete();
					}}
				>
					Si, eliminar
				</button>
				<button
					onClick={() => {
						onReset();
					}}
				>
					No, volver
				</button>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<p>Eliminado con exito</p>
				<button
					onClick={() => {
						onReset();
					}}
				>
					Recuperar el estado
				</button>
			</React.Fragment>
		);
	}
}
