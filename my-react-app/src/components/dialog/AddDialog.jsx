import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react"
import AddTodoDialog from "./AddTodoDialog"
import HabitDialog from "./HabitDialog"
import RewardDialog from "./RewardDialog"

const AddDialog = ({ isAddOpen, setIsAddOpen, activeTab }) => {

    const [ isSubmit, setIsSubmit ] = useState(false);

    const activelist = {
        "todo": "Todo",
        "habit": "習慣",
        "reward": "ご褒美"
    }

    const renderDialog = () => {
        switch(activeTab) {
            case "todo":
                return <AddTodoDialog isSubmit={isSubmit} setIsSubmit={setIsSubmit} setIsAddOpen={setIsAddOpen}/>
            case "habit":
                return <HabitDialog isSubmit={isSubmit} setIsSubmit={setIsSubmit} setAddOpen={setIsAddOpen}/>
            case "reward":
                return <RewardDialog isSubmit={isSubmit} setIsSubmit={setIsSubmit} setAddOpen={setIsAddOpen}/>
            default:
                return null
        }
    }

    return (
        <>
            <Dialog.Root 
            open={isAddOpen} 
            onOpenChange={(e) => {
                setIsAddOpen(e.open)
            }}
            placement="center" size="cover"
            motionPreset="none"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content >
                            <Dialog.Header >
                                <Dialog.Title>{activelist[activeTab]}の作成</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                {renderDialog()}
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">キャンセル</Button>
                                </Dialog.ActionTrigger>
                                <Button 
                                    bg="green.500"
                                    onClick={() => setIsSubmit(true)}
                                    >作成</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default AddDialog;