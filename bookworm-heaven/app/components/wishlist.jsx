"use client"
import { useEffect, useState } from 'react';

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch('/api/Wishlist');
                if (!response.ok) {
                    throw new Error('Failed to fetch wishlist');
                }
                const data = await response.json();
                setWishlist(data.wishlist); // Correctly set the wishlist data
            } catch (error) {
                setError(error.message);
            }
        };

        fetchWishlist();
    }, []);

    const removeFromWishlist = async (id) => {
        try {
            const response = await fetch(`/api/Wishlist`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to remove from wishlist');
            }
            // Remove the deleted item from the state
            setWishlist((prevWishlist) => prevWishlist.filter((wishlistBook) => wishlistBook.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-between p-24 bg-gradient-to-b from-[#f5ebff] via-[#eae4ff] via-[#dddeff] via-[#ccd8ff] to-[#b9c9fb]">
            <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
            {error && <p>{error}</p>}
            <ul>
                {wishlist.map((book) => (
                    <li key={book.id} className="border-b border-gray-300 py-4">
                        <div className="flex items-center">
                            {book.image && (
                                <img src={book.image} alt={book.title} className="w-16 h-16 mr-4" />
                            )}
                            <div>
                                <h2 className="text-xl font-bold">{book.title}</h2>
                                <p className="text-gray-600">{book.author}</p>
                                <p className="text-gray-600">{book.description}</p>
                            </div>
                            {/* Button to remove the item */}
                            <button onClick={() => removeFromWishlist(book.id)} className="ml-auto">
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
