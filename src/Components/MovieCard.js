import React, {useState, useEffect} from 'react'

const url = "https://image.tmdb.org/t/p/w1280"

const MovieCard = ({movie}) => {

    const [movieInfo, setMovieInfo] = useState(null)
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=ed7d0309eef7d103fe51cfd7d89e7c77&language=en-US`)
        .then(r=>r.json())
        .then(movieObj => setMovieInfo(movieObj))
    }, [movie.id]);
    
    const overview = movieInfo ? movieInfo.overview.split(".") : []
    console.log(movieInfo)
    return (
        <div id="card">
            <div id="poster"><img src={`${url}${movie.poster_path}`} alt="" height="250px"/></div>
            <div id="info">
                <h3>{movie.title}</h3>
                <p id="overview">{overview[0]}</p>
                <button>View More Information</button>
            </div>
            <div id="button">
                <button>Add to List</button>
                <button>Favorite</button>
                <button>To Watch</button>
                <button>Rate Movie</button>
            </div>
        </div>
    )
}

export default MovieCard
