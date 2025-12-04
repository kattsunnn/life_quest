import { Flex, Heading, Spacer, Button } from "@chakra-ui/react";

export default function Header() {

    const username = "kattsun";

    return (
        <>
            <Flex
                width="100%"
                p="3"
                bg="green.600"
                boxShadow="md"
                >
                <Heading 
                    size="2xl"
                    color="white"
                    // p="2"
                    >
                    LifeQuest
                </Heading>
                <Spacer />
                <Button
                    bg="green.600"
                    color="white"
                    fontWeight="bold"
                    p="5"
                    border="2px solid white"
                    borderRadius="full">
                    {username}
                </Button>
            </Flex>
        </>
    );
}