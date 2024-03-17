import React from "react";

const SECURITY_CODE = "paradigma";

export function UseState({ name }) {
	const [error, setError] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		if (loading) {
			setTimeout(() => {
				if (value === SECURITY_CODE) {
					setLoading(false);
				} else {
					setError(true);
					setLoading(false);
				}
			}, 3000);
		}
	}, [loading]);
	return (
		<div>
			<h2>Eliminar {name}</h2>
			<p>Por favor, escribe el codigo de seguridad.</p>
			{error && <p>Error: El codigo es incorrecto</p>}
			{loading && <p>Cargando...</p>}
			<input
				placeholder="Codigo de seguridad"
				value={value}
				onChange={(event) => {
					setValue(event.target.value);
				}}
			/>
			<button
				onClick={() => {
					setError(!error);
					setLoading(true);
				}}
			>
				Comprobar
			</button>
		</div>
	);
}
