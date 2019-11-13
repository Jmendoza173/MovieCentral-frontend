import React, {useEffect, useState}  from 'react'
import DisplaySearch from "./DisplaySearch";
import { Dropdown, Button } from 'semantic-ui-react'

const DiscussionMovieSearch = ({getMovieId}) => {
    const [movie, setMovie] = useState('')
    const [message, setMessage] = useState(null)
    const [dateNow] = useState(new Date().getFullYear())
    const [yearOpt, setYearOpt] = useState([{key: 0 ,value: "none" , text: "none"}])
    const [yearChoice, setYearChoice] = useState(null)
    const [movieArr, setMovieArr] = useState(null)
    
    useEffect(() => {
        let newOpt = [{key: 0 ,value: "none" , text: "none"}];
        for(let i = dateNow; i >= 1970; i--){
           newOpt.push({key: i ,value: i , text: i})
        }
        setYearOpt(newOpt)
    }, [dateNow]);

    const Search = () => {
        if(movie === "" || !movie.replace(/\s/g, '').length){
            return setMessage("missingMovie")
        }else if(movie && yearChoice !== "none"){
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=ed7d0309eef7d103fe51cfd7d89e7c77&language=en-US&query=${movie}&page=1&include_adult=false&year=${yearChoice}`)
            .then(r=>r.json())
            .then(resultArr => setMovieArr(resultArr))
            return setMessage('searchMovieYear')
        }else if(movie){
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=ed7d0309eef7d103fe51cfd7d89e7c77&language=en-US&query=${movie}&page=1&include_adult=false`)
            .then(r=>r.json())
            .then(resultArr => setMovieArr(resultArr))
            return setMessage('searchMovie')
        }

    }

    const renderSearch = () => {
        if (message === 'missingMovie'){
            return <h3>Cannot start search. Search field is empty or only has spaces.</h3>
        }else if(message === 'searchMovieYear'){
            return movieArr ? movieArr.results.map(movie => <DisplaySearch key={movie.id} movie={movie} handelAddMovie={getMovieId}/>) : null
        }else if(message === 'searchMovie'){
            return movieArr ? movieArr.results.map(movie => <DisplaySearch key={movie.id} movie={movie} handelAddMovie={getMovieId}/>) : null
        }
    }

    // console.log(movieArr.results);
    // console.log(yearChoice);
    return (
        <div id={"pop"}>
            <h3>Search & Choose a Movie</h3>
            <div className="ui icon input">
                <input type="text" placeholder="Search for Movie" name="movie" value={movie}
                    onChange={(e)=> setMovie(e.target.value)}/>
            </div>
            <Dropdown 
                placeholder='Select Year (Optional)' 
                selection
                search
                options={yearOpt}
                onChange={(e,{value})=>setYearChoice(value)}
            />
            <Button icon="search" content="Search" onClick={Search}/>
            <div id={"popList"}>
                {renderSearch()}
            </div>
        </div>
    )
}

export default DiscussionMovieSearch
