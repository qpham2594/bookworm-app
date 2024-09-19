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
        <main className="p-10 bg-gradient-to-b from-[#f5ebff] via-[#eae4ff] via-[#dddeff] via-[#ccd8ff] to-[#b9c9fb]">
        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center gap-8">
            <div className="w-full lg:w-auto text-center lg:text-left">
            <h1 className="text-4xl text-amber-900 font-bold mb-4"> Welcome back </h1>
            <p className="mb-8 text-amber-900">
                Are you ready to add a book to your wish list, or your favorite list? <br />
                Let's get you started!
            </p>
            <SearchComponent />
            </div>

            <div className="w-full lg:w-1/4 p-6 border rounded border-purple-900 hover:shadow-md bg-lightyellow text-center lg:text-left">
            <h2 className="text-3xl md:text-xl sm:text-xl font-bold mb-8 text-amber-900 p-6"> Best Sellers List</h2>
            <ul className="space-y-8 p-6">
                {list.length > 0 ? (
                list.map((book, index) => (
                    <li key={book.rank || index} className="flex flex-col items-center lg:items-start">
                    <img
                        src={book.book_image}
                        alt={book.title}
                        className="w-18 h-24 object-cover mb-4"
                    />
                    <div>
                        <p className="font-semibold text-lg"> {book.title}</p>
                        <p className="text-md mb-2"> Author: {book.author}</p>
                        <p className="text-md"> {book.description}</p>
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

