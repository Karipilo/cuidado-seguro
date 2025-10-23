// Formato AAA (3 PASOS) 
// Arrange – Act – Assert


import { describe, it, expect, vi } from "vitest"; // vi = mocks / funciones simuladas
import { render, screen, fireEvent } from "@testing-library/react";
import Formulario from "../components/Formulario";


// GRUPO DE PRUEBAS
describe("🧩 Comportamiento del componente <Formulario />", () => {

    // ===========================================================
    // TEST 1: Renderizado correcto
    // ===========================================================
    it("✅ Debe renderizar los campos principales del formulario", () => {
        // 🧱 1. ARRANGE - Preparación
        const mockOnLogin = vi.fn(); // función simulada
        render(<Formulario onLogin={mockOnLogin} />);

        // ⚙️ 2. ACT - (no hay acción aquí, solo renderizado inicial)

        // ✅ 3. ASSERT - Verificación
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
    });


    // ===========================================================
    // TEST 2: Error con campos vacíos
    // ===========================================================
    it("❌ Debe mostrar error si se envía sin rellenar los campos", async () => {
        // 🧱 1. ARRANGE
        const mockOnLogin = vi.fn(() => false);
        render(<Formulario onLogin={mockOnLogin} />);

        // ⚙️ 2. ACT
        fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

        // ✅ 3. ASSERT
        const error = await screen.findByText(/el correo debe contener '@' y terminar en '.com'/i);
        expect(error).toBeInTheDocument();
    });


    // ===========================================================
    // TEST 3: Contraseña no cumple requisitos
    // ===========================================================
    it("⚠️ Debe mostrar error si la contraseña no cumple requisitos", () => {
        // 🧱 1. ARRANGE
        const mockOnLogin = vi.fn(() => false);
        render(<Formulario onLogin={mockOnLogin} />);

        // ⚙️ 2. ACT
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "usuario@correo.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

        // ✅ 3. ASSERT
        expect(screen.getByText(/la contraseña debe tener al menos/i))
            .toBeInTheDocument();
    });


    // ===========================================================
    // TEST 4: Datos válidos → onLogin llamado
    // ===========================================================
    it("🟢 Debe llamar a onLogin si los datos son válidos", () => {
        // 🧱 1. ARRANGE
        const mockOnLogin = vi.fn(() => true);
        render(<Formulario onLogin={mockOnLogin} />);

        // ⚙️ 2. ACT
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "Usuario@correo.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "Clave123@" },
        });
        fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

        // ✅ 3. ASSERT
        expect(mockOnLogin).toHaveBeenCalledTimes(1);
        expect(mockOnLogin).toHaveBeenCalledWith("Usuario@correo.com", "Clave123@");
    });
});
