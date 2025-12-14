import { useState } from "react" 
import { useTodoActions } from "../../context/TodoContext";
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import TodoForm from "../form/TodoForm";

const AddTodoDialog = () => {
    const [ taskName, setTaskName ] = useState("")
    const [ difficulty, setDifficulty ] = useState(1)
    const [ reward, setReward ] = useState(1)
    const [ memo, setMemo ] = useState("")

    const { createTodo } = useTodoActions()

    const handleCreateTodo = async () => {
        const newTodo = {
            taskName: taskName,
            difficulty: difficulty,
            reward: reward,
            memo: memo,
        }
        try {
            await createTodo(newTodo)
        } catch (error){
            alert(error.message)
        }
    }

    return (
        <>
            <Dialog.Header >
                <Dialog.Title>Todoの作成</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
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
                        bg="green.500"
                        onClick={handleCreateTodo}
                        >作成</Button>
                </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>
        </>
    )
} 

export default AddTodoDialog