import { IconButton, Icon } from "@chakra-ui/react";

const TabButton = ({ icon: Ricon, isActive, onClick }) => {
    return (
        <>
            <IconButton
                aria-label=""
                size="md"
                rounded="full"
                variant="plain"
                onClick={onClick}
                >
                <Icon color={isActive ? "white" : "green.200" }>
                    <Ricon />
                </Icon>
            </IconButton>
        </>
    );
}

export default TabButton;