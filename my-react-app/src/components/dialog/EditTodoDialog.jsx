import { useState, useEffect } from "react" 
import { useTodoActions } from "../../context/TodoContext";

import TodoForm from "../form/TodoForm";

const EditTodoDialog = ({ isSubmit, setIsSubmit, setIsEditOpen, editData}) => {
    const [ taskName, setTaskName ] = useState(editData.taskName)
    const [ difficulty, setDifficulty ] = useState(editData.difficulty)
    const [ reward, setReward ] = useState(editData.reward)
    const [ memo, setMemo ] = useState(editData.memo)

    const { editTodo } = useTodoActions()

    useEffect(() => {
        if(isSubmit == false) return 
        const newTodo = {
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo,
            updatedAt: new Date().toISOString()
        }
        const handleEditTodo = async (updates) => {
            try {
                editTodo(editData.id, updates)
                setIsEditOpen(false)
            } catch (error){
                alert(error.message)
            } finally {
                setIsSubmit(false)
            }
        }
        handleEditTodo(newTodo)
        }, [isSubmit])

    return (
        <TodoForm
            taskName={taskName} setTaskName={setTaskName}
            difficulty={difficulty} setDifficulty={setDifficulty}
            reward={reward} setReward={setReward}
            memo={memo} setMemo={setMemo}   />
    )
} 

export default EditTodoDialog