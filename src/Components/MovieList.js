import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({moviesNow, toList}) => {

    const renderMovie = () => {
        if(moviesNow){
            return moviesNow.map(movie => {
            // console.log("render",movie)
            return <MovieCard movie={movie} key={movie.title} toList={toList}/>})
        }
    }
    return (<>
            <h1>Recently in theater</h1>
            <div id="moviesNow">
                {renderMovie()}
            </div>
        </>
    )
}

export default MovieList
