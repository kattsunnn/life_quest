import { useState, useEffect } from "react" 
import { useHabitActions } from "../../context/habitContext"
import HabitForm from "../Form/HabitForm"

const EditHabitDialog = ({ isSubmit, setIsSubmit, setIsEditOpen, editData}) => {
    const [ taskName, setTaskName ] = useState(editData.taskName)
    const [ difficulty, setDifficulty ] = useState(editData.difficulty)
    const [ reward, setReward ] = useState(editData.reward)
    const [ memo, setMemo ] = useState(editData.memo)

    const { editHabit } = useHabitActions()

    useEffect(() => {
        if(isSubmit == false) return 
        const habitUpdates = {
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo
        }
        const handleEditHabit = async (updates) => {
            try {
                await editHabit(editData.id, updates)
                setIsEditOpen(false)
            } catch (error){
                alert(error.message)
            } finally {
                setIsSubmit(false)
            }
        }
        handleEditHabit(habitUpdates)
        }, [isSubmit])

    return (
        <HabitForm
            taskName={taskName} setTaskName={setTaskName}
            difficulty={difficulty} setDifficulty={setDifficulty}
            reward={reward} setReward={setReward}
            memo={memo} setMemo={setMemo}   />
    )
} 

export default EditHabitDialog