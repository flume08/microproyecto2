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

  const ProfileHome = () => {
    const [clubes, setClubes] = React.useState([]);
    React.useEffect(() => {
      obtenerClubes().then((clubes) => {
        setClubes(clubes);
      });
    }, []);

    return (
      <section className="size flex gap-[5rem] relative">
        {clubes.map((club) => (
          <div key={club.id}>
            <h2 className="text-xl font-bold mb-[1rem]">{club.nombre}</h2>
          </div>
        ))}
      </section>
    );
  };

export default ProfileHome;