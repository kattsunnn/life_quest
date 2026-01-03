import { Button, HStack, Text } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa"

const PriceButton = ({price}) => {
    return(
    <Button
      size="sm"
      bg="gold"
      p={2}
    >
      <HStack>
        <FaCoins />
        <Text>×{price}</Text>
      </HStack>
    </Button>
    )
}

export default PriceButton