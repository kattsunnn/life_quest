import { HStack, Checkbox, Spacer } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import ItemIcon from "./ItemIcon"

const Todo = ({ name, coin }) => {

    return (
        <HStack
            width="100%"
            p="5"
            bg="white"
            borderRadius="xl"
            border="solid"
            borderColor="gray.200"
            borderWidth="1px"
            // gap="5"
            >
            <Checkbox.Root variant="subtle" colorPalette="green">
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{name}</Checkbox.Label>
            </Checkbox.Root>
            <Spacer />
            <ItemIcon icon={FaCoins} color="gold" count={coin} ></ItemIcon>
        </HStack>
    )
}

export default Todo;