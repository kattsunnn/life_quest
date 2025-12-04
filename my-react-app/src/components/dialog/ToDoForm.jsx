import { VStack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'

import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import RewardField from "../field/RewardField";
import MemoField from "../field/MemoField";

const TodoForm = ({ todo = null, isSubmit, onSubmit }) => {
    const [ taskName, setTaskName ] = useState(todo?.name || "")
    const [ difficulty, setDifficulty ] = useState(todo?.difficulty || 1)
    const [ reward, setReward ] = useState(todo?.reward || 1)
    const [ memo, setMemo ] = useState(todo?.memo || "")

    useEffect(() => {
        if(isSubmit == false) return 
        const newTodo = {
            id: uuidv4(),
            userId: 1,
            name: taskName,
            difficulty: difficulty,
            reward: reward
        }
        onSubmit(newTodo)
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

export default TodoForm