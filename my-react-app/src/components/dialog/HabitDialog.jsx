import { VStack } from "@chakra-ui/react"
import { useState } from "react"

import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import RewardField from "../field/RewardField";
import FrequencyField from "../field/FrequencyField";
import MemoField from "../field/MemoField";

const HabitDialog = ({ isSubmit }) => {
    const [ taskName, setTaskName ] = useState("")
    const [ rating, setRating ] = useState(1)
    const [ reward, setReward ] = useState(0)
    const [ memo, setMemo ] = useState("")
    
    const difficultyReward = {
        1: 1,    
        2: 2,    
        3: 4,    
        4: 7,   
        5: 12   
    }

    const handleRatingChange = (e) => {
        const newRating = e.value
        setRating(newRating)
        setReward(difficultyReward[newRating])
    }

    return (
        <VStack align="start">
            <TaskNameField taskName={taskName} setTaskName={setTaskName}/>
            <DifficultyField rating={rating} handleRatingChange={handleRatingChange}/>
            <RewardField reward={reward} setReward={setReward}/>
            <FrequencyField />
            <MemoField memo={memo} setMemo={setMemo}/>
        </VStack>
    )
} 

export default HabitDialog