import { useState } from "react" 
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import { useHabitActions } from "../../context/habitContext";
import { useUserActions } from "../../context/userContext";
import HabitForm from "../Form/HabitForm";

const EditHabitDialog = ({editData}) => {

    const [habitForm, setHabitForm] = useState(() => ({
    taskName: editData.taskName,
    difficulty: editData.difficulty,
    reward: editData.reward,
    memo: editData.memo,
    weekdays: { ...editData.weekdays },
    }));
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
        try {
            await editHabit(editData.id, habitForm)
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
                <HabitForm habitForm={habitForm} setHabitForm={setHabitForm}/>
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