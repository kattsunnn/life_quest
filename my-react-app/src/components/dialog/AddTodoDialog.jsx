import { useState, useEffect } from "react" 
import todoApi from "../../api/todo";
import { useDispatchtodo, validateTodo } from "../../context/TodoContext";
import { v4 as uuidv4 } from 'uuid'

import TodoForm from "../form/TodoForm";

const AddTodoDialog = ({ isSubmit, setIsSubmit, setIsAddOpen}) => {
    const [ taskName, setTaskName ] = useState("")
    const [ difficulty, setDifficulty ] = useState(1)
    const [ reward, setReward ] = useState(1)
    const [ memo, setMemo ] = useState("")

    const dispatch = useDispatchtodo();

    useEffect(() => {
        if(isSubmit == false) return 
        const newTodo = {
            id: uuidv4,
            userId: 1,
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo
        }
        const addTodo = async (newTodo) => {
            try {
                validateTodo(newTodo)
                const todoData = await todoApi.post(newTodo)
                dispatch({ type: "todo/add", todo: todoData})
                setIsAddOpen(false)
            } catch (error){
                alert(error.message)
            } finally {
                setIsSubmit(false)
            }
        }
        addTodo(newTodo)
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