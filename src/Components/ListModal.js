import React, { useState,useEffect  } from 'react'
import { Form, Button, Icon, Modal, List } from 'semantic-ui-react'
import ListName from "./ListName"

const ListModal = ({getCreatedList}) => {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState({name: ''});

  const active = () => setOpen(true)
  const close = () => setOpen(false)
  let handleChange = (e) =>{
      console.log(e.target.name, list);
      setList({[e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    fetch('http://localhost:3000/api/v1/lists',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": localStorage.token
        },
        body: JSON.stringify({
            list_name: list.name,
            user_id: localStorage.loggedInUserId
        })
    }).then(r=>r.json())
    .then(listObj => {
        console.log("completed", listObj)
        getCreatedList(listObj)
    })
    close()
  }

//   console.log(props)
    return (
      <Modal
        open={open}
        onOpen={active}
        onClose={close}
        trigger={
          <Button primary icon>
            Create List <Icon name='right chevron' />
          </Button>
        }
      >
        <Modal.Header>Create List</Modal.Header>
        <Modal.Content>
          <Form onChange={handleChange}>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Name' name="name" value = {list.name} />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='Submit' onClick={handleSubmit} />
        </Modal.Actions>
      </Modal>
    )
}

const AddToList = ({movie}) => {
    const [apiId] = useState(movie.id);
    const [title] = useState(movie.title);
    const [movieId, setMovieId] = useState(null);
    const [movieExist, setMovieExist] = useState(false);
    const [open, setOpen] = useState(false);
    const [lists, setLists] = useState([]);
    const [listEmpty, setListEmpty] = useState(true);

    const active = () => setOpen(true)
    const close = () => setOpen(false)

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/users/"+localStorage.loggedInUserId,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": localStorage.token
        }
        }).then(r=>r.json())
        .then(userObj => {
            setLists(userObj.lists)
            return userObj.lists.length > 0 ? setListEmpty(false) : null
        })
        fetch("http://localhost:3000/api/v1/movies")
        .then(r=>r.json())
        .then(movieArr => movieArr.map(movie => movie.api_id === apiId ? (setMovieExist(true), setMovieId(movie.id)) : null))
    }, [apiId]);

    let getListId = (id) => {
        if(!movieExist){
            fetch('http://localhost:3000/api/v1/movies',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     Accept: 'application/json',
                    "Authorization": localStorage.token
                },
                body: JSON.stringify({
                    title: title,
                    api_id: apiId
                })
            }).then(r=>r.json())
            .then(movieObj => setMovieId(movieObj.id))
        }
        if(movieId){
            fetch('http://localhost:3000/api/v1/list_items',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Authorization": localStorage.token
                },
                body: JSON.stringify({
                    list_id: id,
                    movie_id: movieId
                })
            }).then(r=>r.json())
            .then(listItemObj => console.log("completed", listItemObj))
        }
        close()
    }

    const getCreatedList = (list) => {
        return setLists([...lists, list])
    }

    const renderList = () => {
        return !listEmpty ? lists.map(list => <ListName key={list.id} list={list} getListId={getListId}/>) : 
            <li>You currently have no list</li>
    }
    // console.log(title)
    return(
  <Modal 
    open={open}
    onOpen={active}
    onClose={close}
    size="mini"
    trigger={<Button icon="list layout" />}>
    <Modal.Header>Add Movie to a List</Modal.Header>
    <Modal.Content>
      <p><strong>Here are your List: </strong></p>
      <List animated selection verticalAlign='middle'>
          {renderList()}
      </List>
    </Modal.Content>
    <Modal.Actions>
      <ListModal getCreatedList={getCreatedList} />
      <Button icon='check' content='Done' onClick={close} />
    </Modal.Actions>
  </Modal>
)}

export default AddToList