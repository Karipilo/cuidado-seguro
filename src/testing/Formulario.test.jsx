// Incluye Router para evitar errores con useNavigate()
// Estructurado en 3 pasos por prueba: ARRANGE, ACT, ASSERT

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Formulario from "../components/Formulario";

// Función auxiliar para renderizar con Router
const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// ===============================================================
// GRUPO DE PRUEBAS UNITARIAS PARA <Formulario />
// ===============================================================
describe("Comportamiento del componente <Formulario />", () => {

    // ===========================================================
    // TEST 1: Renderizado correcto
    // ===========================================================
    it("Debe renderizar los campos principales del formulario", () => {
        // 1. ARRANGE: Preparar el entorno con el componente
        const mockOnLogin = vi.fn();
        renderWithRouter(<Formulario onLogin={mockOnLogin} />);

        // 2. ACT: No hay acciones en este test
        // 3. ASSERT: Verificar que los elementos clave están presentes
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
    });

    // ===========================================================
    // TEST 2: Error con campos vacíos
    // ===========================================================
    it("Debe mostrar error si se envía sin rellenar los campos", async () => {
        // 1. ARRANGE: Preparar el entorno con mock y renderizado
        const mockOnLogin = vi.fn(() => false);
        renderWithRouter(<Formulario onLogin={mockOnLogin} />);

        // 2. ACT: Simular envío sin ingresar datos
        fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

        // 3. ASSERT: Verificar mensaje de error por correo inválido
        const error = await screen.findByText(/el correo debe contener '@' y terminar en '.com'/i);
        expect(error).toBeInTheDocument();
    });

    // ===========================================================
    // TEST 3: Contraseña no cumple requisitos
    // ===========================================================
    it("Debe mostrar error si la contraseña no cumple requisitos", () => {
        // 1. ARRANGE: Crear entorno con datos incompletos
        const mockOnLogin = vi.fn(() => false);
        renderWithRouter(<Formulario onLogin={mockOnLogin} />);

        // 2. ACT: Ingresar correo válido pero contraseña corta
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "usuario@correo.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

        // 3. ASSERT: Verificar mensaje de error por contraseña inválida
        expect(screen.getByText(/la contraseña debe tener al menos/i)).toBeInTheDocument();
    });

    // ===========================================================
    // TEST 4: Datos válidos → onLogin llamado
    // ===========================================================
    it("Debe llamar a onLogin si los datos son válidos", () => {
        // 1. ARRANGE: Preparar entorno con función simulada válida
        const mockOnLogin = vi.fn(() => true);
        renderWithRouter(<Formulario onLogin={mockOnLogin} />);

        // 2. ACT: Ingresar datos correctos y enviar
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "Usuario@correo.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "Clave123@" },
        });
        fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

        // 3. ASSERT: Verificar que onLogin se haya llamado una vez con los datos correctos
        expect(mockOnLogin).toHaveBeenCalledTimes(1);
        expect(mockOnLogin).toHaveBeenCalledWith("Usuario@correo.com", "Clave123@");
    });
});
