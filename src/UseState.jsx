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

	React.useEffect(() => {
		if (state.loading) {
			setTimeout(() => {
				if (state.value === SECURITY_CODE) {
					setState({
						...state,
						error: false,
						loading: false,
						confirmed: true,
					});
				} else {
					setState({
						...state,
						error: true,
						loading: false,
					});
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
						setState({
							...state,
							value: event.target.value,
						});
					}}
				/>
				<button
					onClick={() => {
						setState({
							...state,
							loading: true,
						});
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
						setState({
							...state,
							deleted: true,
						});
					}}
				>
					Si, eliminar
				</button>
				<button
					onClick={() => {
						setState({
							...state,
							confirmed: false,
							value: "",
						});
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
						setState({
							...state,
							confirmed: false,
							deleted: false,
							value: "",
						});
					}}
				>
					Recuperar el estado
				</button>
			</React.Fragment>
		);
	}
}
