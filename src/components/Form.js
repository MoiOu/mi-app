import React from "react";
import './Form.css'



function Form(props) {

    const envioFormulario = (event) => {
        event.preventDefault();
        const form = event.target;

        props.agregarIncidencia(
            form.titulo.value,
            form.usuario.value,
            form.descripcion.value,
            form.categoria.value,
            form.nivelUrgencia.value,
            form.ubicacion.value
        );

        form.reset();
    };

    return (
        <div className="card p-4 bg-dark text-white">
            <h2 className="card-title mb-4 text-center">
                Registrar incidencia
            </h2>

            <form onSubmit={envioFormulario}>

                {/* TÍTULO */}
                <div className="mb-3">
                    <label className="form-label">Título incidencia</label>
                    <input
                        type="text"
                        name="titulo"
                        className="form-control"
                        placeholder="Introduce el título"
                        required
                    />
                </div>

                {/* USUARIO */}
                <div className="mb-3">
                    <label className="form-label">Usuario (email)</label>
                    <input
                        type="email"
                        name="usuario"
                        className="form-control"
                        placeholder="usuario@educastur.org"
                        required
                    />
                </div>

                {/* DESCRIPCIÓN */}
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        name="descripcion"
                        className="form-control"
                        rows="3"
                        required
                    ></textarea>
                </div>

                {/* CATEGORÍA */}
                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select
                        name="categoria"
                        className="form-control"
                        required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Red y conectividad">Red y conectividad</option>
                        <option value="Usuarios y accesos">Usuarios y accesos</option>
                        <option value="Infraestructura">Infraestructura</option>
                    </select>
                </div>

                {/* NIVEL DE URGENCIA */}
                <div className="mb-3">
                    <label className="form-label">Nivel de urgencia</label>
                    <select
                        name="nivelUrgencia"
                        className="form-control"
                        required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>
                    
                    

                    <div>
                        <label className="mb-3 form-label">Ubicacion:</label>
                        <input className="mb-3 form-control" type="text" name="ubicacion" placeholder="Ej: B205" required></input>
                    </div>

                    <button type="submit" className=" btn btn-success mx-auto d-grid"
                    ><strong>Registrar</strong></button>
                </form>
            </div>
        )
    
}
export default Form;