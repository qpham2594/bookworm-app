// NY Time API Key: Ze9EqkT76adSZVreaK9cbwuy3I2JSwpc
// NY Time Secret: ALRo3PyTT8zuws5N

export async function bestSellers() {
    const response = await fetch (`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.NEXT_PUBLIC_api-key}`)
    if (response.status !==200)
        return null
    const data = await response.json()
    console.log(data)
    return data
    }

export async function bookReview(title) {
    const response = await fetch (`https://api.nytimes.com/svc/books/v3/lists/reviews.json?title=${title}?api-key=${process.env.NEXT_PUBLIC_api-key}`)
    if (response.status !==200)
        return null
    const data = await response.json()
    console.log(data)
    return data
}