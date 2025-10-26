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
    // renderiza el componente en el entorno de pruebas.
    render(<FormularioPaciente />);
    // verifica que el campo "Nombre" esté presente.
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    // Verifica que el campo "RUT" esté presente.
    expect(screen.getByLabelText(/RUT/i)).toBeInTheDocument();
    // Verifica que el campo "Edad" esté presente.
    expect(screen.getByLabelText(/Edad/i)).toBeInTheDocument();
    // verifica que el campo "Diagnóstico" esté presente.
    expect(screen.getByLabelText(/Diagnóstico/i)).toBeInTheDocument();
    // verifica que el botón "Registrar" esté presente.
    expect(screen.getByRole("button", { name: /Registrar/i })).toBeInTheDocument();
  });

//==================================================================================  
  // Segundo test: Verifica que se muestre un error si el formulario se envía vacío.
//==================================================================================

  it("Debe mostrar error si se envía el formulario vacío", () => {
    // Renderiza el componente.
    render(<FormularioPaciente />);
    // Simula un clic en el botón "Registrar" sin llenar los campos.
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    // Verifica que se muestre un mensaje de error por campos vacíoc.
    expect(screen.getByText(/Todos los campos son obligatorios/i)).toBeInTheDocument();
  });

//================================================================================================
  // Tercer test: verifica que se llame a la función onSubmit si los datos ingresados son válidos.
//=================================================================================================
  
  it("Debe llamar a la función onSubmit si los datos son válidos", () => {
    // Crea una función simulada (mock) para verificar si se ejecuta.
    const mockOnSubmit = vi.fn();

    // Renderiza el componente y le pasa la función mock como prop.
    render(<FormularioPaciente onSubmit={mockOnSubmit} />);

    // Simula el ingreso de un nombre válido.
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan Pérez" },
    });
    // Simula el ingreso de un RUT válido.
    fireEvent.change(screen.getByLabelText(/RUT/i), {
      target: { value: "12.345.678-9" },
    });
    // Simula el ingreso de una edad válida.
    fireEvent.change(screen.getByLabelText(/Edad/i), {
      target: { value: "84" },
    });
    // Simula el ingreso de un diagnóstico válido.
    fireEvent.change(screen.getByLabelText(/Diagnóstico/i), {
      target: { value: "Alzheimer" },
    });

    // Simula un clic en el botón "registrar"
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    // Verifica que se haya llamado la funcón on Submit.
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});