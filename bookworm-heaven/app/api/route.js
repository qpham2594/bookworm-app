import { NextResponse } from "next/server";

export async function bestSellers() {
    const response = await fetch (`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.NEXT_PUBLIC_API_KEY}`);
    if (response.status !== 200)
        return null;
    const data = await response.json();
    return data.results.lists;
}

export async function bookReview(query) {
    try {
        const response = await fetch (`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
        if (response.status !== 200)
            throw new Error('Failed to fetch reviews');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 
