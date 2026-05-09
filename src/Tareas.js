function Tareas (props){
    return(
        <div>
            <h1>Lista de Tareas</h1>
            
                {props.tareas ? 
                <div>
                    <ul>
                    {props.tareas.map((tarea) => (
                    <li key ={tarea}>{tarea}</li>))} 
                    </ul>               
                </div> : <div><p>No hay tareas</p></div>})

        </div>
    );
} export default Tareas;

