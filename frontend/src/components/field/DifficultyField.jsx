import { Field, RatingGroup } from "@chakra-ui/react"

const DifficultyField = ({ difficulty, onChange }) => {

    const difficultyText = {
        1: "非常に簡単",
        2: "簡単",
        3: "普通",
        4: "難しい",
        5: "非常に難しい"
    }

    return (
        <Field.Root>
            <Field.Label>難易度： {difficultyText[difficulty]}</Field.Label>
            <RatingGroup.Root
                value={difficulty} 
                onValueChange={(e) => onChange(e.value)}
                size="lg" colorPalette="red">
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
            </RatingGroup.Root>
        </Field.Root>
    )
}

export default DifficultyField