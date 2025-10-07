// src/testing/Footer.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Comportamiento del Footer", () => {
    it("Debería renderizarse correctamente", () => {
        render(<Footer />);
        expect(
            screen.getByText("© 2025 Cuidado Seguro - Todos los derechos reservados.")
        ).toBeInTheDocument();
    });

    it("Ejecuta alerta al hacer clic en el texto", () => {
        const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => { });
        render(<Footer />);

        fireEvent.click(
            screen.getByText("© 2025 Cuidado Seguro - Todos los derechos reservados.")
        );

        expect(alertSpy).toHaveBeenCalledTimes(1);
        alertSpy.mockRestore();
    });
});
