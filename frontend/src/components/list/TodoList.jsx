import { useTodo } from "../../context/TodoContext";
import { useNavigate } from "react-router-dom";

import TodoItem from "../Item/TodoItem"

const TodoList = () => {

    const todos = useTodo();
    const navigate = useNavigate();
    
    const handleEdit = (data) => {
        navigate(`/static/edit/todo`, { state: { editData: data } });
    }

    return (
        <>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleEdit={() => handleEdit(todo)}
                />
            ))}
        </>
    )
}

export default TodoList