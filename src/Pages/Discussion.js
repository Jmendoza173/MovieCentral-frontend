import React, {useState, useEffect} from 'react'
import DiscussionContainer from "../Components/DiscussionContainer";
import { Tab } from 'semantic-ui-react'

const panes = [
    { menuItem: 'All', render: () => <Tab.Pane id="discContainer"><DiscussionContainer /></Tab.Pane> },
    { menuItem: 'Create List', render: () => <Tab.Pane></Tab.Pane> },
    { menuItem: 'Populate List', render: () => <Tab.Pane></Tab.Pane> },
]

const Discussion = () => {
    return (
         <>
            <h1 style={{"textAlign": "center"}}>Discussions</h1>
            <Tab menu={{fluid: true, vertical: true, tabular: true}} id="discTab" panes={panes}/>
        </>
    )
}

export default Discussion
