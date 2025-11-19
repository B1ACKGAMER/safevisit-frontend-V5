import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="container fade-in">
            <h1>Bienvenido(a)</h1>
            <p>
                Antes de ingresar a la habitación, revisa las medidas de seguridad
                necesarias.
            </p>
            <button onClick={() => navigate("/aislamiento")} className="btn">
                Iniciar
            </button>
        </div>
    );
}
