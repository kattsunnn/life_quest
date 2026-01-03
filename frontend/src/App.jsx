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
import TodoList from "./components/list/TodoList"
import HabitList from "./components/list/HabitList"
import RewardList from "./components/list/RewardList"
import PriceButton from "./components/PriceButton"

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
                            <Route path="/static" element={<TabPanel />}>
                                <Route path="todo" element={<TodoList />} />
                                <Route path="habit" element={<HabitList />} />
                                <Route path="reward" element={<RewardList />}/>
                                <Route path="add/:type" element={<DialogWrapper />} />
                                <Route path="edit/:type" element={<DialogWrapper />}/>
                            </Route>
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
