import { Flex, Text, HStack } from "@chakra-ui/react"
import { FaCoins, FaTicketAlt } from "react-icons/fa"
import ItemIcon from "./ItemIcon"
import ExpBar from "./ExpBar"
import { useUser } from "../context/userContext"

// ToDo: 中身がはみ出たら折り返す
const Status = () => {

    const userData = useUser();
    if ( Array.isArray(userData) || Object.keys(userData).length === 0 ) {
        return <></>
    }
    const DIFFICULTY_COLOR_MAP = {
        1: "khaki",
        2: "peru",
        3: "silver",
        4: "gold",
        5: "turquoise",
    }

    return (
        <>
                <Flex
                    width="100%"
                    direction="column"
                    p="5"
                    align="center"
                    gap="3"
                    overflow="hidden"
                    boxShadow="md"
                    >
                    <Text
                        fontWeight="bold" alignSelf="start">
                        {userData.name}
                    </Text>
                    <ExpBar userLevel={userData.level} userExp={userData.exp}/>
                    <ItemIcon icon={FaCoins} color="gold" count={userData.coins} />
                    <HStack gap="3">
                        <ItemIcon icon={FaTicketAlt} color={DIFFICULTY_COLOR_MAP[1]} count={userData.ticketsVeryEasy} />
                        <ItemIcon icon={FaTicketAlt} color={DIFFICULTY_COLOR_MAP[2]} count={userData.ticketsEasy} />
                        <ItemIcon icon={FaTicketAlt} color={DIFFICULTY_COLOR_MAP[3]} count={userData.ticketsNormal} />
                        <ItemIcon icon={FaTicketAlt} color={DIFFICULTY_COLOR_MAP[4]} count={userData.ticketsHard} />
                        <ItemIcon icon={FaTicketAlt} color={DIFFICULTY_COLOR_MAP[5]} count={userData.ticketsVeryHard} />
                    </HStack>
                </Flex>

        </>
    );
};
            
export default Status;