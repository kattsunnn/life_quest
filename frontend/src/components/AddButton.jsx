import { useNavigate, useLocation } from "react-router-dom";
import { HStack, Spacer, IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddButton = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const activeTab =  location.pathname.split("/")[2]

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
                    onClick={() => navigate(`/static/add/${activeTab}`)}
                    >
                    <FaPlus />
                </IconButton>
            </HStack>
        </>
    )
}

export default AddButton;