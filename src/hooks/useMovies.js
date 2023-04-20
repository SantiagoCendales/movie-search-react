import { useMemo, useRef, useState, useCallback } from 'react';
import { searchMovies } from '../services/movies';

export const useMovies = ({search, sort}) => {
    
    const [respMovies, setRespMovies ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const previousSearch = useRef(search);

    const hasMovies = respMovies?.length > 0;


    const getMovies = useCallback(async({ search }) => {
        if(search === previousSearch.current) return;
        try {
            setIsLoading(true);
            setError(null)
            previousSearch.current = search;
            const newMovies = await searchMovies({search});
            setRespMovies(newMovies);
        } catch (error) {
            setError(error.message);
        } finally {
            // Esto se ejecuta tanto si pasa por el try como por el catch
            setIsLoading(false);
        }
    }, []) 


    const sortedMovies =  useMemo(() => {
        return sort 
        ? [... respMovies].sort((a, b) => a.title.localeCompare(b.title))
        : respMovies;
    }, [sort, respMovies])

    return {
        hasMovies,
        isLoading,
        error,
        movies: sortedMovies,
        getMovies
    }
}