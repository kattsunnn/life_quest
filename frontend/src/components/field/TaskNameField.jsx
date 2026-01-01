import { Field, Input } from "@chakra-ui/react"

const TaskNameField = ({ taskName, onChange }) => {
    
    return (
        <Field.Root >
            <Field.Label>タスク名</Field.Label>
            <Input 
                variant="subtle"
                value={taskName}
                onChange={(e) => onChange(e.target.value)}
                />
        </Field.Root>
    )
}

export default TaskNameField