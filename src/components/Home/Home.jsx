import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


import { auth, db } from "../../firebase/firebase";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";

const Home = () => {
  const [clubes, setClubes] = useState([]);
  const[juegos,setJuegos]=useState([]);
  const navigate = useNavigate();


  function navegarAlClub(club){
    console.log(club)
      navigate('/clubes/' + club.nombre);
    
  }

  function navegarAlbuscador(){

      navigate('/buscador');
    
  }

  useEffect(() => {
    const obtenerClubes = async () => {
       const refClubs = query(collection(db, 'club'));
       const snap = await getDocs(refClubs);
       const clubes =[];
       snap.forEach((doc) => {
        clubes.push(doc.data());
       })
       setClubes(clubes);
    }
    const obtenerJuegos = async () => {
      const refJuegos = query(collection(db, 'videojuego'));
      const snap = await getDocs(refJuegos);
      const juegos =[];
      snap.forEach((doc) => {
       juegos.push(doc.data());
      })
      setJuegos(juegos);
   }
    
    obtenerClubes();
    obtenerJuegos();
  }, []);

  return (
    <section className="size flex gap-[5rem] relative">
      <div className="grid md:grid-cols-5 sm:grid-cols-1 gap-4">
        { clubes && clubes?.map(club => ( // Filtrar
          <div className="rounded-lg dark:bg-indigo-600 bg-indigo-600 p-4 shadow-lg border-gray-200" onClick={() => navegarAlClub(club)}>
            <span className="text-white text-center">{ club.nombre } </span>
          </div>
        ))
      }
      </div>
      <button
  type="button"
  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm md:text-base px-4 md:px-6 py-2 md:py-2.5 text-center md:me-2 md:mb-2"
  onClick={() => navegarAlbuscador()}
>
  Buscar juego
</button>
    </section>

  );
};
// https://nerdcave.com/tailwind-cheat-sheet
export default Home;
