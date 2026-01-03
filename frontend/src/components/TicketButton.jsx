import { Button, HStack, Text } from "@chakra-ui/react"
import { FaTicketAlt } from "react-icons/fa"

    const DIFFICULTY_COLOR_MAP = {
    1: "khaki",
    2: "peru",
    3: "silver",
    4: "gold",
    5: "turquoise",
    }

const TicketButton = ({difficulty}) => {

    const difficultyColor = DIFFICULTY_COLOR_MAP[difficulty]

    return(
    <Button
      size="sm"
      bg={difficultyColor}
      p={2}
      m={0}
    >
        <FaTicketAlt />
    </Button>
    )
}

export default TicketButton
