import { useTodo, useTodoActions } from "../../context/TodoContext";
import { useNavigate } from "react-router-dom";
import { Accordion, Flex } from "@chakra-ui/react"
import {
  ButtonGroup,
  For,
  IconButton,
  Pagination,
  Stack,
  Center
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"


import AccordionSection from "./AcoordionSection";
import TodoItem from "../Item/TodoItem"

const TodoList = () => {

    const todos = useTodo()
    const { paginateCompletedPastTodos } = useTodoActions()
    
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
                        gap="1"
                        aline="center">
                        {todos.incompleted.map((todo) => (
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
                        {todos.completedToday.map((todo) => (
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
                        gap="1"
                        >
                        {todos.completedPast.todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                handleEdit={() => handleEdit(todo)}
                            />
                        ))}
                    <Center>
                        <Pagination.Root    
                            defaultPage={1} 
                            count={todos.completedPast.totalCount}
                            pageSize={todos.completedPast.limit}
                            onPageChange={(e) => paginateCompletedPastTodos(e.page)} >
                            <ButtonGroup variant="ghost" size="xs">
                                <Pagination.PrevTrigger asChild>
                                    <IconButton>
                                        <LuChevronLeft />
                                    </IconButton>
                                </Pagination.PrevTrigger>

                                <Pagination.Items
                                render={(page) => (
                                    <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                                    {page.value}
                                    </IconButton>
                                )}
                                />

                                <Pagination.NextTrigger asChild>
                                    <IconButton>
                                        <LuChevronRight />
                                    </IconButton>
                                </Pagination.NextTrigger>
                            </ButtonGroup>
                        </Pagination.Root>
                        </Center>
                        </Flex>
                    </AccordionSection>
                </Accordion.Root>
            </>
        )
    }

    export default TodoList
