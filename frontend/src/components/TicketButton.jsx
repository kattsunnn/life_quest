import { Button } from "@chakra-ui/react"
import { FaTicketAlt } from "react-icons/fa"
import { useUserActions } from "../context/userContext"

const DIFFICULTY_COLOR_MAP = {
    1: "khaki",
    2: "peru",
    3: "silver",
    4: "gold",
    5: "turquoise",
}

const TicketButton = ({ difficulty, isPurchasable, handlePurchase }) => {

    const difficultyColor = DIFFICULTY_COLOR_MAP[difficulty]

    return(
    <Button
      size="sm"
      variant={isPurchasable ? "outline" : "surface"}
      disabled={!isPurchasable}
      p={2}
      m={0}
      onClick={(e) => {
        e.stopPropagation()
        handlePurchase()
        }}
    >
        <FaTicketAlt color={difficultyColor} />
    </Button>
    )
}

export default TicketButton
