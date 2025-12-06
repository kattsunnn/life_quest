import { useState, useEffect } from "react" 
import todoApi from "../../api/todo";
import { useDispatchtodo, validateTodo } from "../../context/TodoContext";

import TodoForm from "../form/TodoForm";

const EditTodoDialog = ({ isSubmit, setIsSubmit, setIsEditOpen, editData}) => {
    const [ taskName, setTaskName ] = useState(editData.taskName)
    const [ difficulty, setDifficulty ] = useState(editData.difficulty)
    const [ reward, setReward ] = useState(editData.reward)
    const [ memo, setMemo ] = useState(editData.memo)

    const dispatch = useDispatchtodo();

    useEffect(() => {
        if(isSubmit == false) return 
        const newTodo = {
            id: editData.id,
            userId: 1,
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo
        }
        const editTodo = async (newTodo) => {
            try {
                validateTodo(newTodo)
                const todoData = await todoApi.patch(newTodo)
                dispatch({ type: "todo/patch", todo: todoData})
                setIsEditOpen(false)
            } catch (error){
                alert(error.message)
            } finally {
                setIsSubmit(false)
            }
        }
        editTodo(newTodo)
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