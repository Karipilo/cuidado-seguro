// ===============================================================
// 🧩 Archivo: DashboardTutorContent.test.jsx
// Descripción: Pruebas del componente <DashboardTutorContent />
// Incluye mocks de Router y localStorage para evitar bloqueos.
// ===============================================================

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardTutorContent from "../components/DashboardTutorContent";
import { MemoryRouter } from "react-router-dom";

// ===============================================================
// 🔹 MOCK DE REACT-ROUTER-DOM
// Evita errores con useNavigate() y rutas inexistentes
// ===============================================================
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(() => { }), // ✅ Evita bloqueo por navigate()
        useLocation: () => ({ pathname: "/dashboard-tutor" }),
    };
});

// ===============================================================
// 🔹 GRUPO DE PRUEBAS
// ===============================================================
describe("🧩 Comportamiento del componente <DashboardTutorContent />", () => {
    // -------------------------------------------------------------
    // Antes de cada test → define usuario activo
    // -------------------------------------------------------------
    beforeEach(() => {
        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify({ nombre: "Carlos", tipoUsuario: "Tutor" })
        );
    });

    // -------------------------------------------------------------
    // Después de cada test → limpia el localStorage
    // -------------------------------------------------------------
    afterEach(() => {
        localStorage.clear();
    });

    // ============================================================
    // TEST 1️⃣: Renderizado inicial
    // ============================================================
    it("✅ Debe renderizar correctamente la información principal", () => {
        // 🧱 ARRANGE
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        // ⚙️ ACT → no se necesita acción (solo render)
        // ✅ ASSERT
        // En algunos casos el nombre puede aparecer duplicado, por eso usamos selector
        expect(screen.getByText("Juan Pérez Soto", { selector: "h5" })).toBeInTheDocument();
        expect(screen.getByText("ELEAM Alerces")).toBeInTheDocument();
        expect(screen.getByText(/Revisa antecedentes/i)).toBeInTheDocument();
    });

    // ============================================================
    // TEST 2️⃣: Cambio a pestaña "Mensajes"
    // ============================================================
    it("✅ Debe mostrar el formulario de mensajes al cambiar la pestaña", () => {
        // 🧱 ARRANGE
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        // ⚙️ ACT
        fireEvent.click(screen.getByText("Mensajes"));

        // ✅ ASSERT
        expect(screen.getByLabelText(/Para/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    });

    // ============================================================
    // TEST 3️⃣: Agregar nuevo mensaje
    // ============================================================
    it("✅ Debe agregar un nuevo mensaje a la bandeja al enviarlo", () => {
        // 🧱 ARRANGE
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        // ⚙️ ACT
        fireEvent.click(screen.getByText("Mensajes"));

        fireEvent.change(screen.getByLabelText(/Para/i), {
            target: { value: "Administrativo" },
        });
        fireEvent.change(screen.getByLabelText(/Asunto/i), {
            target: { value: "Solicitud de información" },
        });
        fireEvent.change(screen.getByLabelText(/Mensaje/i), {
            target: { value: "¿Cuándo es la próxima reunión?" },
        });

        fireEvent.click(screen.getByText(/Enviar/i));

        // ✅ ASSERT
        expect(screen.getByText("Solicitud de información")).toBeInTheDocument();
        expect(screen.getByText(/¿Cuándo es la próxima reunión?/i)).toBeInTheDocument();
        expect(screen.getByText(/Para: Administrativo/i)).toBeInTheDocument();
    });

    // ============================================================
    // TEST 4️⃣: No agrega mensaje si faltan campos
    // ============================================================
    it("⚠️ No debe agregar mensaje si el asunto o cuerpo están vacíos", () => {
        // 🧱 ARRANGE
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        // ⚙️ ACT
        fireEvent.click(screen.getByText("Mensajes"));
        fireEvent.change(screen.getByLabelText(/Para/i), {
            target: { value: "Administrativo" },
        });
        fireEvent.click(screen.getByText(/Enviar/i));

        // ✅ ASSERT
        expect(screen.getByText("No hay mensajes aún.")).toBeInTheDocument();
    });
});