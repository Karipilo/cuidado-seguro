//importar el componente a testear
import { describe, it } from "vitest";
import Footer from "../components/Footer";
//obtener las herramientas necesarias. Firevent es para simular eventos como click, submit, etc.
import { render, screen, fireEvent } from "@testing-library/react";

describe("Comportamiento del Footer", () => {
    //que se muestre
    it("Debería renderizarse correctamente", () => {
        render(<Footer />);
        //esperar que desde la pantalla (screen) se vea el texto "© 2024 Cuidado Seguro - Todos los derechos reservados."
        expect(screen.getByAltText("© 2024 Cuidado Seguro - Todos los derechos reservados.")).roBeInTheDocument()
    })
    it("Ejecuta Alerta", () => {
        //un espia lo más simple posible
        const alert = vi.fn()
    })
})