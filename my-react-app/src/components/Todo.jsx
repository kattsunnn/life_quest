import todoApi from "../api/todo"
import { useDispatchtodo } from "../context/TodoContext"
import userApi from "../api/user"
import { useUserActions } from "../context/userContext"
import { HStack, Checkbox, Spacer } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import ItemIcon from "./ItemIcon"

const Todo = ({ todo, handleEdit }) => {
    const dispatchTodo = useDispatchtodo()
    const { addCoins, subCoins } = useUserActions()

    const handleCheckboxChange = async (checked) => {
        const updatedTodo = {
            ...todo,
            isCompleted: checked.checked,
            updatedAt: new Date().toISOString()
        }
        
        try {
            const todoData = await todoApi.patch(updatedTodo)
            dispatchTodo({ type: "todo/patch", todo: todoData})
            if(checked.checked){
                await addCoins(todo.reward)
            } else {
                await subCoins(todo.reward)
            }
        } catch (error) {
            alert('更新に失敗しました:' + error.message)
            console.log(error)
        }
    }

    return (
        <HStack
            width="100%"
            p="5"
            bg="white"
            borderRadius="xl"
            border="solid"
            borderColor="gray.200"
            borderWidth="1px"
            _hover={{ bg: "gray.100" }}
            onClick={handleEdit}
            // gap="5"
            >
            <Checkbox.Root 
                variant="subtle"
                colorPalette="green"
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={handleCheckboxChange}
                >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label
                textDecoration={todo.isCompleted ? "line-through" : "none"}
                color={todo.isCompleted ? "gray.500" : "inherit"}
            >
                    {todo.taskName}
            </Checkbox.Label>
            </Checkbox.Root>
            <Spacer />
            <ItemIcon icon={FaCoins} color="gold" count={todo.reward} ></ItemIcon>
        </HStack>
    )
}

export default Todo;