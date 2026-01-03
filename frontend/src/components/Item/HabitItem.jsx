import { useHabitActions } from "../../context/habitContext"
import { useUserActions } from "../../context/userContext"
import { HStack, Checkbox, Spacer } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import ItemIcon from "../ItemIcon"

const HabitItem = ({ habit, handleEdit }) => {
    const { editHabit } = useHabitActions();
    const { addCoins, subCoins } = useUserActions()

    const handleCheckboxChange = async (checked) => {
        const habitUpdates = {
            isCompleted: checked.checked,
        }
        try {
            await editHabit(habit.id, habitUpdates)
            if(checked.checked){
                await addCoins(habit.reward)
            } else {
                await subCoins(habit.reward)
            }
        } catch (error) {
            alert('更新に失敗しました:' + error.message)
            console.log(error)
        }
    }

    return (
        <HStack
            width="100%"
            p="5"
            bg="white"
            borderRadius="xl"
            border="solid"
            borderColor="gray.200"
            borderWidth="1px"
            overflow="hidden"
            onClick={handleEdit}
            // gap="5"
            >
            <Checkbox.Root 
                variant="subtle"
                colorPalette="green"
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={handleCheckboxChange}
                checked={habit.isCompleted}
                >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label
                textDecoration={habit.isCompleted ? "line-through" : "none"}
                color={habit.isCompleted ? "gray.500" : "inherit"}
            >
                    {habit.taskName}
            </Checkbox.Label>
            </Checkbox.Root>
            <Spacer />
            <ItemIcon icon={FaCoins} color="gold" count={habit.reward} ></ItemIcon>
        </HStack>
    )
}

export default HabitItem;