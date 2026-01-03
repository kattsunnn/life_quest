import { useState } from "react" 
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import { useRewardActions } from "../../context/rewardContext";
import RewardForm from "../form/RewardForm";

const EditRewardDialog = ({editData}) => {
    const [ rewardForm, setRewardForm ] = useState(() => ({
        name:editData.name,
        difficulty:editData.difficulty,
        price:editData.price,
        memo:editData.memo,
    }))
    const { editReward, deleteReward } = useRewardActions()

    const handleDeleteReward = async () => {
        try {
            await deleteReward(editData.id)
        } catch (error){
            alert(error.message)
        } 
    }

    const handleEditReward = async () => {
        try {
            await editReward(editData.id, rewardForm)
        } catch (error){
            alert(error.message)
        } 
    }

    return (
        <>
            <Dialog.Header >
                <Dialog.Title>ご褒美の編集</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
                overflow="auto"
                >
                <RewardForm rewardForm={rewardForm} setRewardForm={setRewardForm} />
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline">キャンセル</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                    <Button 
                        bg="red.500"
                        onClick={handleDeleteReward}
                        >
                        削除
                    </Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                    <Button 
                        bg="green.500"
                        onClick={handleEditReward}
                        >
                        編集
                    </Button>
                </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>

        </>
    )
} 

export default EditRewardDialog