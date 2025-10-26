// src/testing/FormularioPaciente.test.jsx

// Importa funciones necesarias para pruebas desde testing Library.
import { render, screen, fireEvent } from "@testing-library/react";

// Importa el componente que se va a testear.
import FormularioPaciente from "../components/FormularioPaciente";

// Importa herramientas de Vitest para describir y ejecutar tests.
import { describe, it, expect, vi } from "vitest";

// Inicia el bloque de pruebas para el componente FormularioPaciente.
describe("FormularioPaciente.jsx", () => {

  //=============================================================================
  // Primer test: Verifica que todos los campos del formulario estén presentes.
  //=============================================================================
  it("Debe renderizar los campos del formulario", () => {
    // -------------------- Arrange --------------------
    // Renderiza el componente en el entorno de pruebas.
    render(<FormularioPaciente />);

    // -------------------- Assert --------------------
    // Verifica que los campos estén presentes.
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/RUT/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Diagnóstico/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Registrar/i })).toBeInTheDocument();
  });

  //==================================================================================  
  // Segundo test: Verifica que se muestre un error si el formulario se envía vacío.
  //==================================================================================
  it("Debe mostrar error si se envía el formulario vacío", () => {
    // -------------------- Arrange --------------------
    // Renderiza el componente.
    render(<FormularioPaciente />);

    // -------------------- Act --------------------
    // Simula un clic en el botón "Registrar" sin llenar los campos.
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    // -------------------- Assert --------------------
    // Verifica que se muestre un mensaje de error por campos vacíos.
    expect(screen.getByText(/Todos los campos son obligatorios/i)).toBeInTheDocument();
  });

  //================================================================================================
  // Tercer test: Verifica que se llame a la función onSubmit si los datos ingresados son válidos.
  //================================================================================================
  it("Debe llamar a la función onSubmit si los datos son válidos", () => {
    // -------------------- Arrange --------------------
    // Crea una función simulada (mock) para verificar si se ejecuta.
    const mockOnSubmit = vi.fn();

    // Renderiza el componente y le pasa la función mock como prop.
    render(<FormularioPaciente onSubmit={mockOnSubmit} />);

    // -------------------- Act --------------------
    // Simula el ingreso de datos válidos en todos los campos.
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

    // Simula un clic en el botón "Registrar"
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    // -------------------- Assert --------------------
    // Verifica que se haya llamado la función onSubmit.
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});