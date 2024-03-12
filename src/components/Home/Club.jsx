import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from "../../firebase/firebase";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";

function VistaClub() {
     const [club, setClub] = useState(null);
     const [juegos, setJuegos] = useState([]);
    let { id } = useParams(); 

    useEffect(() => {
        const obtenerClub = async () => {
          const refClubs = query(collection(db, 'club'));
            onSnapshot(refClubs, (data) => {
                console.log(data)
                setClub(data)
           })
        }
        const obtenerJuegos = () => {
        //    const refClubs = query(collection0(db, 'clubes', id));
        //    onSnapshot(refClubs, (data) => {
            setJuegos([
                {
                  "ID": "1",
                  "titulo": "The Witcher 3: Wild Hunt",
                  "genero": "RPG",
                  "descripcion": "Un épico juego de rol de mundo abierto con una trama envolvente y gráficos impresionantes."
                },
                {
                  "ID": "2",
                  "titulo": "Red Dead Redemption 2",
                  "genero": "Acción/Aventura",
                  "descripcion": "Un juego de vaqueros ambientado en el Salvaje Oeste con una narrativa profunda y un vasto mundo abierto."
                },
                {
                  "ID": "3",
                  "titulo": "The Legend of Zelda: Breath of the Wild",
                  "genero": "Aventura",
                  "descripcion": "Una aventura épica con un vasto mundo, rompecabezas desafiantes y una historia cautivadora."
                },
                {
                  "ID": "4",
                  "titulo": "Dark Souls III",
                  "genero": "Acción/RPG",
                  "descripcion": "Un juego desafiante con combates intensos y un mundo oscuro y misterioso."
                },
                {
                  "ID": "5",
                  "titulo": "Super Mario Odyssey",
                  "genero": "Plataformas",
                  "descripcion": "Una colorida aventura de plataformas con un fontanero saltarín y mundos imaginativos."
                },
                {
                  "ID": "6",
                  "titulo": "Overwatch",
                  "genero": "FPS",
                  "descripcion": "Un juego de disparos en equipo con héroes únicos y emocionantes partidas."
                },
                {
                  "ID": "7",
                  "titulo": "Minecraft",
                  "genero": "Sandbox",
                  "descripcion": "Un mundo abierto de construcción y exploración donde puedes crear tus propias aventuras."
                },
                {
                  "ID": "8",
                  "titulo": "Fortnite",
                  "genero": "Battle Royale",
                  "descripcion": "Un juego de supervivencia en línea con construcción y combates intensos."
                },
                {
                  "ID": "9",
                  "titulo": "FIFA 22",
                  "genero": "Deportes",
                  "descripcion": "El simulador de fútbol más popular con equipos reales y modos de juego variados."
                },
                {
                  "ID": "10",
                  "titulo": "Call of Duty: Warzone",
                  "genero": "Battle Royale",
                  "descripcion": "Un juego de disparos en línea con acción frenética y mapas enormes."
                },
                {
                  "ID": "11",
                  "titulo": "Assassin's Creed Valhalla",
                  "genero": "Acción/Aventura",
                  "descripcion": "Una aventura vikinga con combates, exploración y una historia intrigante."
                },
                {
                  "ID": "12",
                  "titulo": "Cyberpunk 2077",
                  "genero": "RPG",
                  "descripcion": "Un futuro distópico lleno de tecnología, crimen y decisiones morales."
                },
                {
                  "ID": "13",
                  "titulo": "Among Us",
                  "genero": "Multijugador",
                  "descripcion": "Un juego de engaño y deducción en el espacio con amigos o desconocidos."
                },
                {
                  "ID": "14",
                  "titulo": "Animal Crossing: New Horizons",
                  "genero": "Simulación",
                  "descripcion": "Una vida tranquila en una isla paradisíaca con actividades relajantes."
                },
                {
                  "ID": "15",
                  "titulo": "League of Legends",
                  "genero": "MOBA",
                  "descripcion": "Batallas estratégicas en línea con campeones y habilidades únicas."
                },
                {
                  "ID": "16",
                  "titulo": "Genshin Impact",
                  "genero": "Acción/RPG",
                  "descripcion": "Un mundo de fantasía con personajes elementales y una jugabilidad cautivadora."
                },
                {
                  "ID": "17",
                  "titulo": "Apex Legends",
                  "genero": "Battle Royale",
                  "descripcion": "Combates en equipo en un mundo futurista con héroes y habilidades únicas."
                },
                {
                  "ID": "18",
                  "titulo": "World of Warcraft",
                  "genero": "MMORPG",
                  "descripcion": "Un vasto mundo de fantasía con razas, clases y misiones épicas."
                },
                {
                  "ID": "19",
                  "titulo": "Control",
                  "genero": "Acción/Aventura",
                  "descripcion": "Explora una agencia secreta y descubre poderes sobrenaturales en este juego intrigante."
                },
                {
                  "ID": "20",
                  "titulo": "Hades",
                  "genero": "Roguelike",
                  "descripcion": "Embárcate en un viaje al inframundo y desafía a los dioses en este juego de acción y mitología."
                }
              ])
        //    })

        }
        obtenerClub();
        obtenerJuegos();
      }, []);

      return (
        <>
            <div className='grid grid-cols-3 gap-4 min-h-full min-h-screen'>
                <div className='col-span-2'>
                    <a class="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ club?.nombre }</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">{club?.descripcion}</p>
                    </a>
                    <button type="button" class="px-6 py-3.5 text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Registrate</button>
                </div>
                <div className='col-span-1  rounded-lg'>
                    <h1 className='text-2xl font-bold tracking-tight text-gray-900"' >Juegos</h1>
                    {
                        juegos?.filter((juego) => club.videojuegos.includes(juego.ID)).map((juego) => (
                            <div className='mt-4'>
                                <a class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{juego.titulo}</h5>
                                    <p class="font-normal text-gray-700 dark:text-gray-400">{juego.descripcion}</p>
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default VistaClub;

