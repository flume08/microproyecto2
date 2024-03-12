import React, { useEffect,useState } from 'react';
import { collection, onSnapshot, query, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase"; // Importa la instancia de Firestore

const BuscadorVideojuegos = () => {

    const[juegos,setJuegos]=useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [juegoEncontrado, setJuegoEncontrado] = useState(null);
    useEffect(() => {

        const obtenerJuegos = async () => {
            const refJuegos = query(collection(db, 'videojuego'));
            const snap = await getDocs(refJuegos);
            const juegos = [];
            snap.forEach((doc) => {
              juegos.push({
                id: doc.id, // Add this line to store the document ID
                ...doc.data(),
              });
            });
            setJuegos(juegos);
          };


      obtenerJuegos();
    }, []);
    const fav = async (game) => {
        console.log(game)
        try {
          await updateDoc(doc(db, "videojuego", game.id), {
            favs: arrayUnion(auth.currentUser.uid),
          });
          alert("Has agregado el juego como tu favorito " + game.nombre);
        } catch (error) {
          console.error("Error al agregar el juego:", error);
          alert("Error al agregar el juego " + game.nombre)
        }
      };
    const buscarJuego = () => {
        const juegoEncontrado = juegos.find(
          (juego) => juego.titulo.toLowerCase() === busqueda.toLowerCase()
        );
        setJuegoEncontrado(juegoEncontrado);
        console.log(juegoEncontrado)
      };

      return (
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-semibold mb-4">Buscador de Juegos</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Título del Juego:
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </label>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            onClick={buscarJuego}
          >
            Buscar
          </button>

          {juegoEncontrado ? (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Resultado de la búsqueda:</h3>
              <p className="mb-2"><span className="font-bold">Título:</span> {juegoEncontrado.titulo}</p>
              <p className="mb-2"><span className="font-bold">Género:</span> {juegoEncontrado.genero}</p>
              <p><span className="font-bold">Descripción:</span> {juegoEncontrado.descripcion}</p>
              <button type="button"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue" onClick={() => fav(juegoEncontrado)}>Agregar favorito</button>
            </div>
          ) : (
            <p className="mt-4 text-red-500">No se encontró ningún juego con ese título.</p>
          )}
        </div>
      );
    };



export default BuscadorVideojuegos;