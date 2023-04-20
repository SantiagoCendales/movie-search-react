import { useState } from 'react';
import { searchMovies } from '../services/movies';

export const useMovies = ({search}) => {
    
    const [respMovies, setRespMovies ] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const hasMovies = respMovies?.length > 0;


    const getMovies = async() => {
        try {
            setIsLoading(true);
            setError(null)
            const newMovies = await searchMovies({search});
            setRespMovies(newMovies);
        } catch (error) {
            setError(error.message);
        } finally {
            // Esto se ejecuta tanto si pasa por el try como por el catch
            setIsLoading(false);
        }
    };


    return {
        hasMovies,
        isLoading,
        error,
        movies: respMovies,
        getMovies
    }
}