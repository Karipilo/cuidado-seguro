// src/testing/FormularioPaciente.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import FormularioPaciente from "../components/FormularioPaciente";
import { describe, it, expect, vi } from "vitest";

describe("🧪 FormularioPaciente.jsx", () => {
  it("Debe renderizar los campos del formulario", () => {
    render(<FormularioPaciente />);

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/RUT/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Diagnóstico/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Registrar/i })).toBeInTheDocument();
  });

  it("Debe mostrar error si se envía el formulario vacío", () => {
    render(<FormularioPaciente />);
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    expect(screen.getByText(/Todos los campos son obligatorios/i)).toBeInTheDocument();
  });

  it("Debe llamar a la función onSubmit si los datos son válidos", () => {
    const mockOnSubmit = vi.fn();

    render(<FormularioPaciente onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByLabelText(/RUT/i), {
      target: { value: "12.345.678-9" },
    });
    fireEvent.change(screen.getByLabelText(/Edad/i), {
      target: { value: "84" },
    });
    fireEvent.change(screen.getByLabelText(/Diagnóstico/i), {
      target: { value: "Alzheimer" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
