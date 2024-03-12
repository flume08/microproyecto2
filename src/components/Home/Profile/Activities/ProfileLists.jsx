import React from "react";
import useSingleFetch from "../../../hooks/useSingleFetch";
import { Blog } from "../../../../Context/Context";
import Loading from "../../../Loading/Loading";
import PostsCard from "../../../Common/Posts/PostsCard";
import { BiLock } from "react-icons/bi";
import { getDocs, where, query } from "firebase/firestore";

const ProfileLists = ({ getUserData }) => {
  const { currentUser } = Blog();
  const { data, loading } = useSingleFetch(
    "users",
    currentUser?.uid,
    "savePost"
  );

  const obtenerClubes = async () => {
    const clubesRef = query(
      collection(db, "clubes"),
      where("miembros", "array-contains", currentUser.uid)
    );
    const clubesSnapshot = await getDocs(clubesRef);
    const clubes = clubesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return clubes;
  };

  const mostrarClubes = () => {
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
            <ul className="list-disc list-inside">
              {club.miembros.map((miembro) => (
                <li key={miembro}>{miembro}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    );
  };

  return (
    <div>
      {currentUser && currentUser?.uid === getUserData?.userId ? (
        <div className="flex flex-col gap-[2rem] mb-[2rem]">
          {data && data.length === 0 && (
            <p className="text-gray-500">
              <span className="capitalize mr-1">{getUserData?.username}</span>{" "}
              Has no merberships
            </p>
          )}
          {loading ? (
            <Loading />
          ) : (
            data && data?.map((post, i) => <PostsCard post={post} key={i} />)
          )}
          {mostrarClubes()}
        </div>
      ) : (
        <PrivateLists username={getUserData?.username} />
      )}
    </div>
  );
};

export default ProfileLists;

const PrivateLists = ({ username }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[3rem] text-center">
      <p>
        <span className="capitalize">{username} saved posts are private</span>
      </p>
      <span className="text-[10rem] text-gray-500">
        <BiLock />
      </span>
    </div>
  );
};