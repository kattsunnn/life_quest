import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TabPanel = () => {
    
    return (
        <>
            <Flex
                direction="column"
                px="5"
                pt="5"
                pb="20"
                flex="1"
                gap="1"
                overflow="scroll"
                align="center"
                bg="gray.100"
                >
                <Outlet />
            </Flex>
        </>
    )
}

export default TabPanel;