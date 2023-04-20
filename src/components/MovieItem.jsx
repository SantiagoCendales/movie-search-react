
export const MovieItem = ({movies}) => {
    return (
        <ul>
            {
            movies.map(movie => (
                <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.poster} alt={movie.title} style={{ borderRadius: '8px', border: '2px solid white'}} />
                </li>
            ))
            }
        </ul>
    )
}

export const NoResult = () => {
    return (
        <p>No movies found</p>
    )
}
