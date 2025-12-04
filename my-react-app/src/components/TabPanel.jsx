import { useTodo } from "../context/todoContext"
import { useHabit } from "../context/habitContext";
import { useReward } from "../context/rewardContext";
import { Flex } from "@chakra-ui/react";
import Todo from "./Todo"

const TabPanel = ({ activeTab }) => {

    const todos = useTodo();
    const habits = useHabit();
    const rewards = useReward();

    const renderPanel = () => {
        switch(activeTab) {
            case "todo":
                return todos.map((todo) => (
                        <Todo name={todo.name} coin={todo.reward} />
                        ))
            case "habit":
                return habits.map((habit) => (
                        <Todo name={habit.name} coin={habit.reward} />
                        ))
            case "reward":
                return rewards.map((reward) => (
                        <Todo name={reward.name} coin={reward.price} />
                        ))
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
        </>
    )
}

export default TabPanel;