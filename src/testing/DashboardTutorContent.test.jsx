import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardTutorContent from "../components/DashboardTutorContent";
import { BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mock de localStorage y navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe(" DashboardTutorContent.jsx", () => {
  // Simulamos localStorage antes de cada test
  beforeEach(() => {
    localStorage.setItem(
      "usuarioActivo",
      JSON.stringify({ nombre: "Carlos Bernal", tipoUsuario: "Tutor" })
    );
  });

  afterEach(() => {
    localStorage.clear();
    mockNavigate.mockReset();
  });

  it(" Renderiza correctamente el nombre del paciente", () => {
    // Arrange
    render(
      <BrowserRouter>
        <DashboardTutorContent />
      </BrowserRouter>
    );

    // Act
    const nombrePaciente = screen.getByText(/Juan Pérez Soto/i);

    // Assert
    expect(nombrePaciente).toBeInTheDocument();
  });

  it(" Cambia entre las pestañas Detalle y Mensajes", () => {
    // Arrange
    render(
      <BrowserRouter>
        <DashboardTutorContent />
      </BrowserRouter>
    );

    // Act
    const btnMensajes = screen.getByRole("button", { name: /Mensajes/i });
    fireEvent.click(btnMensajes);

    // Assert
    expect(screen.getByText(/Enviar mensaje/i)).toBeInTheDocument();

    // Act - volver a detalle
    const btnDetalle = screen.getByRole("button", {
      name: /Detalle del Paciente/i,
    });
    fireEvent.click(btnDetalle);

    // Assert
    expect(screen.getByText(/Parkinson/i)).toBeInTheDocument();
  });

  it(' Muestra mensaje "No hay mensajes aún" cuando no hay mensajes', () => {
    // Arrange
    render(
      <BrowserRouter>
        <DashboardTutorContent />
      </BrowserRouter>
    );

    // Act
    const btnMensajes = screen.getByRole("button", { name: /Mensajes/i });
    fireEvent.click(btnMensajes);

    // Assert
    expect(screen.getByText(/No hay mensajes aún/i)).toBeInTheDocument();
  });

  it(" Envía un mensaje y lo muestra en la bandeja", () => {
    // Arrange
    render(
      <BrowserRouter>
        <DashboardTutorContent />
      </BrowserRouter>
    );

    // Act
    fireEvent.click(screen.getByText(/Mensajes/i));

    fireEvent.change(screen.getByLabelText(/Para/i), {
      target: { value: "Administrativo" },
    });

    fireEvent.change(screen.getByLabelText(/Asunto/i), {
      target: { value: "Consulta urgente" },
    });

    fireEvent.change(screen.getByLabelText(/Mensaje/i), {
      target: { value: "¿Cómo está mi familiar?" },
    });

    fireEvent.click(screen.getByRole("button", { name: /^Enviar$/i }));

    // Assert
    expect(screen.getByText(/Consulta urgente/i)).toBeInTheDocument();
    expect(screen.getByText(/¿Cómo está mi familiar?/i)).toBeInTheDocument();
    expect(screen.getByText(/Para: Administrativo/i)).toBeInTheDocument();
  });
  // * Test corregido
  it(" Redirige al login si el usuario no es tutor", () => {
    // Arrange
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production"; // Forzar modo producción

    localStorage.clear();
    localStorage.setItem(
      "usuarioActivo",
      JSON.stringify({ nombre: "Otro usuario", tipoUsuario: "Profesional" })
    );

    render(
      <BrowserRouter>
        <DashboardTutorContent />
      </BrowserRouter>
    );

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("/login");

    // Limpiar el mode de entorno de DEV
    process.env.NODE_ENV = originalEnv;
  });

  it(" Usa usuario simulado en entorno de test", () => {
    // Arrange
    process.env.NODE_ENV = "test";
    localStorage.removeItem("usuarioActivo");

    render(
      <BrowserRouter>
        <DashboardTutorContent />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText(/TestUser/i)).toBeInTheDocument();
  });
});
