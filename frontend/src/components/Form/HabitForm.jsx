import { VStack } from "@chakra-ui/react"

import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import RewardField from "../field/RewardField";
import FrequencyField from "../field/FrequencyField";
import MemoField from "../field/MemoField";

const HabitForm = ({ habitForm, setHabitForm }) => {
    
    const difficultyReward = {
        1: 1,    
        2: 2,    
        3: 4,    
        4: 7,   
        5: 12   
    }

    const handleDifficultyChange = (e) => {
        const newDifficulty = e.value
        setHabitForm(prev => ({
            ...prev,
            difficulty: newDifficulty,
            reward: difficultyReward[newDifficulty],
        }));
    }
    
    const updateField = (field, value) => {
        setHabitForm(prev => ({
        ...prev,
        [field]: value,
        }));
    };

    return (
        <VStack align="start">
            <TaskNameField
                taskName={habitForm.taskName}
                onChange={(value) => updateField("taskName", value)}
            />
            <DifficultyField 
                value={habitForm.difficulty}
                onChange={handleDifficultyChange}/>
            <RewardField
                reward={habitForm.reward}
                onChange={(value) => updateField("reward", value)}
            />
            <FrequencyField
                weekdays={habitForm.weekdays}
                onChange={(value) => updateField("weekdays", value)}
            />
            <MemoField
                memo={habitForm.memo}
                onChange={(value) => updateField("memo", value)}
            />
        </VStack>
    )
} 

export default HabitForm