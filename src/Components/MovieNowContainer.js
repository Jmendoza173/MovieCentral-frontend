import React, { useState ,useEffect } from 'react'
import MovieList from './MovieList';

const MovieNowContainer = ({toList}) => {
    const [pageNum, setPageNum] = useState(1)
    const [moviesNow, setMoviesNow] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=ed7d0309eef7d103fe51cfd7d89e7c77&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`)
        .then(r=>r.json())
        .then(moviesArr => {
            // console.log("fetch",moviesArr.results)
            setMoviesNow(moviesArr.results)})
    }, [pageNum])

    return (
        <div>
            <MovieList moviesNow = {moviesNow} />
        </div>
    )
}

export default MovieNowContainer
