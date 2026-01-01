import { useState } from "react" 
import { useHabitActions } from "../../context/habitContext";
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import HabitForm from "../Form/HabitForm";

const AddHabitDialog = () => {
    const [habitForm, setHabitForm] = useState(() => ({
        taskName: "",
        difficulty: 0,
        reward: 0,
        memo: "",
        weekdays: {},
    }));
    const { createHabit } = useHabitActions()

    const handleCreateHabit = async () => {
        try {
            await createHabit(habitForm)
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
                <HabitForm habitForm={habitForm} setHabitForm={setHabitForm}   />
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