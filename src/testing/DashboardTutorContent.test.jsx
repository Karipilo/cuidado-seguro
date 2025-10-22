import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardTutorContent from "../components/DashboardTutorContent";
import { MemoryRouter } from "react-router-dom";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe("Comportamiento del componente <DashboardTutorContent />", () => {
    beforeEach(() => {
        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify({ nombre: "Carlos", tipoUsuario: "Tutor" })
        );
    });

    afterEach(() => {
        localStorage.clear();
    });

    it("✅ Debe renderizar correctamente la información principal", () => {
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        const nombres = screen.getAllByText("Juan Pérez Soto");
        expect(nombres.length).toBeGreaterThan(0);
        expect(screen.getByText("ELEAM Alerces")).toBeInTheDocument();
        expect(screen.getByText(/Revisa antecedentes/i)).toBeInTheDocument();
    });

    it("✅ Debe mostrar el formulario de mensajes al cambiar la pestaña", () => {
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Mensajes"));

        expect(screen.getByLabelText(/Para/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    });

    it("✅ Debe agregar un nuevo mensaje a la bandeja al enviarlo", () => {
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

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

        expect(screen.getByText("Solicitud de información")).toBeInTheDocument();
        expect(screen.getByText(/¿Cuándo es la próxima reunión?/i)).toBeInTheDocument();
        expect(screen.getByText(/Para: Administrativo/i)).toBeInTheDocument();
    });

    it("⚠️ No debe agregar mensaje si el asunto o cuerpo están vacíos", () => {
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Mensajes"));

        fireEvent.change(screen.getByLabelText(/Para/i), {
            target: { value: "Administrativo" },
        });

        fireEvent.click(screen.getByText(/Enviar/i));

        expect(screen.getByText("No hay mensajes aún.")).toBeInTheDocument();
    });
});