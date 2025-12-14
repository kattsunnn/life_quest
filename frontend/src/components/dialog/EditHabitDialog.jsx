import { useState } from "react" 
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import { useHabitActions } from "../../context/habitContext";
import { useUserActions } from "../../context/userContext";
import HabitForm from "../Form/HabitForm";

const EditHabitDialog = ({editData}) => {
    const [ taskName, setTaskName ] = useState(editData.taskName)
    const [ difficulty, setDifficulty ] = useState(editData.difficulty)
    const [ reward, setReward ] = useState(editData.reward)
    const [ memo, setMemo ] = useState(editData.memo)

    const { editHabit, deleteHabit } = useHabitActions()
    const { subCoins } = useUserActions()

    const handleDeleteHabit = async () => {
        try {
            await deleteHabit(editData.id)
            if (editData.isCompleted) {
                await subCoins(editData.reward)
            }      
        } catch (error){
            alert(error.message)
        } 
    }

    const handleEditHabit = async () => {
        const habitUpdates = {
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo,
        }
        try {
            await editHabit(editData.id, habitUpdates)
        } catch (error){
            alert(error.message)
        } 
    }

    return (
        <>
            <Dialog.Header >
                <Dialog.Title>習慣の編集</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
                overflow="auto"
                >
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
                        bg="red.500"
                        onClick={handleDeleteHabit}
                        >
                        削除
                    </Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                    <Button 
                        bg="green.500"
                        onClick={handleEditHabit}
                        >
                        編集
                    </Button>
                </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>

        </>
    )
} 

export default EditHabitDialog