import { useNavigate } from "react-router-dom";
import { HStack, Spacer, IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ activeTab }) => {

    const navigate = useNavigate();

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
                    onClick={() => navigate(`/add/${activeTab}`)}
                    >
                    <FaPlus />
                </IconButton>
            </HStack>
        </>
    )
}

export default AddButton;