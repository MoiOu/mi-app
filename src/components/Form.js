import React from "react";
import './Form.css'
import { useState } from "react";


function Form (props){

    const envioFormulario = (event)=>{
        event.preventDefault();
        const form= event.target;
        props.agregarIncidencia( 
            form.titulo.value, 
            form.usuario.value, 
            form.descripcion.value,
            form.categoria.value,
            form.nivel.value,
            form.ubicacion.value
        )
    }

   
        return(
            <div className="card p-4 bg-dark text-white">
                <h2 className="card-tittle mb-4 text-center"> <strong>Registrar incidencia</strong></h2>
                <form onSubmit={envioFormulario}>
                    

                    <div >
                        <label className="mb-3 form-label">Titulo:</label>
                        <input className="mb-3 form-control" type="text" name="titulo"  placeholder="Introduce el titulo" required></input>
                    </div>

                    <div>
                        <label className="mb-3 form-label">Usuario:</label>
                        <input className="mb-3 form-control" type="text" name="usuario" placeholder="Introduce el usuario" required></input>
                    </div>

                    <div>
                        <label className="mb-3 form-label">Descripcion:</label>
                        <input className="mb-3 form-control" type="text" name="descripcion" placeholder="Introduce la descripcion" required></input>
                    </div>

                    <div>
                        <label className="mb-3 form-label">Categoria:</label>
                        <select className="mb-3 form-control" name="categoria" required>
                            <option value="">Seleccionar...</option>
                            <option>Hardware</option>
                            <option>Software</option>
                            <option>Red y conectividad</option>
                            <option>Usuarios y accesos</option>
                            <option>Infraestructuras</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-3 form-label">Nivel de Urgencia:</label>
                        <select className="mb-3 form-control" name="nivel" required>
                            <option value="">Seleccionar...</option>
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
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