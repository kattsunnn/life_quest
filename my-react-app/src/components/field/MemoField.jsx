import { Field, Textarea } from "@chakra-ui/react"

const MemoField = ({ memo, setMemo }) => {
    
    return (
        <Field.Root >
            <Field.Label>メモ</Field.Label>
            <Textarea
                variant="subtle"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                />
        </Field.Root>
    )
}

export default MemoField