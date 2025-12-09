import { useState } from 'react'

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

function App() {

    const [ activeTab, setActiveTab ] = useState("todo");

    return (
        <>
            <UserProvider>
            <TodoProvider>
            <HabitProvider>
            <RewardProvider>
                <Flex
                    width="100vw"
                    height="100vh"
                    direction="column"
                    >
                    <Header/>
                    <Status /> 
                    <TabPanel activeTab={activeTab} />
                    <AddButton activeTab={activeTab}/>
                    <Tab activeTab={activeTab} setActiveTab={setActiveTab}/> 
                </Flex>
            </RewardProvider>
            </HabitProvider>
            </TodoProvider>
            </UserProvider>
        </>
    );
}

export default App
