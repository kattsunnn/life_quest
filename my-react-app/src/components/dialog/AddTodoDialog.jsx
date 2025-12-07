import { useState, useEffect } from "react" 
import { v4 as uuidv4 } from 'uuid'

import TodoForm from "../form/TodoForm";
import { useTodoActions } from "../../context/TodoContext";

const AddTodoDialog = ({ isSubmit, setIsSubmit, setIsAddOpen}) => {
    const [ taskName, setTaskName ] = useState("")
    const [ difficulty, setDifficulty ] = useState(1)
    const [ reward, setReward ] = useState(1)
    const [ memo, setMemo ] = useState("")

    const { createTodo } = useTodoActions()
// IDや日付部分もcreatetodoでラップできそう
    useEffect(() => {
        if(isSubmit == false) return 
        const newTodo = {
            id: uuidv4,
            userId: 1,
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo,
            isCompleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        const handleCreateTodo = async (newTodo) => {
            try {
                createTodo(newTodo)
                setIsAddOpen(false)
            } catch (error){
                alert(error.message)
            } finally {
                setIsSubmit(false)
            }
        }
        handleCreateTodo(newTodo)
        }, [isSubmit])

    return (
        <TodoForm
            taskName={taskName} setTaskName={setTaskName}
            difficulty={difficulty} setDifficulty={setDifficulty}
            reward={reward} setReward={setReward}
            memo={memo} setMemo={setMemo}   />
    )
} 

export default AddTodoDialog