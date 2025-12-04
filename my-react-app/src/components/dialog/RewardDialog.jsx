import { VStack } from "@chakra-ui/react"
import { useState } from "react"

import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import PriceField from "../field/PriceField";
import MemoField from "../field/MemoField";

const RewardDialog = ({ isSubmit }) => {
    const [ taskName, setTaskName ] = useState("")
    const [ rating, setRating ] = useState(1)
    const [ price, setPrice ] = useState(0)
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
            <PriceField price={price} setPrice={setPrice}/>
            <MemoField memo={memo} setMemo={setMemo}/>
        </VStack>
    )
} 

export default RewardDialog