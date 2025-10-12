import { describe, it, expect, vi } from "vitest"; // vi sirve para crear funciones simuladas (mock)
import { render, screen, fireEvent } from "@testing-library/react"; // Herramientas para probar componentes
import Formulario from "../components/Formulario";

describe("Comportamiento del Formulario", () => {

    // TEST 1: Verifica que el formulario se renderiza correctamente
    it("Debería renderizarse correctamente", () => {
        const mockOnLogin = vi.fn(); // función falsa para pasar como prop

        render(<Formulario onLogin={mockOnLogin} />); // Renderizamos el componente

        // Verificamos que los elementos principales existan en la pantalla
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument(); // Input email
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();         // Input password
        expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument(); // Botón
    });

    // TEST 2: Muestra error si se hace clic en "Ingresar" sin rellenar los campos
    it("Debe mostrar error si se envía con campos vacíos", async () => {
        const mockOnLogin = vi.fn(() => false);
        render(<Formulario onLogin={mockOnLogin} />);

        // Simulamos clic en el botón de ingresar
        fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

        // Esperamos el mensaje en pantalla (puede tardar un tick del render)
        const error = await screen.findByText(/el correo debe contener '@' y terminar en '.com'/i);
        expect(error).toBeInTheDocument();
    });


    // TEST 3: Muestra error si la contraseña no cumple con los requisitos
    it("Debe mostrar error si la contraseña no cumple requisitos", () => {
        const mockOnLogin = vi.fn(() => false);

        render(<Formulario onLogin={mockOnLogin} />);

        // Simulamos escribir un correo válido
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "usuario@correo.com" },
        });

        // Simulamos escribir una contraseña débil
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "123" },
        });

        // Simulamos clic en el botón de enviar
        fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

        // Verificamos que aparezca el mensaje de error correspondiente
        expect(
            screen.getByText(/la contraseña debe tener al menos/i)
        ).toBeInTheDocument();
    });

    // TEST 4: Si los datos son válidos, se llama correctamente a onLogin
    it("Debe llamar a onLogin si los datos son válidos", () => {
        // Creamos una función simulada que devuelve true (éxito)
        const mockOnLogin = vi.fn(() => true);

        render(<Formulario onLogin={mockOnLogin} />); // Renderizamos el formulario

        // Simulamos ingresar datos correctos
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "Usuario@correo.com" },
        });

        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "Clave123@" },
        });

        // Simulamos clic en el botón
        fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

        // Verificamos que se haya llamado la función una vez
        expect(mockOnLogin).toHaveBeenCalledTimes(1);

        // Verificamos que se haya llamado con los valores correctos
        expect(mockOnLogin).toHaveBeenCalledWith("Usuario@correo.com", "Clave123@");
    });
}); // cierre del bloque describe principal
