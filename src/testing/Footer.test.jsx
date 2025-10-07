//Prueba unitaria del Footer
//importar el componente a testear
import { describe, it, vi } from "vitest";
import Footer from "../components/Footer";
//obtener las herramientas necesarias. Firevent es para simular eventos como click, submit, etc.
import { render, screen, fireEvent } from "@testing-library/react";

describe("Comportamiento del Footer", () => {
    //que se muestre
    it("Debería renderizarse correctamente", () => {
        render(<Footer />);
        //esperar que desde la pantalla (screen) se vea el texto "© 2024 Cuidado Seguro - Todos los derechos reservados."
        expect(screen.getAllByText("© 2024 Cuidado Seguro - Todos los derechos reservados.")).toBeInTheDocument()
    })
    it("Ejecuta Alerta", () => {
        //un espia lo más simple posible
        const alert = vi.spyOn(window, "alert").mockImplementation(() => { })
        render(<Footer />)

        fireEvent.click(screen.getByText("© 2024 Cuidado Seguro - Todos los derechos reservados."));


        //espero que mi espia se llame una vez
        expect(alert).toHaveBeenCalledTimes(1)
    })
})