import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Flex } from "@chakra-ui/react"
import Header from './components/Header'
import Status from './components/Status'
import Tab from "./components/Tab"
import TabPanel from './components/TabPanel'
import AddButton from './components/addButton'
import { UserProvider } from './context/userContext'
import { TodoProvider } from './context/todoContext'
import { HabitProvider } from './context/habitContext'
import { RewardProvider } from './context/rewardContext'
import DialogWrapper from './components/dialog/DialogWrapper'

function App() {

    const [ activeTab, setActiveTab ] = useState("todo");

    return (
        <>
            <UserProvider>
            <TodoProvider>
            <HabitProvider>
            <RewardProvider>
                <Router>
                    <Flex
                        width="100vw"
                        height="100vh"
                        direction="column"
                        >
                        <Header/>
                        <Status /> 
                        <TabPanel activeTab={activeTab} />
                        <Routes>
                            <Route path="/static/add/:type" element={<DialogWrapper />} />
                            <Route path="/static/edit/:type" element={<DialogWrapper />}/>
                        </Routes>
                        <AddButton activeTab={activeTab}/>
                        <Tab activeTab={activeTab} setActiveTab={setActiveTab}/> 
                    </Flex>
                </Router>
            </RewardProvider>
            </HabitProvider>
            </TodoProvider>
            </UserProvider>
        </>
    );
}

export default App
