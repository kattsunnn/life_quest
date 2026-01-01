import { useState } from "react" 
import { useTodoActions } from "../../context/TodoContext";
import { Button, CloseButton, Dialog } from "@chakra-ui/react"
import TodoForm from "../form/TodoForm";

const AddTodoDialog = () => {
    const [ todoForm, setTodoForm ] = useState(() => ({
        taskName:"",
        difficulty:1,
        reward:1,
        memo:""
    }))
    const { createTodo } = useTodoActions()

    const handleCreateTodo = async () => {
        try {
            await createTodo(todoForm)
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
                <TodoForm todoForm={todoForm} setTodoForm={setTodoForm}  />
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