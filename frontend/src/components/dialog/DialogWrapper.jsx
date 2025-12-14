import { useParams, useNavigate } from "react-router-dom";
import { Dialog, Portal } from "@chakra-ui/react"
import AddTodoDialog from "./AddTodoDialog";
// import AddHabitDialog from "./AddHabitDialog";
// import AddRewardDialog from "./AddRewardDialog"


const DialogWrapper = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    const handleClose = () => navigate(-1);

    return (
        <>
            <Dialog.Root 
            open={true} 
            onOpenChange={handleClose}
            placement="center" size="cover"
            motionPreset="none"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content >
                            {type === "todo" && <AddTodoDialog />}
                            {/* {type === "habit" && <AddHabitDialog />}
                            {type === "reward" && <RewardDialog />} */}
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default DialogWrapper