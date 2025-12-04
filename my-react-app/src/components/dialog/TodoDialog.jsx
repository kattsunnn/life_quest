import { VStack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import todoApi from "../../api/todo";
import { v4 as uuidv4 } from 'uuid'
import { useDispatchtodo, validateTodo } from "../../context/TodoContext";

import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import RewardField from "../field/RewardField";
import MemoField from "../field/MemoField";

const TodoDialog = ({ isSubmit, setIsSubmit, setAddOpen}) => {
    const dispatch = useDispatchtodo();
    const [ taskName, setTaskName ] = useState("")
    const [ difficulty, setDifficulty ] = useState(1)
    const [ reward, setReward ] = useState(1)
    const [ memo, setMemo ] = useState("")

    useEffect(() => {
        if(isSubmit == false) return 
        const newTodo = {
            id: uuidv4(),
            userId: 1,
            name: taskName,
            difficulty: difficulty,
            reward: reward
        }
        const submitTodo = async () => {
            try {
                validateTodo(newTodo)
                const todoData = await todoApi.post(newTodo)  // ここで待機
                dispatch({ type: "todo/add", todo: todoData})
                setAddOpen(false)
            } catch (error){
                alert(error.message)
            } finally {
                setIsSubmit(false)
            }
        }
        submitTodo()
        }, [isSubmit])
    
    const difficultyReward = {
        1: 1,    
        2: 2,    
        3: 4,    
        4: 7,   
        5: 12   
    }

    const handleRatingChange = (e) => {
        const newDifficulty = e.value
        setDifficulty(newDifficulty)
        setReward(difficultyReward[newDifficulty])
    }

    return (
        <VStack align="start">
            <TaskNameField taskName={taskName} setTaskName={setTaskName}/>
            <DifficultyField difficulty={difficulty} handleDifficultyChange={handleRatingChange}/>
            <RewardField reward={reward} setReward={setReward}/>
            <MemoField memo={memo} setMemo={setMemo}/>
        </VStack>
    )
} 

export default TodoDialog