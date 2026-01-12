import { useHabitActions } from "../../context/habitContext";
import { useNavigate } from "react-router-dom";
import { Accordion, Flex } from "@chakra-ui/react"

import AccordionSection from "./AcoordionSection";
import HabitItem from "../Item/HabitItem"

const HabitList = () => {
    const { getCompletedHabits, getIncompletedHabits } = useHabitActions();
    const completedHabits = getCompletedHabits();
    const incompletedHabits = getIncompletedHabits();

    const navigate = useNavigate();
    
    const handleEdit = (habit) => {
        navigate(`/static/edit/habit`, { state: { editData: habit } });
    }

    return (
        <>
            <Accordion.Root collapsible multiple defaultValue={["habits"]}>
                <AccordionSection value="habits" title="習慣">
                    <Flex
                        direction="column"
                        gap="1">
                        {incompletedHabits.map((habit) => (
                            <HabitItem
                                key={habit.id}
                                habit={habit}
                                handleEdit={() => handleEdit(habit)}
                                />
                        ))}
                    </Flex>
                </AccordionSection>
                <AccordionSection value="completed" title="完了">
                    <Flex
                        direction="column"
                        gap="1">
                        {completedHabits.map((habit) => (
                            <HabitItem
                                key={habit.id}
                                habit={habit}
                                handleEdit={() => handleEdit(habit)}
                            />
                    ))}
                    </Flex>
                </AccordionSection>
            </Accordion.Root>
        </>
    )
}

export default HabitList