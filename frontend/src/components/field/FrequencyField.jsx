import { useState, useEffect } from "react"
import { Field, VStack, SegmentGroup } from "@chakra-ui/react"
import WeekdaySelector from "./WeekdaySelector"

const FrequencyField = ({weekdays, onChange}) => {
    const [ frequency, setFrequency ] = useState("")

    useEffect(() => {
        if (!weekdays) return
        const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
        const isEveryday = days.every(d => weekdays[d] === true)
        if (isEveryday) setFrequency("毎日")
        else  setFrequency("毎週")
    }, [weekdays])

    const handleChangeFrequency = (newFrequency) => {
        if(newFrequency == "毎週"){
            onChange({  monday:false, tuesday:false, wednesday:false, 
                        thursday:false, friday:false, saturday:false, sunday:false})
        }
        if(newFrequency == "毎日"){
            onChange({  monday:true, tuesday:true, wednesday:true, 
                        thursday:true, friday:true, saturday:true, sunday:true})
        }
        setFrequency(newFrequency)
    }

    return (
        <Field.Root >
            <Field.Label>頻度</Field.Label>
            <VStack gap="3" w="100%" align="start">
                <SegmentGroup.Root 
                    value={frequency}
                    onValueChange={(e) => handleChangeFrequency(e.value)}
                    css={{
                        "--segment-indicator-bg": "colors.green.500",
                        "--segment-indicator-shadow": "shadow.md",
                    }}
                    >
                    <SegmentGroup.Indicator />
                    <SegmentGroup.Items items={["毎日", "毎週"]} />
                </SegmentGroup.Root>
                {frequency === "毎週" && <WeekdaySelector weekdays={weekdays} onChange={onChange}/>}
            </VStack>
        </Field.Root>
    )
}

export default FrequencyField