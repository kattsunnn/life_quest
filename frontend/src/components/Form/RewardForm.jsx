import { VStack } from "@chakra-ui/react"
import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import RewardField from "../field/RewardField";
import MemoField from "../field/MemoField";

const RewardForm = ({ rewardForm, setRewardForm }) => {
    
    const difficultyPrice = {
        1: 1,    
        2: 2,    
        3: 4,    
        4: 7,   
        5: 12   
    }

    const handleDifficultyChange = (newDifficulty) => {
        setRewardForm(prev => ({
            ...prev,
            difficulty:newDifficulty,
            price:difficultyPrice[newDifficulty],
        }))
    }

    const updateField = (field, value) => {
        setRewardForm(prev => ({
        ...prev,
        [field]: value,
        }));
    };

    return (
        <VStack 
            align="start"
            >
            <TaskNameField taskName={rewardForm.name} onChange={(value) => {updateField("name", value)}}/>
            <DifficultyField difficulty={rewardForm.difficulty} onChange={handleDifficultyChange}/>
            <RewardField reward={rewardForm.price} onChange={(value) => {updateField("price", value)}}/>
            <MemoField memo={rewardForm.memo} onChange={(value) => {updateField("memo", value)}}/>
        </VStack>
    )
} 

export default RewardForm