import { useState } from "react"
import { useTodoActions } from "../../context/todoContext";
import { useUserActions } from "../../context/userContext"
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import EditTodoDialog from "./EditTodoDialog"


const EditDialog = ({ isEditOpen, setIsEditOpen, activeTab, editData }) => {

    const [ isSubmit, setIsSubmit ] = useState(false);
    const { deleteTodo } = useTodoActions()
    const { subCoins } = useUserActions()

    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(editData.id)
            if (editData.isCompleted) {
                await subCoins(editData.reward)
            }      
            setIsEditOpen(false)
        } catch (error){
            alert(error.message)
        } 
    }

    const activelist = {
        "todo": "Todo",
        "habit": "習慣",
        "reward": "ご褒美"
    }

    const renderDialog = () => {
        switch(activeTab) {
            case "todo":
                return <EditTodoDialog 
                            isSubmit={isSubmit} setIsSubmit={setIsSubmit}
                            setIsEditOpen={setIsEditOpen} editData={editData}/>
            case "habit":
                return <HabitDialog isSubmit={isSubmit} setIsSubmit={setIsSubmit} setIsEditOpen={setIsEditOpen}/>
            case "reward":
                // return <RewardDialog isSubmit={isSubmit} setIsSubmit={setIsSubmit} setIsEditOpen={setIsEditOpen}/>
            default:
                return null
        }
    }

    return (
        <>
            <Dialog.Root 
                open={isEditOpen} 
                onOpenChange={(e) => {
                    setIsEditOpen(e.open)
                }}
                placement="center" size="cover"
                motionPreset="none"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content >
                            <Dialog.Header >
                                <Dialog.Title>{activelist[activeTab]}の編集</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body
                                overflow="auto"
                                >
                                {renderDialog()}
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">キャンセル</Button>
                                </Dialog.ActionTrigger>

                                <Button 
                                    bg="red.500"
                                    onClick={() => handleDeleteTodo()}
                                    >
                                    削除
                                </Button>
                                <Button 
                                    bg="green.500"
                                    onClick={() => setIsSubmit(true)}
                                    >
                                    編集
                                </Button>
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

export default EditDialog;