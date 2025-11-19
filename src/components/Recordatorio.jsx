// src/components/Recordatorio.jsx
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function Recordatorio() {
    const navigate = useNavigate();
    const location = useLocation();
    const tipo = location.state?.tipo || "Medidas de precaución";

    // Datos del evento
    const titulo = `Recordatorio: ${tipo}`;
    const descripcion = `Cumple con las medidas de ${tipo} para garantizar la bioseguridad.`;
    const fechaInicio = new Date();
    const fechaFin = new Date(fechaInicio.getTime() + 30 * 60000); // +30 minutos

    // 🗓 Formato ISO para Google Calendar
    const formatoGoogle = (date) => date.toISOString().replace(/-|:|\.\d+/g, "");

    // 🔗 Crear evento en Google Calendar
    const crearGoogleCalendar = () => {
        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            titulo
        )}&details=${encodeURIComponent(
            descripcion
        )}&dates=${formatoGoogle(fechaInicio)}/${formatoGoogle(fechaFin)}&sf=true&output=xml`;
        window.open(url, "_blank");
    };

    // 🔗 Crear evento en Microsoft Calendar (Outlook)
    const crearMicrosoftCalendar = () => {
        const formatoOutlook = (date) => {
            // Outlook requiere formato: YYYY-MM-DDTHH:MM
            return date.toISOString().slice(0, 16);
        };

        const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
            titulo
        )}&body=${encodeURIComponent(
            descripcion
        )}&startdt=${formatoOutlook(fechaInicio)}&enddt=${formatoOutlook(
            fechaFin
        )}&allday=false&path=/calendar/action/compose`;

        window.open(url, "_blank");
    };


    return (
        <div className="container fade-in">
            <h2>📅 Agregar recordatorio</h2>
            <p>¿Deseas agregar un recordatorio para cumplir estas medidas?</p>

            <div className="botones-recordatorio">
                <button onClick={crearGoogleCalendar}>Google Calendar</button>
                <button onClick={crearMicrosoftCalendar}>Microsoft Calendar</button>
            </div>

            <button
                onClick={() => navigate("/Precauciones")}
                className="btn-volver"
                style={{ marginTop: "20px" }}
            >
                Volver
            </button>

            <button
                onClick={() => navigate("/final")}
                className="btn-siguiente"
                style={{ marginTop: "20px", marginLeft: "10px" }}
            >
                Siguiente
            </button>

        </div>
    );
}
