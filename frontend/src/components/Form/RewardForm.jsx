import { VStack } from "@chakra-ui/react"
import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import PriceField from "../field/PriceField";
import MemoField from "../field/MemoField";

const RewardForm = ({ taskName, setTaskName, difficulty, setDifficulty, price, setPrice, memo, setMemo }) => {
    
    const difficultyPrice = {
        1: 1,    
        2: 2,    
        3: 4,    
        4: 7,   
        5: 12   
    }

    const handleDifficultyChange = (e) => {
        const newDifficulty = e.value
        setDifficulty(newDifficulty)
        setPrice(difficultyPrice[newDifficulty])
    }

    return (
        <VStack align="start">
            <TaskNameField taskName={taskName} setTaskName={setTaskName}/>
            <DifficultyField difficulty={difficulty} handleDifficultyChange={handleDifficultyChange}/>
            <PriceField price={price} setPrice={setPrice}/>
            <MemoField memo={memo} setMemo={setMemo}/>
        </VStack>
    )
} 

export default RewardForm