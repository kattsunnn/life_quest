import { useTodoActions } from "../../context/TodoContext"
import { useUserActions } from "../../context/userContext"
import { HStack, Checkbox, Spacer } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import ItemIcon from "../ItemIcon"

const TodoItem = ({ todo, handleEdit }) => {
    const { editTodo } = useTodoActions();
    const { addCoins, subCoins } = useUserActions()

    const handleCheckboxChange = async (checked) => {
        const todoUpdates = {
            isCompleted: checked.checked,
        }
        try {
            await editTodo(todo.id, todoUpdates)
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
                checked={todo.isCompleted}
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

export default TodoItem;