import React from "react";
import './Form.css'

class Form extends React.Component{

    envioFormulario=(event)=>{
        event.preventDefault();
        const form= event.target;
        this.props.agregarIncidencia(form.id.value, form.titulo.value, form.usuario.value, form.descripcion.value,
            form.categoria.value, form.nivel.value, form.ubicacion.value, form.fecha.value, form.estado.value
        )
    }

    render(){
        return(
            <div>
                <h2>Registrar incidencia</h2>
                <form onSubmit={this.envioFormulario}>
                    <div className="elemento-form">
                        <label>Id incidencia:</label>
                        <input type="number" name="id" placeholder="Introduce el id de la incidencia" required></input>
                    </div>

                    <div className="elemento-form">
                        <label>Titulo:</label>
                        <input type="text" name="titulo" placeholder="Introduce el titulo" required></input>
                    </div>

                    <div className="elemento-form">
                        <label>Usuario:</label>
                        <input type="text" name="usuario" placeholder="Introduce el usuario" required></input>
                    </div>

                    <div className="elemento-form">
                        <label>Descripcion:</label>
                        <input type="text" name="descripcion" placeholder="Introduce la descripcion" required></input>
                    </div>

                    <div className="elemento-form">
                        <label>Categoria:</label>
                        <select name="categoria" required>
                            <option value="">Seleccionar...</option>
                            <option>Hardware</option>
                            <option>Software</option>
                            <option>Red y conectividad</option>
                            <option>Usuarios y accesos</option>
                            <option>Infraestructuras</option>
                        </select>
                    </div>

                    <div className="elemento-form">
                        <label>Nivel de Urgencia:</label>
                        <select name="nivel" required>
                            <option value="">Seleccionar...</option>
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                        </select>
                    </div>
                    
                    <div className="elemento-form">
                        <label>Estado:</label>
                        <select name="estado" required>
                            <option>Abierta</option>
                            <option>En curso</option>
                            <option>Resuelta</option>
                            <option>Cerrada</option>
                        </select>
                    </div>
                    
                    <div className="elemento-form">
                        <label>fecha registro:</label>
                        <input type="date" name="fecha" required></input>
                    </div>

                    <div className="elemento-form">
                        <label>Ubicacion:</label>
                        <input type="text" name="ubicacion" placeholder="Ej: B205" required></input>
                    </div>

                    <button type="submit" className="elemento-form-button">Registrar</button>
                </form>
            </div>
        )
    }
}
export default Form;