import React, {useState, useEffect}  from 'react'
import RenderDiscussion from "./RenderDiscussion";
import { Form ,Progress ,Segment , Button, Modal, TextArea} from 'semantic-ui-react'
import DiscussionMovieSearch from './DiscussionMovieSearch';


const DiscussionContainer = () => {
    const [allDiscussion, setallDiscussion] = useState(null)
    const [movieId, setMovieId] = useState(null)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1)
    const [content, setContent] = useState({name: ''});
    const [backendMovieArr, setBackendMovieArr] = useState(null);
    
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/discussions",{
            headers: {
                Accept: "application/json",
                "Authorization": localStorage.token
            }
        }).then(r=>r.json())
        .then(discussionArr => setallDiscussion(discussionArr))

        fetch("http://localhost:3000/api/v1/movies")
        .then(r=>r.json())
        .then(movieArr => setBackendMovieArr(movieArr))
    }, []);
    
    const active = () => setOpen(true)
    const close = () => setOpen(false)
    
    let handleChange = (e) =>{
          setContent({[e.target.name]: e.target.value})
        }

    const increment = () =>
        setValue(value >= 2 ? 1 : value + 1)

    const getMovieId = (movieId, title, url) => {
        const found = backendMovieArr.find(movie => movie.api_id === movieId)
        if(!found){
            setValue(2)
            return fetch('http://localhost:3000/api/v1/movies',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                        Accept: 'application/json',
                    "Authorization": localStorage.token
                },
                body: JSON.stringify({
                    title: title,
                    api_id: movieId,
                    poster_path: url
                })
            }).then(r=>r.json())
            .then(movieObj => setMovieId({id: movieObj.id, title: title, img: url}))
        }
        setValue(2)
        return setMovieId({id: found.id, title: title, img: url})
    }


    const renderCreateForm = () => {
        if(value === 1){
            return <DiscussionMovieSearch getMovieId={getMovieId}/>
        }else{
            return <>
                    <h3>What would you like to talk about?</h3>
                    <Form onChange={handleChange}>
                        <TextArea placeholder='Tell Us...' label='Name' name="name" value = {content.name}/>
                    </Form>
                    </>
        }
    }

    const handleDone  = () => {
        if(movieId && content){
            fetch("http://localhost:3000/api/v1/discussions",{
                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                movie_id: movieId.id,
                user_id: localStorage.loggedInUserId,
                content: content.name,
                title: movieId.img
                })
            }).then(r=>r.json())
            .then(disc => setallDiscussion([disc,...allDiscussion]))
        }
        setValue(1)
        close()
    }
    
    const renderButton = () => {
        if(value === 1){
            return <Button onClick={increment} icon='arrow right' />
        }else{
            return <Button icon='check' content='Done' onClick={handleDone} />
        }
    }
    
    return (
        <div>
            <h2 id="h2disc">Discussion</h2>
            <p id="h2disc">Where you can have a conversation with other user about a topic and movie of your choice.</p>
            <Modal 
                open={open}
                onOpen={active}
                onClose={close}
                size="large"
                trigger={<Button attached='top' content="Create New" color='black' onClick={()=>setValue(1)}/>}>
                <Modal.Header>Create a new Discussion.</Modal.Header>
                <Modal.Content>
                    {renderCreateForm()}
                    
                </Modal.Content>
                <Modal.Actions>
                    {renderButton()}
                </Modal.Actions>
            </Modal>
            <Segment attached>
                {allDiscussion ? allDiscussion.map(disc => <RenderDiscussion key={disc.id} disc={disc}/>) : null}
            </Segment>
        </div>
    )
}

export default DiscussionContainer
