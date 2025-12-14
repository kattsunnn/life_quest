import { useState } from "react" 
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import { useTodoActions } from "../../context/TodoContext";
import { useUserActions } from "../../context/userContext";
import TodoForm from "../form/TodoForm";

const EditTodoDialog = ({editData}) => {
    const [ taskName, setTaskName ] = useState(editData.taskName)
    const [ difficulty, setDifficulty ] = useState(editData.difficulty)
    const [ reward, setReward ] = useState(editData.reward)
    const [ memo, setMemo ] = useState(editData.memo)

    const { editTodo, deleteTodo } = useTodoActions()
    const { subCoins } = useUserActions()

    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(editData.id)
            if (editData.isCompleted) {
                await subCoins(editData.reward)
            }      
        } catch (error){
            alert(error.message)
        } 
    }

    const handleEditTodo = async () => {
        const todoUpdates = {
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo,
        }
        try {
            await editTodo(editData.id, todoUpdates)
        } catch (error){
            alert(error.message)
        } 
    }

    return (
        <>
            <Dialog.Header >
                <Dialog.Title>Todoの編集</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
                overflow="auto"
                >
                <TodoForm
                    taskName={taskName} setTaskName={setTaskName}
                    difficulty={difficulty} setDifficulty={setDifficulty}
                    reward={reward} setReward={setReward}
                    memo={memo} setMemo={setMemo}   />
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline">キャンセル</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                    <Button 
                        bg="red.500"
                        onClick={handleDeleteTodo}
                        >
                        削除
                    </Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                    <Button 
                        bg="green.500"
                        onClick={handleEditTodo}
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

export default EditTodoDialog