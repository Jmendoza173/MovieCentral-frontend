import React from 'react'
import {Image } from 'semantic-ui-react'

const DisplaySearch = ({movie, handelAddMovie}) => {
    const url = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`
    return (
            <div id="adjust" className="ui card">
                <div className="content">
                    <i aria-hidden="true" className="right floated plus link icon" onClick={()=>handelAddMovie(movie.id, movie.title, url)}></i>
                    <div className="header">{movie.title}</div>
                        <Image id="popImg" src={url} size="small"/>
                </div>
            </div>
    )
}

export default DisplaySearch
