import React from "react";

class MiLista extends React.Component {
    render(){
    return(
        <div ClassName='lista'>
            <h4>Mi lista de clientes{this.props.titulo}</h4>
            <ul>
                <li>{this.props.nombre1}</li>
                <li>{this.props.nombre2}</li>
                <li>{this.props.nombre3}</li>
                <li>{this.props.nombre4}</li>
            </ul>
        </div>
    )
}
}
export default MiLista