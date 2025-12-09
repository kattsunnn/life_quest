import { Field, Input } from "@chakra-ui/react"

const TaskNameField = ({ taskName, setTaskName }) => {
    
    return (
        <Field.Root >
            <Field.Label>タスク名</Field.Label>
            <Input 
                variant="subtle"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                />
        </Field.Root>
    )
}

export default TaskNameField