import { useState } from "react"
import AddDialog from './dialog/AddDialog'
import { HStack, Spacer, IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ activeTab }) => {

    const [ isAddOpen, setIsAddOpen ] = useState(false)

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

            <AddDialog isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} activeTab={activeTab}/>
        </>
    )
}

export default AddButton;