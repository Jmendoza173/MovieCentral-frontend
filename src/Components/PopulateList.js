import React, {useEffect, useState}  from 'react'
import DisplaySearch from "./DisplaySearch";
import { Dropdown, Button } from 'semantic-ui-react'

const PopulateList = () => {
    const [allList, setAllList] = useState([])
    const [listOpt, setListOpt] = useState(null)
    const [movie, setMovie] = useState('')
    const [message, setMessage] = useState(null)
    const [dateNow] = useState(new Date().getFullYear())
    const [yearOpt, setYearOpt] = useState([{key: 0 ,value: "none" , text: "none"}])
    const [yearChoice, setYearChoice] = useState(null)
    const [movieArr, setMovieArr] = useState(null)
    const [backendMovieArr, setBackendMovieArr] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/users/${localStorage.loggedInUserId}`,{
            headers:{
                Accept: "application/json",
                "Authorization": localStorage.token
            }
        })
        .then(r=>r.json())
        .then(listArr => {
            const options = listArr.lists.map(list => {return{key: list.id ,value: list.id , text: list.list_name}})
            setAllList(options)
        })

        fetch("http://localhost:3000/api/v1/movies")
                    .then(r=>r.json())
                    .then(movieArr => setBackendMovieArr(movieArr))
        
                    let newOpt = [{key: 0 ,value: "none" , text: "none"}];
        for(let i = dateNow; i >= 1970; i--){
           newOpt.push({key: i ,value: i , text: i})
        }
        setYearOpt(newOpt)
    }, [dateNow]);
    

    const handelAddMovie = (apiId, title, imgUrl) => {
        if(!listOpt){
            return setMessage("missingList")
        }

        const found = backendMovieArr.find(movie => movie.api_id === apiId)
        if(found){
           return addToList(found.id)
        }
    
        fetch('http://localhost:3000/api/v1/movies',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                    Accept: 'application/json',
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                title: title,
                api_id: apiId,
                poster_path: imgUrl

            })
        }).then(r=>r.json())
        .then(movieObj => addToList(movieObj.id))
    }

    const addToList = (id) => {
        fetch('http://localhost:3000/api/v1/list_items',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Authorization": localStorage.token
                },
                body: JSON.stringify({
                    list_id: listOpt,
                    movie_id: id
            
                })
            })
            .then(r=>r.json())
            .then(listItemObj => console.log("completed", listItemObj))
    }

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
            return movieArr ? movieArr.results.map(movie => <DisplaySearch key={movie.id} movie={movie} handelAddMovie={handelAddMovie}/>) : null
        }else if(message === 'searchMovie'){
            return movieArr ? movieArr.results.map(movie => <DisplaySearch key={movie.id} movie={movie} handelAddMovie={handelAddMovie}/>) : null
        }else if(message === 'missingList'){
            return <>
                    <h3>Cannot start search. Search field is empty or only has spaces.</h3>
                    <br/>
                    {movieArr ? movieArr.results.map(movie => <DisplaySearch key={movie.id} movie={movie} handelAddMovie={handelAddMovie}/>) : null}
                    </>
        }
    }

    // console.log(movieArr.results);
    // console.log(yearChoice);
    return (
        <div id={"pop"}>
            <Dropdown 
                placeholder='Select List to Populate' 
                selection
                search
                options={allList}
                onChange={(e,{value})=>setListOpt(value)}
            />
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
            <br/>
            <div id={"popList"}>
                {renderSearch()}
            </div>
        </div>
    )
}

export default PopulateList
