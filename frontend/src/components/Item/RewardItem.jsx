import { useRewardActions } from "../../context/rewardContext"
import { useUserActions } from "../../context/userContext"
import { HStack, Text, Spacer } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import PriceButton from "../PriceButton"
import TicketButton from "../TicketButton"

const RewardItem = ({ reward, handleEdit }) => {

    return (
        <HStack
            width="100%"
            px="5" py="3"
            bg="white"
            borderRadius="xl"
            border="solid"
            borderColor="gray.200"
            borderWidth="1px"
            onClick={handleEdit}
            // gap="5"
            >
            <Text textStyle="sm" fontWeight="medium" truncate>{reward.name}</Text>
            <Spacer />
            <PriceButton price={reward.price}></PriceButton>
            <TicketButton difficulty={reward.difficulty}/>
            <></>
        </HStack>
    )
}

export default RewardItem;