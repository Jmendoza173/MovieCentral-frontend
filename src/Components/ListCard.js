import React, {useState,useEffect} from 'react'
// import MovieCard from "./MovieCard";
import { Grid, Image } from 'semantic-ui-react'

const url = "https://image.tmdb.org/t/p/w1280"

const ListCard = ({movie, handelDeleteMovie, itemId, listId}) => {
    const [movieInfo, setMovieInfo] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=ed7d0309eef7d103fe51cfd7d89e7c77&language=en-US`)
        .then(r=>r.json())
        .then(movieObj => setMovieInfo(movieObj))
    }, [movie]);

    return (
        <Grid.Column>
            <div className="ui card">
                <div className="content">
                    <i aria-hidden="true" className="right floated delete link icon" onClick={()=>handelDeleteMovie(itemId, listId)}></i>
                    <div className="header">{movieInfo ? movieInfo.title : null}</div>
                    <div className="description">
                        <Image src={`${url}${movieInfo.poster_path}`} size='small' />
                    </div>
                </div>
            </div>
            {/* <MovieCard movie={movie}/> */}
      </Grid.Column>
    )
}

export default ListCard
