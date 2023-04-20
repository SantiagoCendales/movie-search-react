const API_KEY = '2b4af9fd'

export const searchMovies = async({search}) => {

    if (search === '') return null;

    try {
        const result = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const data = await result.json();

        const movies = data.Search;
    
        return movies?.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
        }))
        
    } catch (error) {
        throw new Error('Error searching movies')
    }
}