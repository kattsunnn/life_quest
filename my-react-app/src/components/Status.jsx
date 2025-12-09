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
                        <ItemIcon icon={FaTicketAlt} color="peru" count={userData.tickets_peru} />
                        <ItemIcon icon={FaTicketAlt} color="silver" count={userData.tickets_silver} />
                        <ItemIcon icon={FaTicketAlt} color="gold" count={userData.tickets_gold} />
                        <ItemIcon icon={FaTicketAlt} color="plum" count={userData.tickets_plum} />
                    </HStack>
                </Flex>

        </>
    );
};
            
export default Status;