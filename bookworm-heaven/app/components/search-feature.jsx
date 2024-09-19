import { useState } from 'react';
import { bookReview } from '../api/route';

export default function SearchComponent() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await bookReview(query);
            if (!response.ok) {
                throw new Error('Failed to fetch book reviews');
            }
            const data = await response.json();
            setSearchResults(data.items);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    const toggleFavorite = async (book) => {
        try {
            const method = book.isFavorite ? 'DELETE' : 'POST';
            const response = await fetch('/api/Favorites', {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });

            if (!response.ok) {
                throw new Error('Failed to update favorites');
            }

            // Update local state to reflect favorite status
            setSearchResults((prevResults) =>
                prevResults.map((result) =>
                    result.id === book.id ? { ...result, isFavorite: !result.isFavorite } : result
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleWishlist = async (book) => {
        try {
            const method = book.isWishlist ? 'DELETE' : 'POST';
            const response = await fetch('/api/Wishlist', {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });

            if (!response.ok) {
                throw new Error('Failed to update wishlist');
            }

            // Update local state to reflect favorite status
            setSearchResults((prevResults) =>
                prevResults.map((result) =>
                    result.id === book.id ? { ...result, isWishlist: !result.isWishlist } : result
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    return (
        <div>
            <div className='mb-8'>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center">
                <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter book title"
                className="border border-black focus:border-blue transition duration-200 p-2 rounded w-full sm:w-auto"
                />
                <button
                type="submit"
                className="ml-0 mt-4 sm:ml-8 sm:mt-0 bg-gray-300 hover:bg-amber-800 hover:text-white px-4 py-2 rounded sm:p-4"
                >
                Search
                </button>
            </form>
            </div>


            {error && <p>{error}</p>}
            <ul className='flex flex-col items-center mx-auto ml-8'>
                {searchResults.map((result, index) => {
                    const volumeInfo = result.volumeInfo;
                    const book = {
                        id: result.id, // Use the book ID from the Google Books API as the unique identifier
                        title: volumeInfo.title,
                        author: volumeInfo.authors?.join(', ') || 'Unknown author',
                        description: volumeInfo.description || 'No description available',
                        image: volumeInfo.imageLinks?.thumbnail || '',
                        isFavorite: result.isFavorite || false,
                        isWishlist: result.isWishlist || false
                    };
                    return (
                        <li key={index} className='mr-16 mb-6 flex flex-col items-center mx-auto'>
                            <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6 ">
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl tracking-tight font-bold text-primary-800">{volumeInfo.title}</h2>
                                </div>

                                <div className="flex flex-col md:flex-row">
                                    <div className="mr-0 md:mr-8 mb-6 md:mb-6 flex flex-col items-center">
                                        {volumeInfo.imageLinks?.thumbnail && (
                                            <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />
                                        )}
                                        <a href={volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                                                    Read more
                                        </a>
                                    </div>

                                    <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
                                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                                            <div className="h-full py-4 px-6 border border-amber-900 hover:shadow-md hover:bg-lightyellow rounded-lg sm:rounded-tl-xl sm:rounded-none">
                                                <h3 className="text-2xl font-bold text-md mb-6">Author: </h3>
                                                <p className="text-sm">{volumeInfo.authors?.join(', ')}</p>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                                            <div className="h-full py-4 px-6 border border-amber-900 hover:shadow-md hover:bg-lightyellow rounded-lg sm:rounded-tr-xl sm:rounded-none ">
                                                <h3 className="text-2xl font-bold text-md mb-6">Description: </h3>
                                                <p className="text-sm"> {truncateText(volumeInfo.description || '', 100)}</p>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                                            <div className="h-full py-4 px-6 border border-amber-900 hover:shadow-md hover:bg-lightyellow rounded-lg sm:rounded-bl-xl sm:rounded-none">
                                                <h3 className="text-2xl font-bold text-md mb-6"> Add to Favorites: </h3>
                                                <button onClick={() => toggleFavorite(book)}>
                                                    {book.isFavorite ? '♥' : '♡'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                                            <div className="h-full py-4 px-6 border border-amber-900 hover:shadow-md hover:bg-lightyellow  rounded-lg sm:rounded-br-xl sm:rounded-none">
                                                <h3 className="text-2xl font-bold text-md mb-6"> Add to Wishlist: </h3>
                                                <button onClick={() => toggleWishlist(book)}>
                                                    {book.isWishlist ? '★' : '☆'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
