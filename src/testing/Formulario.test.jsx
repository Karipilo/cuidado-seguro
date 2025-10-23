// ===============================================================
// 🧩 Archivo: Formulario.test.jsx
// Descripción: Pruebas del componente <Formulario /> con Vitest
// Incluye Router para evitar el error de useNavigate().
// ===============================================================

import { describe, it, expect, vi } from "vitest"; // vi = mocks / funciones simuladas
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // ✅ Importamos Router
import Formulario from "../components/Formulario";

// Helper para renderizar con contexto de Router
const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// ===============================================================
// GRUPO DE PRUEBAS
// ===============================================================
describe("🧩 Comportamiento del componente <Formulario />", () => {

    // ===========================================================
    // TEST 1: Renderizado correcto
    // ===========================================================
    it("✅ Debe renderizar los campos principales del formulario", () => {
        // 🧱 1. ARRANGE
        const mockOnLogin = vi.fn();
        renderWithRouter(<Formulario onLogin={mockOnLogin} />);

        // ⚙️ 2. ACT → no hay acciones (solo render)
        // ✅ 3. ASSERT
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
        renderWithRouter(<Formulario onLogin={mockOnLogin} />);

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
        renderWithRouter(<Formulario onLogin={mockOnLogin} />);

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
        renderWithRouter(<Formulario onLogin={mockOnLogin} />);

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
