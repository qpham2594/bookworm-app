export async function bestSellers() {
    const response = await fetch (`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.NEXT_PUBLIC_API_KEY}`)
    if (response.status !==200)
        return null
    const data = await response.json()
    return data.results.lists;
    }

export async function bookReview(title) {
    const response = await fetch (`https://api.nytimes.com/svc/books/v3/lists/reviews.json?title=${title}?api-key=${process.env.NEXT_PUBLIC_API_KEY}`)
    if (response.status !==200)
        return null
    const data = await response.json()
    console.log(data)
    return data
}