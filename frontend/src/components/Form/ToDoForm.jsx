import { VStack } from "@chakra-ui/react"

import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import RewardField from "../field/RewardField";
import MemoField from "../field/MemoField";

const TodoForm = ({ taskName, setTaskName, difficulty, setDifficulty, reward, setReward, memo, setMemo }) => {
    
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
        <VStack 
            align="start"
            >
            <TaskNameField taskName={taskName} setTaskName={setTaskName}/>
            <DifficultyField difficulty={difficulty} handleDifficultyChange={handleRatingChange}/>
            <RewardField reward={reward} setReward={setReward}/>
            <MemoField memo={memo} setMemo={setMemo}/>
        </VStack>
    )
} 

export default TodoForm