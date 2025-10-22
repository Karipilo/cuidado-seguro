// src/testing/DashboardTutorContent.test.jsx

// Formato AAA (3 Pasos)
// Arrange - Act -Assert

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardTutorContent from "../components/DashboardTutorContent";
import { MemoryRouter, useNavigate } from "react-router-dom"; //  Para envolver el componente

// Mock para el useNavigate
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe("Comportamiento del componente  <DashboardTutorContent />", () => {
    //Configura un usuario tipo Tutor antes de cada Test
    beforeEach(() => {
        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify({ nombre: "Carlos", tipoUsuario: "Tutor" })
        );
    });

    //Limpia el localStorage después de cada test
    afterEach(() => {
        localStorage.clear();
    });

    it(" Debe renderizar correctamente la información principal", () => {
        // 1. ARRANGE
        // ( Ya está realizado arriba con el localStorage)

        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        // DEBUG: Muestra lo que se renderizó
        screen.debug(); // Esto imprime el DOM actual en la consola

        // 2. ACT
        // (Solo renderizado)

        // 3. ASSERT
        expect(screen.getByText("Juan Pérez Soto")).toBeInTheDocument();
        expect(screen.getByText("ELEAM Alerces")).toBeInTheDocument();
        expect(screen.getByText(/Revisa antecedentes/i)).toBeInTheDocument();
    });

    it(" Debe mostrar el formulario de mensajes al cambiar la pestaña", () => {
        // 1. ARRANGE
        render(
            <MemoryRouter>
                <DashboardTutorContent />
            </MemoryRouter>
        );

        // 2. ACT
         const tabMensajes = screen.getByText("Mensajes");
         fireEvent.click(tabMensajes);

        // 3. ASSERT
        expect(screen.getByLabelText(/Para/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    });
});