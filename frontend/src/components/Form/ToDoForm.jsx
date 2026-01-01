import { VStack } from "@chakra-ui/react"

import TaskNameField from "../field/TaskNameField";
import DifficultyField from "../field/DifficultyField";
import RewardField from "../field/RewardField";
import MemoField from "../field/MemoField";

const TodoForm = ({ todoForm, setTodoForm }) => {
    
    const difficultyReward = {
        1: 1,    
        2: 2,    
        3: 4,    
        4: 7,   
        5: 12   
    }

    const handleDifficultyChange = (newDifficulty) => {
        setTodoForm(prev => ({
            ...prev,
            difficulty:newDifficulty,
            reward:difficultyReward[newDifficulty],
        }))
    }

    const updateField = (field, value) => {
        setTodoForm(prev => ({
        ...prev,
        [field]: value,
        }));
    };

    return (
        <VStack 
            align="start"
            >
            <TaskNameField taskName={todoForm.taskName} onChange={(value) => {updateField("taskName", value)}}/>
            <DifficultyField difficulty={todoForm.difficulty} onChange={handleDifficultyChange}/>
            <RewardField reward={todoForm.reward} onChange={(value) => {updateField("reward", value)}}/>
            <MemoField memo={todoForm.memo} onChange={(value) => {updateField("memo", value)}}/>
        </VStack>
    )
} 

export default TodoForm