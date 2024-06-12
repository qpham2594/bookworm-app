"use client"
import { useEffect, useState } from 'react';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('/api/Favorites');
                if (!response.ok) {
                    throw new Error('Failed to fetch favorite books');
                }
                const data = await response.json();
                setFavorites(data.favorites);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFavorites();
    }, []);

    const removeFromFavorites = async (id) => {
        try {
            const response = await fetch(`/api/Favorites`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to remove favorite');
            }
            // Remove the deleted favorite from the state
            setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='m-10'>
            <h1 className="text-2xl font-bold mb-4">My Favorite Books</h1>
            {error && <p>{error}</p>}
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.id} className="border-b border-gray-300 py-4">
                        <div className="flex items-center">
                            {favorite.image && (
                                <img src={favorite.image} alt={favorite.title} className="w-16 h-16 mr-4" />
                            )}
                            <div>
                                <h2 className="text-xl font-bold">{favorite.title}</h2>
                                <p className="text-gray-600">{favorite.author}</p>
                                <p className="text-gray-600">{favorite.description}</p>
                            </div>
                            {/* Button to remove the favorite */}
                            <button onClick={() => removeFromFavorites(favorite.id)} className="ml-auto mr-8">
                                Remove
                            </button>
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
