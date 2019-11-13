import React, {useState, useEffect} from 'react'
import { Button } from 'semantic-ui-react'
import ListModal from "./ListModal";

const url = "https://image.tmdb.org/t/p/w1280"

const MovieCard = ({movie}) => {

    const [movieInfo, setMovieInfo] = useState(null)

    console.log(movieInfo);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=ed7d0309eef7d103fe51cfd7d89e7c77&language=en-US`)
        .then(r=>r.json())
        .then(movieObj => setMovieInfo(movieObj))
    }, [movie]);
    
    let renderCard = () => {
        return movieInfo ? (
            <div id="card">
                <div id="poster"><img src={`${url}${movieInfo.poster_path}`} alt="" height="250px"/></div>
                <div id="info">
                    <h3>{movieInfo.title}</h3>
                </div>
                <div id="button">
                    <Button.Group
                        compact
                        buttons={[
                            <ListModal key={movieInfo.id} movie={movieInfo}/>,
                            // { key: 'list layout', icon: 'list layout', onClick: handleAddToList},
                            { key: 'like', icon: 'like' },
                            { key: 'eye', icon: 'eye' },
                            { key: 'star outline', icon: 'star outline' },
                        ]}
                    />
                </div>
            </div>
            
        ) : null
    }

    return renderCard()
}

export default MovieCard
