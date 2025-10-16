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
        <MiLista titulo=" Persona1" nombre1="Paco" nombre2="Lucas" nombre3="Ainara" nombre4="Rubén"/>
        <MiLista titulo=" Persona2" nombre1="Paco" nombre2="Lucas" nombre3="Ainara" nombre4="Rubén"/>
        <MiLista titulo=" Persona3" nombre1="Paco" nombre2="Lucas" nombre3="Ainara" nombre4="Rubén"/>
       <Footer/> 
    </div>
  );
}

export default App;
