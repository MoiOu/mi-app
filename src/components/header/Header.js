import React from "react";
import Logo from '../img/LogoIes.jpg'

class Header extends React.Component{
    render(){
        return(
            <div className="bg-dark text-center text-white p-3  ">
                <img src={Logo} alt="Descripción de la imagen" width="100px"/>
                <h3>
                    Bienvenido a la página de incidencias
                </h3>
            </div>
        );
    }
}
export default Header