import { Field, HStack, NumberInput } from "@chakra-ui/react"
import { FaCoins } from "react-icons/fa";

const PriceField = ({ reward, setReward }) => {

    return (

        <Field.Root >
            <Field.Label>価格</Field.Label>
                <HStack>
                <FaCoins color="gold"/>
                <NumberInput.Root 
                    value={reward}
                    onValueChange={(e) => setReward(e.valueAsNumber)}
                    width="200px">
                    <NumberInput.Control />
                    <NumberInput.Input />
                </NumberInput.Root>
                </HStack>
        </Field.Root>
    )
}

export default PriceField