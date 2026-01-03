import { useState } from "react" 
import { useRewardActions } from "../../context/rewardContext";
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import RewardForm from "../form/RewardForm";

const AddRewardDialog = () => {
    const [ rewardForm, setRewardForm ] = useState(() => ({
        name:"",
        difficulty:1,
        price:1,
        memo:""
    }))
    const { createReward } = useRewardActions()

    const handleCreateReward = async () => {
        try {
            await createReward(rewardForm)
        } catch (error){
            alert(error.message)
        }
    }

    return (
        <>
            <Dialog.Header >
                <Dialog.Title>ご褒美の作成</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <RewardForm rewardForm={rewardForm} setRewardForm={setRewardForm}  />
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline">キャンセル</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                    <Button 
                        bg="green.500"
                        onClick={handleCreateReward}
                        >作成</Button>
                </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>
        </>
    )
} 

export default AddRewardDialog