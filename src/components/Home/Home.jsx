import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


import { auth, db } from "../../firebase/firebase";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";

const Home = () => {
  const [clubes, setClubes] = useState([]);
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
    obtenerClubes();
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
      <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=> navegarAlbuscador}>Blue</button>
    </section>

  );
};
// https://nerdcave.com/tailwind-cheat-sheet
export default Home;
