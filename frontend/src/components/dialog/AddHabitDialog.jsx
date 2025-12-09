import { useState, useEffect } from "react" 

import HabitForm from "../form/HabitForm";
import { useHabitActions } from "../../context/habitContext";

const AddHabitDialog = ({ isSubmit, setIsSubmit, setIsAddOpen}) => {
    const [ taskName, setTaskName ] = useState("")
    const [ difficulty, setDifficulty ] = useState(1)
    const [ reward, setReward ] = useState(1)
    const [ memo, setMemo ] = useState("")

    const { createHabit } = useHabitActions()
// IDや日付部分もcreatetodoでラップできそう
    useEffect(() => {
        if(isSubmit == false) return 
        const newHabit = {
            user_id: 1,
            name: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo,
        }
        const handleCreateHabit = async (newHabit) => {
            try {
                await createHabit(newHabit)
                setIsAddOpen(false)
            } catch (error){
                alert(error.message)
            } finally {
                setIsSubmit(false)
            }
        }
        handleCreateHabit(newHabit)
        }, [isSubmit])

    return (
        <HabitForm
            taskName={taskName} setTaskName={setTaskName}
            difficulty={difficulty} setDifficulty={setDifficulty}
            reward={reward} setReward={setReward}
            memo={memo} setMemo={setMemo}   />
    )
} 

export default AddHabitDialog