import { useState } from "react"
import { useTodo } from "../context/todoContext"
import { useHabit } from "../context/habitContext";
import { useReward } from "../context/rewardContext";
import { Flex } from "@chakra-ui/react";
import TodoItem from "./Item/TodoItem"
import HabitItem from "./Item/HabitItem";
import EditDialog from "./dialog/EditDialog";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TabPanel = ({ activeTab }) => {

    const todos = useTodo();
    const habits = useHabit();
    const rewards = useReward();

    const [ isEditOpen, setIsEditOpen ] = useState(false);
    const [ editData, setEditData ] = useState(null);

    const handleEdit = (data) => {
        setEditData(data);
        setIsEditOpen(true);
    }

    const renderPanel = () => {
        switch(activeTab) {
            case "todo":
                return todos.map((todo) => (
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        handleEdit={() => handleEdit(todo)}
                    />))
            case "habit":
                return habits.map((habit) => (
                    <HabitItem 
                        key={habit.id}
                        habit={habit}
                        handleEdit={() => handleEdit(habit)}
                    />))
            case "reward":
                // return rewards.map((reward) => (
                //         // <Todo name={reward.name} coin={reward.price} />
                //         ))
            default:
                return null
        }
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
               {renderPanel()}
                
            </Flex>

            <EditDialog 
                isEditOpen={isEditOpen}
                setIsEditOpen={setIsEditOpen}
                activeTab={activeTab}
                editData={editData}
            />
        </>
    )
}

export default TabPanel;