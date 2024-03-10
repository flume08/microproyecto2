import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Posts from "../Common/Posts/Posts";
import Follow from "./UserToFollow/Follow";
import { auth, db } from "../../firebase/firebase";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";

const Home = () => {
  const [clubes, setClubes] = useState([]);
  const navigate = useNavigate();


  function navegarAlClub(club){
    if(club.ID) {
      navigate('/clubes/' + club.ID);
    }
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
    </section>
  );
};
// https://nerdcave.com/tailwind-cheat-sheet
export default Home;
