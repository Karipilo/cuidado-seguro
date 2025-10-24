// ===============================================================
// 🧩 Archivo: DashboardTutorContent.test.jsx
// Descripción: Pruebas del componente <DashboardTutorContent />
// Corrige el mock de react-router-dom para evitar bloquear MemoryRouter.
// ===============================================================

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardTutorContent from "../components/DashboardTutorContent";
import { MemoryRouter } from "react-router-dom";

// Solo mockeamos useNavigate para no interferir con MemoryRouter
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(), // evita errores con navigate
  };
});

describe("🧩 Comportamiento del componente <DashboardTutorContent />", () => {
  beforeEach(() => {
    localStorage.setItem(
      "usuarioActivo",
      JSON.stringify({ nombre: "Carlos", tipoUsuario: "Tutor" })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  // ============================================================
  // TEST 1️⃣: Renderizado inicial
  // ============================================================
  it("Debe renderizar correctamente la información principal", () => {
    render(
      <MemoryRouter>
        <DashboardTutorContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Juan Pérez Soto", { selector: "h5" })).toBeInTheDocument();
    expect(screen.getByText("ELEAM Alerces")).toBeInTheDocument();
    expect(screen.getByText(/Revisa antecedentes/i)).toBeInTheDocument();
  });

  // ============================================================
  // TEST 2️⃣: Cambio a pestaña "Mensajes"
  // ============================================================
  it("Debe mostrar el formulario de mensajes al cambiar la pestaña", async () => {
    render(
      <MemoryRouter>
        <DashboardTutorContent />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Mensajes"));

    expect(await screen.findByLabelText(/Para/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });

  // ============================================================
  // TEST 3️⃣: Agregar nuevo mensaje
  // ============================================================
  it("Debe agregar un nuevo mensaje a la bandeja al enviarlo", async () => {
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

    expect(await screen.findByText("Solicitud de información")).toBeInTheDocument();
    expect(screen.getByText(/¿Cuándo es la próxima reunión?/i)).toBeInTheDocument();
    expect(screen.getByText(/Para: Administrativo/i)).toBeInTheDocument();
  });

  // ============================================================
  // TEST 4️: No agrega mensaje si faltan campos
  // ============================================================
  it("No debe agregar mensaje si el asunto o cuerpo están vacíos", async () => {
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

    expect(await screen.findByText("No hay mensajes aún.")).toBeInTheDocument();
  });
});