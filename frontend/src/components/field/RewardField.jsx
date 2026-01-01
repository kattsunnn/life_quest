import { Field, HStack, NumberInput } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa";

const RewardField = ({ reward, onChange }) => {

    return (

        <Field.Root >
            <Field.Label>報酬</Field.Label>
                <HStack>
                <FaCoins color="gold"/>
                <NumberInput.Root 
                    min={1}
                    value={reward}
                    onValueChange={(e) => onChange(e.valueAsNumber)}
                    width="200px">
                    <NumberInput.Control />
                    <NumberInput.Input />
                </NumberInput.Root>
                </HStack>
        </Field.Root>
    )
}

export default RewardField