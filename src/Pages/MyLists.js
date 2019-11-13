import React from 'react'
import DisplayList from "../Components/DisplayList";
import ListForm from "../Components/ListForm";
import PopulateList from "../Components/PopulateList";
import { Tab } from 'semantic-ui-react'

const panes = [
    { menuItem: 'List', render: () => <Tab.Pane><DisplayList /></Tab.Pane> },
    { menuItem: 'Create List', render: () => <Tab.Pane><ListForm /></Tab.Pane> },
    { menuItem: 'Populate List', render: () => <Tab.Pane><PopulateList /></Tab.Pane> },
  ]

const MyLists = () => (
    <>
    <h1 style={{"textAlign": "center"}}>My Lists</h1>
    <Tab menu={{align: "center", fluid: true, vertical: true, tabular: true}} panes={panes}/>
    </>
)

export default MyLists
