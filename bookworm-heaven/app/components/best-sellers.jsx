"use client";

import { bestSellers } from "../api/route";
import { useEffect, useState } from "react";
import SearchComponent from "./search-feature";

async function bestSellersList() {
    try {
        const bestBooks = await bestSellers();
        if (bestBooks && bestBooks.length > 0) {
            console.log(bestBooks[0]); // Log the first list for debugging
            return bestBooks[0].books;
        }
        return [];
    } catch (error) {
        console.error("Error fetching best sellers list", error);
        return [];
    }
}

export default function BestSellersComponent() {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const list = await bestSellersList();
            setList(list);
            console.log(list)
        }
        fetchData();
    }, []);

    return (
        <main className="p-10">
            <div className="flex justify-between">
                <div className="w-full">
                    <h1 className="text-4xl font-bold mb-4"> Welcome back </h1>
                        <p className="mb-8">
                            Are you ready to add a book to to your wish list, or your favorite list? <br/>
                            Let's get you started!
                        </p>
                        <SearchComponent/>

                </div>
                <div className="w-1/4">
                    <h2 className="text-xl font-bold mb-4"> Best Sellers List</h2>
                    <ul className="space-y-4">
                    {list.length > 0 ? (
                            list.map((book, index) => (
                                <li key={book.rank || index}>
                                    <img 
                                        src={book.book_image} 
                                        alt={book.title}
                                        className="w-18 h-24 object-cover mr-4 mb-4"
                                    />
                                    <div>
                                        <p className="font-semibold"> {book.title}</p>
                                        <p className="text-md mb-2"> Author: {book.author}</p>
                                        <p className="text-sm"> {book.description}</p>           
                                    </div>
                                </li>
                            ))                   
                    ) : (
                        <p>Loading...</p>
                    )}
                    </ul>
               </div>
            </div>
        </main>
    );
}

