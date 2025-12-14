import { useNavigate, useLocation } from "react-router-dom";
import { useTodo } from "../context/todoContext"
import { useHabit } from "../context/habitContext";
import { Flex } from "@chakra-ui/react";
import TodoItem from "./Item/TodoItem"
import HabitItem from "./Item/HabitItem";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


const TabPanel = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname
    const todos = useTodo();
    const habits = useHabit();

    const handleEdit = (data) => {
        navigate(`/static/edit/${activeTab}`, { state: { editData: data } });
    }

    return (
        <>
            <Flex
                direction="column"
                px="5"
                pt="5"
                pb="20"
                flex="1"
                gap="1"
                overflow="scroll"
                align="center"
                bg="gray.100"
                >
               {path === "/static/todo" && 
                    todos.map((todo) => (
                        <TodoItem 
                            key={todo.id}
                            todo={todo}
                            handleEdit={() => handleEdit(todo)}
                        />
                    ))
                }
               {path === "/static/habit" && 
                    habits.map((habit) => (
                        <HabitItem 
                            key={habit.id}
                            habit={habit}
                            handleEdit={() => handleEdit(habit)}
                        />
                    ))
                }

            </Flex>
        </>
    )
}

export default TabPanel;