import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../firebase/firebase";
import { collection, onSnapshot, query, getDocs, setDoc, doc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";

const Home = () => {
  const [clubes, setClubes] = useState([]);
  const[juegos,setJuegos]=useState([]);


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
  const suscribeClubs = async (club) => {
    try {
      await updateDoc(doc(db, "club", club.id), {
        miembros: arrayUnion(auth.currentUser.uid),
      });
      alert("Te has suscrito al club " + club.nombre);
    } catch (error) {
      console.error("Error al suscribirse al club:", error);
      alert("Error al suscribirse al club " + club.nombre)
    }
  };
  const desuscribirseClubs = async (club) => {
    try {
      await updateDoc(doc(db, "club", club.id), {
        miembros: arrayRemove(auth.currentUser.uid),
      });
      alert("Te has desuscrito del club " + club.nombre);
    } catch (error) {
      console.error("Error al desuscribirse del club:", error);
      alert("Error al desuscribirse del club " + club.nombre)
    }
  };

  return (
    <section className="size flex gap-[5rem] relative">
      <div className="grid md:grid-cols-5 sm:grid-cols-1 gap-4">
        { clubes && clubes?.map(club => (
                <div className='col-span-2'>
                    <a class="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ club?.nombre }</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">{club?.descripcion}</p>
                    </a>
                    <button type="button" class="px-6 py-3.5 text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => suscribeClubs(club)}>Registrate</button>
                    <button type="button" class="px-6 py-3.5 text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => desuscribirseClubs(club)}>Desuscribirse</button>
                </div>
        ))
      }
      </div>
      <button
  type="button"
  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm md:text-base px-4 md:px-6 py-2 md:py-2.5 text-center md:me-2 md:mb-2"
>
  Buscar juego
</button>
    </section>

  );
};
// https://nerdcave.com/tailwind-cheat-sheet
export default Home;
