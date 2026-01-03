import { Button, HStack, Text } from "@chakra-ui/react"
import { FaTicketAlt } from "react-icons/fa"
import { useUserActions } from "../context/userContext"

    const DIFFICULTY_COLOR_MAP = {
    1: "khaki",
    2: "peru",
    3: "silver",
    4: "gold",
    5: "turquoise",
    }

const TicketButton = ({ difficulty, handleDelete }) => {
    
    const { hasEnoughTickets, subTickets } = useUserActions();
    
    const difficultyColor = DIFFICULTY_COLOR_MAP[difficulty]

    const handlePurchase = async(e) => {
        e.stopPropagation()
        try {
            if(!hasEnoughTickets(difficulty)) return
            await subTickets( difficulty, 1 )
            handleDelete()
        } catch(error) {
            alert(error.message)
            console.log(error)
        }
    }


    return(
    <Button
      size="sm"
      variant={hasEnoughTickets(difficulty) ? "outline" : "surface"}
      disabled={!hasEnoughTickets(difficulty)}
      p={2}
      m={0}
      onClick={handlePurchase}
    >
        <FaTicketAlt color={difficultyColor} />
    </Button>
    )
}

export default TicketButton
