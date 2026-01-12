import { useRewardActions } from "../../context/rewardContext"
import { HStack, Text, Spacer } from "@chakra-ui/react"
import PriceButton from "../PriceButton"
import TicketButton from "../TicketButton"

const RewardItem = ({ reward, handleEdit }) => {

    const { editReward } = useRewardActions()

    const setIsPurchased = async() => {
        try {
            await editReward(reward.id, {isPurchased: true})
        } catch(error) {
            alert(error.message)
            console.log(error)
        }
    }

    return (
        <HStack
            width="100%"
            px="5" py="3"
            bg="white"
            borderRadius="xl"
            border="solid"
            borderColor="gray.200"
            borderWidth="1px"
            overflow="hidden"
            onClick={handleEdit}
            // gap="5"
            >
            <Text textStyle="sm" fontWeight="medium" truncate>{reward.name}</Text>
            <Spacer />
            <PriceButton price={reward.price} handleEdit={setIsPurchased}></PriceButton>
            <TicketButton difficulty={reward.difficulty} handleEdit={setIsPurchased} />
        </HStack>
    )
}

export default RewardItem