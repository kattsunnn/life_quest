import { HStack, Checkbox, Spacer } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import ItemIcon from "./ItemIcon"

const Todo = ({ taskName, coin, handleEdit }) => {

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
                >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{taskName}</Checkbox.Label>
            </Checkbox.Root>
            <Spacer />
            <ItemIcon icon={FaCoins} color="gold" count={coin} ></ItemIcon>
        </HStack>
    )
}

export default Todo;