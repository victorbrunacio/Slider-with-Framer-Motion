import { useEffect, useState } from 'react';
import './App.css';
import Movie from './Movie';
import Filter from './Filter';
import { motion, AnimatePresence } from 'framer-motion';


function App() {

  const [popular, setPopular] = useState([])
  const [filtered, setFiltered] = useState([])
  const[activeGenre, setActiveGenre] = useState(0)

  useEffect(()=>{
    fetchPopular()
  },[])


  const fetchPopular = async () => {
    const api = "https://api.themoviedb.org/3/movie/popular?api_key=7314cca5d45a842e42e3c71c7d58eba2&language=en-US&page=1"
    const data = await fetch(api)
    const movies = await data.json()

    console.log(movies)
    setPopular(movies.results)
    setFiltered(movies.results)
  }

  return (
    <div className="App">
      <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
    <motion.div layout  className='popular-movies'>
      <AnimatePresence>
      {filtered.map((movie)=>{
        return(
          <Movie key={movie.id} movie={movie} />
        )
      } )}
      </AnimatePresence>
    </motion.div>
    </div>
  );
}

export default App;
