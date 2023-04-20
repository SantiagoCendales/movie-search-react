import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import { MovieItem, NoResult } from './components/MovieItem';
import { useMovies } from './hooks/useMovies';

import debounce from 'just-debounce-it';

const api_key = '2b4af9fd'

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if(isFirstInput.current) {
      isFirstInput.current = search === '';
      return
    }
    if(search === '') {
      setError('No se puede buscar la película')
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar un numero')
      return;
    }

    if (search.length < 3) {
      setError('La búsqueda debe contener 3 caracteres')
      return;
    }

    setError(null);
  }, [search])

  return {
    search,
    setSearch,
    error
  }
}

function App() {

  const [sort, setSort] = useState(false);
  const { search, error, setSearch } = useSearch()
  const { movies,
    isLoading,
    error: movieError,
    hasMovies,
    getMovies
  } = useMovies({search, sort});

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 500)
    , []
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  }

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    // debounce(() => getMovies({search: newSearch}), 500)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort);
  }
  
  return (
    <div className='page'>
      <header>
        <h1>Movie Search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            name='search'
            value={search}
            onChange={handleChange}
            type="text"
            placeholder='Iron man, Captain America, ...'
          />
          <input
            type="checkbox"
            onChange={handleSort}
            checked={sort}
          />
          <button type="submit">
            Search
          </button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          isLoading
          ? <p>Loading...</p>
          : hasMovies
          ? <MovieItem movies={movies}/>
          : <NoResult />
        }
      </main>
    </div>
  )
}

export default App
