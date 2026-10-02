import { describe, expect, it } from "vitest";
import { FirstFit } from "../src/FirstFit";
import { BloquedeMemoria } from "../src/BloquedeMemoria";
import { Proceso } from "../src/Proceso";
import { EstadoSimulado } from "../src/EstadoSimulado";

    it("debería seleccionar el primer bloque disponible", () => {
        const politica = new FirstFit();
        const bloques = [ new BloquedeMemoria(0, 100), new BloquedeMemoria(100, 300), new BloquedeMemoria(400, 600)];
        const proceso = new Proceso(1,200,new EstadoSimulado());
        const resultado = politica.seleccionarBloque(bloques,proceso);
        
        expect(resultado).toBe(bloques[1]);
    });

    it("debería devolver null cuando ningún bloque alcanza", () => {
        const politica = new FirstFit();

        const bloques = [
            new BloquedeMemoria(0, 100),
            new BloquedeMemoria(100, 150)
        ];

        const proceso = new Proceso(
            1,
            300,
            new EstadoSimulado()
        );

        const resultado = politica.seleccionarBloque(bloques, proceso);

        expect(resultado).toBeNull();
    });

