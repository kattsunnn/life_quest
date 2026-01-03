import { Button, HStack, Text } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import { useUserActions } from "../context/userContext"


const PriceButton = ({ price, handleDelete }) => {

    const { hasEnoughCoins, subCoins } = useUserActions();

    const handlePurchase = async(e) => {
      e.stopPropagation();
      try {
        await subCoins(price)
        handleDelete()
      } catch (error) {
        alert('更新に失敗しました:' + error.message)
        console.log(error)
      }
    }

    return(
    <Button
      size="sm"
      variant={hasEnoughCoins(price) ? "outline" : "surface"}
      disabled={!hasEnoughCoins(price)}
      p={2}
      onClick={handlePurchase}
    >
      <HStack>
        <FaCoins color="gold" />
        <Text>×{price}</Text>
      </HStack>
    </Button>
    )
}

export default PriceButton