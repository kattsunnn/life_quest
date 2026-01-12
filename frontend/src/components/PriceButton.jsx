import { Button, HStack, Text } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"
import { useUserActions } from "../context/userContext"

const PriceButton = ({ price, isPuchasable, handlePurchase }) => {

    return(
    <Button
      size="sm"
      variant={isPuchasable ? "outline" : "surface"}
      disabled={!isPuchasable}
      p={2}
      onClick={(e) => {
        e.stopPropagation()
        handlePurchase()
        }}
    >
      <HStack>
        <FaCoins color="gold" />
        <Text>×{price}</Text>
      </HStack>
    </Button>
    )
}

export default PriceButton