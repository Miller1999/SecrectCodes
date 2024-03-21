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

	// Este objeto se crea con el fin de evitar errores por tipado, es decir, por escritura si no equivocamos al escribir write en minuscula, writeee o algo por el estilo, de esta manera lo mismo de los action types esta presente en todas las partes
	const actionTypes = {
		CONFIRM: "CONFIRM",
		ERROR: "ERROR",
		CHECK: "CHECK",
		DELETE: "DELETE",
		RESET: "RESET",
		WRITE: "WRITE",
	};
	// Las action creators es de manera que se puede mejorar la legibilidad de la aplicacion y que solo se deba cambiar en un solo sitio
	const onConfirm = () => {
		dispatch({
			type: actionTypes.CONFIRM,
		});
	};
	const onError = () => {
		dispatch({
			type: actionTypes.ERROR,
		});
	};
	const onWrite = (newValue) => {
		dispatch({
			type: actionTypes.WRITE,
			// Se usa el payload para enviar informacion proveniente del DOM
			payload: newValue,
		});
	};
	const onCheck = () => {
		dispatch({
			type: actionTypes.CHECK,
		});
	};
	const onDelete = () => {
		dispatch({
			type: actionTypes.DELETE,
		});
	};
	const onReset = () => {
		dispatch({
			type: actionTypes.RESET,
		});
	};
	const reducerObject = (state, payload) => ({
		// Aqui se coloca cada accion que se quiera hacer para los states
		// Se manda el payload para obtener lo proveniente del DOM
		[actionTypes.CONFIRM]: {
			...state,
			error: false,
			loading: false,
			confirmed: true,
		},
		[actionTypes.ERROR]: {
			...state,
			error: true,
			loading: false,
		},
		[actionTypes.CHECK]: {
			...state,
			loading: true,
		},
		[actionTypes.DELETE]: {
			...state,
			deleted: true,
		},
		[actionTypes.RESET]: {
			...state,
			confirmed: false,
			deleted: false,
			value: "",
		},
		[actionTypes.WRITE]: {
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
				<button onClick={onCheck}>Comprobar</button>
			</div>
		);
	} else if (state.confirmed && !state.deleted) {
		return (
			<React.Fragment>
				<p>Pedimos confirmación, ¿Estas seguro?</p>
				<button onClick={onDelete}>Si, eliminar</button>
				<button onClick={onReset}>No, volver</button>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<p>Eliminado con exito</p>
				<button onClick={onReset}>Recuperar el estado</button>
			</React.Fragment>
		);
	}
}
