import React from "react";
import { Blog } from "../../../../Context/Context";
import { getDocs, query, where, collection } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebase"
const obtenerClubes = async () => {
  const id = auth.currentUser.uid
  const clubesSnapshot = await getDocs(
    query(collection(db, "club"), where("miembros", "array-contains", id))
  );
  console.log(clubesSnapshot)
  const clubes = clubesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  console.log(id)
  return clubes;
};
const obtenerVideojuegosFavoritos = async () => {
  const id = auth.currentUser.uid;
  const videojuegosSnapshot = await getDocs(
    query(collection(db, "videojuego"), where("favs", "array-contains", id))
  );
  const videojuegos = videojuegosSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return videojuegos;
};

const ProfileHome = () => {
  const [clubes, setClubes] = React.useState([]);
  const [videojuegos, setVideojuegos] = React.useState([]);

  React.useEffect(() => {
    obtenerClubes().then((clubes) => {
      setClubes(clubes);
    });
    obtenerVideojuegosFavoritos().then((videojuegos) => {
      setVideojuegos(videojuegos);
    });
  }, []);
  // ...
return (
  <section className="size flex gap-[5rem] relative">
        <p>Clubes Suscritos</p>
    {clubes.map((club) => (
      <div key={club.id}>
        <h2 className="text-xl font-bold mb-[1rem]">{club.nombre}</h2>
      </div>
    ))}
    <p>Juegos Favoritos</p>
    {videojuegos.map((videojuego) => (
      <div key={videojuego.id}>
        <h2 className="text-xl font-bold mb-[1rem]">{videojuego.titulo}</h2>
      </div>
    ))}
  </section>
);
    }
export default ProfileHome;