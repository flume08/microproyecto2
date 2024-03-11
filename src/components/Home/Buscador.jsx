import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase/firestore';
import { auth, db } from "../../firebase/firebase";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";
import { useParams } from 'react-router-dom';

const VideoGameSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = firestore.collection('videoGames');
        const snapshot = await gamesCollection.get();

        const gameData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGames(gameData);
      } catch (error) {
        console.error('Error fetching games:', error.message);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    // Filter games based on the search term
    const filteredResults = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(filteredResults);
  }, [searchTerm, games]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Video Game Search</h2>
      <input
        type="text"
        placeholder="Search for a game..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredGames.map((game) => (
          <li key={game.id}>
            <strong>{game.title}</strong> - Genre: {game.genre}, Description: {game.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoGameSearch;