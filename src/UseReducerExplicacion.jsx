// Reducer es la forma mas declarativa de manejar los estados, necesita dos objetos importantes, un objeto con los estados iniciales y otro con las funciones
// La forma base es:
/* 
  const reducer = (state,action) => {
    action: funciona para saber cual es el estado que queremos manejar, seria el setState que se usa normalmente en useState
    state:  son los estados iniciales de nuestra app
*/

const initialState = {
	value: "",
	error: false,
	loading: false,
	deleted: false,
	confirmed: false,
};
//! Primera manera de crear un Reducer
const reducerIf = (state, action) => {
	// action.type -> Se crea un if por cada estado que se quiera trabajar
	if (action.type === "ERROR") {
		return {
			...state,
			error: true,
			loading: false,
		};
	} else if (action.type === "CHECK") {
		return {
			...state,
			loading: true,
		};
	} else {
		return {
			...initialState,
		};
	}
};
//! Segunda forma de crear un reducer
const reducerSwitch = (state, action) => {
	switch (action.type) {
		case "ERROR":
			return {
				...state,
				error: true,
				loading: false,
			};
		case "CHECK":
			return {
				...state,
				loading: true,
			};
		default:
			return {
				...initialState,
			};
	}
};
//! Tercera forma de crear un reducer
//* Para este tipo se divide el reducer en dos: por un lado los objetos que seria el reducerObject, y la funcion reducer
const reducerObject = (state) => ({
	ERROR: {
		...state,
		error: true,
		loading: false,
	},
	CHECK: {
		...state,
		loading: true,
	},
});

const reducer = (state, action) => {
	if (reducerObject(state)[action.type]) {
		return reducerObject(state)[action.type];
	} else {
		return state;
	}
};
