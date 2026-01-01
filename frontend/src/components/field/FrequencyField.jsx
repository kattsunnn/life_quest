import { useState } from "react"
import { Field, VStack, SegmentGroup } from "@chakra-ui/react"
import WeekdaySelector from "./WeekdaySelector"

const FrequencyField = ({weekdays, onChange}) => {

    const [ frequency, setFrequency ] = useState("毎日")

    return (
        <Field.Root >
            <Field.Label>頻度</Field.Label>
            <VStack gap="3" w="100%" align="start">
                <SegmentGroup.Root 
                    value={frequency}
                    onValueChange={(e) => setFrequency(e.value)}
                    css={{
                        "--segment-indicator-bg": "colors.green.500",
                        "--segment-indicator-shadow": "shadow.md",
                    }}
                    >
                    <SegmentGroup.Indicator />
                    <SegmentGroup.Items items={["毎日", "毎週"]} />
                </SegmentGroup.Root>
                {frequency === "毎週" && <WeekdaySelector weekdays={weekdays} onChage={onChage}/>}
            </VStack>
        </Field.Root>
    )
}

export default FrequencyField