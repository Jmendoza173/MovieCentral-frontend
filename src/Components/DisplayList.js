import React, {useEffect, useState, Fragment} from 'react'
import ListCard from "./ListCard";
import { Grid } from 'semantic-ui-react'

const DisplayList = () => {
    const [allList, setAllList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/users/${localStorage.loggedInUserId}`,{
            headers:{
                Accept: "application/json",
                "Authorization": localStorage.token
            }
        })
        .then(r=>r.json())
        .then(listArr => {
            // let api = listArr.lists.list_items.map(item => item.movie.api_id && item.id)
            setAllList(listArr.lists)
        })
    }, []);

    const handelDeleteList = (id) => {
        fetch(`http://localhost:3000/api/v1/lists/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": localStorage.token
            }
        })
        const newListArr = allList.filter(list => list.id !== id)
        setAllList(newListArr)
        console.log(id);
    }

    const handelDeleteMovie = (itemId, listId) => {
        fetch(`http://localhost:3000/api/v1/list_items/${itemId}`,{
            method: "DELETE",
            headers: {
                "Authorization": localStorage.token
            }
        })
        const oldList = allList.find(list => list.id === listId)
        const {list_items} = oldList
        const newListItem = list_items.filter(item => item.id !== itemId)
        const newList = ({...oldList, list_items: newListItem})
        const newListArr = allList.map(list => {
                if(list.id === newList.id){
                    return newList
                }
                return list
            })
        setAllList(newListArr)
    }

    const renderAllList = () => {
        if(allList.length === 0){
            return <h3>You currently have no list.</h3>
        }
        // console.log(allList)
        return allList.map((list, indx)=> {
            return(
                <Fragment key={indx}>
                    <details>
                        <summary><span id="title" key={indx}>{list.list_name}</span>  <i id="listDelete" className="floated right delete link icon" onClick={()=>handelDeleteList(list.id)}></i></summary>
                        <Grid columns={3} key={indx}>
                            <Grid.Row key={indx} columns={4}>
                                {list.list_items.map(item => <ListCard key={item.id} movie={item.movie.api_id} itemId={item.id} listId={list.id} handelDeleteMovie={handelDeleteMovie}/>)}
                            </Grid.Row>
                        </Grid>
                    </details>
                </Fragment>
            )
        })
    }

    return <>{renderAllList()}</>
}

export default DisplayList
