import { useState } from "react" 
import { useHabitActions } from "../../context/habitContext";
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import HabitForm from "../Form/HabitForm";

const AddHabitDialog = () => {
    const [ taskName, setTaskName ] = useState("")
    const [ difficulty, setDifficulty ] = useState(1)
    const [ reward, setReward ] = useState(1)
    const [ memo, setMemo ] = useState("")

    const { createHabit } = useHabitActions()

    const handleCreateHabit = async () => {
        const newHabit = {
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo,
        }
        try {
            await createHabit(newHabit)
        } catch (error){
            alert(error.message)
        }
    }

    return (
        <>
            <Dialog.Header >
                <Dialog.Title>習慣の作成</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <HabitForm
                    taskName={taskName} setTaskName={setTaskName}
                    difficulty={difficulty} setDifficulty={setDifficulty}
                    reward={reward} setReward={setReward}
                    memo={memo} setMemo={setMemo}   />
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline">キャンセル</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                    <Button 
                        bg="green.500"
                        onClick={handleCreateHabit}
                        >作成</Button>
                </Dialog.ActionTrigger>

            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>
        </>
    )
} 

export default AddHabitDialog