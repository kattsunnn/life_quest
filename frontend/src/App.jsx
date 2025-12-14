import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

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
                        <Routes>
                            <Route path="/static" element={<Navigate to="/static/todo" />} />
                            <Route path="/static/todo" element={<TabPanel/>}/>
                            <Route path="/static/habit" element={<TabPanel/>}/>
                            <Route path="/static/add/:type" element={<DialogWrapper />} />
                            <Route path="/static/edit/:type" element={<DialogWrapper />}/>
                        </Routes>
                        <AddButton />
                        <Tab /> 
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
