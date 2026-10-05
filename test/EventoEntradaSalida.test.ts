import { describe, expect, it } from "vitest";
import { EventoEntradaSalida } from "../src/EventoEntradaSalida";

describe(
	"Clase EventoEntradaSalida",
	() => {

		it(
			"debería crear un evento con duración",
			() => {

				const evento =
					new EventoEntradaSalida(
						3
					);

				expect(
					evento.duracion
				).toBe(3);

			}
		);

	}
);
