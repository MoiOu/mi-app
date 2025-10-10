import './App.css';
import  MiLista from '../lista/MiLista';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function App() {
  return (
    <div className="App">
        <Header/>
        <h1>Hola Mundo </h1>
        <h2>Este es mi primer composable React</h2>
        <div className="Parrafo">
          <p>Bienvenido a mi aplicación, esto fue creado con JavaScript en React</p>
        </div>
        <MiLista titulo=" Persona1" nombre1="Juan" nombre2="Pedro" nombre3="María" nombre4="Sofía"/>
        <MiLista titulo=" Persona2" nombre1="Juan" nombre2="Pedro" nombre3="María" nombre4="Sofía"/>
        <MiLista titulo=" Persona3" nombre1="Juan" nombre2="Pedro" nombre3="María" nombre4="Sofía"/>
       <Footer/> 
    </div>
  );
}

export default App;
