import React from 'react'
import { List } from 'semantic-ui-react'

const ListName = ({list, getListId}) => {
    return (
        <List.Item onClick={()=>getListId(list.id)}>
            <List.Content>
                {list.list_name}
            </List.Content>
        </List.Item>
    )
}

export default ListName
