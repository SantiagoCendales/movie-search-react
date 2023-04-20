import responseMovies from '../mocks/with-results.json'
import noResults from '../mocks/no-results.json'

export const useMovies = () => {
    const movies = responseMovies.Search;
    const hasMovies = movies?.length > 0;

    const mappedMovies = movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
    }))

    return {
        hasMovies,
        mappedMovies
    }
}