import React from "react";

const SECURITY_CODE = "paradigma";

export function UseReducer({ name }) {
	//Para useReducer se usa la misma logica que ya se construyo en la explicacion, useReducer(funcion,estados_iniciales)
	const initialState = {
		value: "",
		error: false,
		loading: false,
		deleted: false,
		confirmed: false,
	};
	const [state, dispatch] = React.useReducer(reducer, initialState);

	React.useEffect(() => {
		if (state.loading) {
			setTimeout(() => {
				if (state.value === SECURITY_CODE) {
					dispatch({
						type: "CONFIRM",
					});
				} else {
					dispatch({
						type: "ERROR",
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
						dispatch({
							type: "WRITE",
							// Se usa el payload para enviar informacion proveniente del DOM
							payload: event.target.value,
						});
					}}
				/>
				<button
					onClick={() => {
						dispatch({
							type: "CHECK",
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
						dispatch({
							type: "DELETE",
						});
					}}
				>
					Si, eliminar
				</button>
				<button
					onClick={() => {
						dispatch({
							type: "RESET",
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
						dispatch({
							type: "RESET",
						});
					}}
				>
					Recuperar el estado
				</button>
			</React.Fragment>
		);
	}
}

//! Tercera forma de crear un reducer
//* Para este tipo se divide el reducer en dos: por un lado los objetos que seria el reducerObject, y la funcion reducer
const reducerObject = (state, payload) => ({
	// Aqui se coloca cada accion que se quiera hacer para los states
	// Se manda el payload para obtener lo proveniente del DOM
	CONFIRM: {
		...state,
		error: false,
		loading: false,
		confirmed: true,
	},
	ERROR: {
		...state,
		error: true,
		loading: false,
	},
	CHECK: {
		...state,
		loading: true,
	},
	DELETE: {
		...state,
		deleted: true,
	},
	RESET: {
		...state,
		confirmed: false,
		deleted: false,
		value: "",
	},
	WRITE: {
		...state,
		value: payload,
	},
});

const reducer = (state, action) => {
	if (reducerObject(state)[action.type]) {
		// action.payload para enviar la info proveniente del DOM
		return reducerObject(state, action.payload)[action.type];
	} else {
		return state;
	}
};
