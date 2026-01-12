import { useRewardActions } from "../../context/rewardContext"
import { useUserActions } from "../../context/userContext"
import { HStack, Text, Spacer } from "@chakra-ui/react"
import PriceButton from "../PriceButton"
import TicketButton from "../TicketButton"

const RewardItem = ({ reward, handleEdit }) => {

    const { subCoins, subTickets, hasEnoughCoins, hasEnoughTickets } = useUserActions();
    const { editReward } = useRewardActions()

    const handlePurchaseWithCoins = async() => {
        try {
            await editReward(reward.id, {isPurchased: true})
            await subCoins(reward.price)
        } catch(error) {
            alert(error.message)
            console.log(error)
        }
    }

    const handlePurchaseWithTicket = async() => {
        try {
            await editReward(reward.id, { isPurchased: true })
            await subTickets(reward.difficulty, 1)
        } catch (error) {
            alert('更新に失敗しました:' + error.message)
            console.log(error)
        }
    }

    const isPuchasableWithCoins = !reward.isPurchased && hasEnoughCoins(reward.price) 
    const isPurchasableWithTicket = !reward.isPurchased && hasEnoughTickets(reward.difficulty)

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
            <PriceButton price={reward.price} isPuchasable={isPuchasableWithCoins} handlePurchase={handlePurchaseWithCoins} />
            <TicketButton difficulty={reward.difficulty} isPurchasable={isPurchasableWithTicket} handlePurchase={handlePurchaseWithTicket} />
        </HStack>
    )
}

export default RewardItem