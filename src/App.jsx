import './App.css'
import { MovieItem, NoResult } from './components/MovieItem';
import { useMovies } from './hooks/useMovies';

const api_key = '2b4af9fd'

function App() {

  const { mappedMovies, hasMovies } = useMovies();

  return (
    <div className='page'>
      <header>
        <h1>Movie Search</h1>
        <form className='form'>
          <input
            type="text"
            placeholder='Iron man, Captain America, ...'
          />
          <button type="submit">
            Search
          </button>
        </form>
      </header>

      <main>
        {
          hasMovies
          ? <MovieItem movies={mappedMovies}/>
          : <NoResult />
        }
      </main>
    </div>
  )
}

export default App
