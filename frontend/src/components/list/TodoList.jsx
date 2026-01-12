import { useTodoActions } from "../../context/TodoContext";
import { useNavigate } from "react-router-dom";
import { Accordion, Flex } from "@chakra-ui/react"

import AccordionSection from "./AcoordionSection";
import TodoItem from "../Item/TodoItem"

const TodoList = () => {

    const { getCompletedTodayTodos, getCompletedPastTodos, getIncompletedTodos } = useTodoActions();
    const completedTodos = getCompletedTodos();
    const incompletedTodos = getIncompletedTodos();
    
    const navigate = useNavigate();
    
    const handleEdit = (data) => {
        navigate(`/static/edit/todo`, { state: { editData: data } });
    }

    return (
        <>
            <Accordion.Root collapsible multiple defaultValue={["todos"]}>
                <AccordionSection value="todos" title="Todo">
                    <Flex
                        direction="column"
                        gap="1">
                        {incompletedTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                handleEdit={() => handleEdit(todo)}
                                />
                        ))}
                    </Flex>
                </AccordionSection>
                <AccordionSection value="completed_today" title="達成済み（今日）">
                    <Flex
                        direction="column"
                        gap="1">
                        {completedTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                handleEdit={() => handleEdit(todo)}
                            />
                    ))}
                    </Flex>
                </AccordionSection>
                <AccordionSection value="completed_past" title="達成済み（過去）">
                    <Flex
                        direction="column"
                        gap="1">
                        {completedTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                handleEdit={() => handleEdit(todo)}
                            />
                    ))}
                    </Flex>
                </AccordionSection>
            </Accordion.Root>
        </>
    )
}

export default TodoList