import React, {useState} from 'react'
import { Form , Button} from 'semantic-ui-react'

const ListForm = () => {

    const [list, setList] = useState({name: ''});

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
        })
    }

    
    return (
        <div>
            <Form onChange={handleChange}>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Name' name="name" value = {list.name} />
                </Form.Group>
                <Button type='submit' onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default ListForm
