import { HStack, Spacer, IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ isAddOpen, setIsAddOpen }) => {
    return (
        <>
            <HStack
                mx="5">
                <Spacer />
                <IconButton
                    position="fixed"
                    right="5" bottom="70px"
                    aria-label=""
                    size="xl"
                    rounded="full"
                    bg="green.600"
                    onClick={() => setIsAddOpen(true)}
                    >
                    <FaPlus />
                </IconButton>
            </HStack>
        </>
    )
}

export default AddButton;