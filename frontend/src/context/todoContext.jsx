import { createContext, useContext, useEffect, useReducer } from "react"
import todoApi from "../api/todo"

const TodoContext = createContext();
const TodoDispatchContext = createContext();
const TodoActionsContext = createContext();

function todoServerToClient(todo) {
    const mapping = {
        user_id: "userId",
        name: "taskName",
        is_completed: "isCompleted",
        created_at: "createdAt",
        updated_at: "updatedAt",
    };
    const result = { ...todo };
    for (const [serverKey, clientKey] of Object.entries(mapping)) {
        if (todo[serverKey] !== undefined) {
            result[clientKey] = todo[serverKey];
        }
    }
    return result;
}

function todoClientToServer(todo) {
    const mapping = {
        userId: "user_id",
        taskName: "name",
        isCompleted: "is_completed",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };
    const result = { ...todo };
    for (const [clientKey, serverKey] of Object.entries(mapping)) {
        if (todo[clientKey] !== undefined) {
            result[serverKey] = todo[clientKey];
        }
    }
    return result;
}

const sortTodos = (todos) => {
    const sorted = [...todos].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return sorted;
}

const validateTodo = (data) => {
    if (data.hasOwnProperty('taskName')) {
        if (!data.taskName || data.taskName.trim() === "") {
            throw new Error("タスク名を入力してください");
        }
    }
    if (data.hasOwnProperty('difficulty')) {
        if (data.difficulty < 1 || data.difficulty > 5) {
            throw new Error("難易度は1-5の範囲で設定してください");
        }
    }
    if (data.hasOwnProperty('reward')) {
        if (data.reward < 1) {
            throw new Error("報酬は1以上で設定してください");
        }
    }
}

const todoReducer = (todos, action) => {
    let newTodos;

    switch (action.type) {
    case "todo/init":
        return sortTodos(action.todos);

    case "todo/add": 
        newTodos = [...todos, action.todo];
        return sortTodos(newTodos);

    case "todo/delete":
        newTodos = todos.filter(todo => todo.id !== action.todo.id);
        return sortTodos(newTodos);

    case "todo/patch":
        newTodos = todos.map(todo => 
            todo.id === action.todo.id ? action.todo : todo
        );
        return sortTodos(newTodos);
    default:
        return todos;
    }
};

const TodoProvider = ({children}) => {
    const [ todos, dispatch ] = useReducer(todoReducer, [])
    const userId = 4;

    useEffect(() => {
        todoApi.get(userId).then(todos => {
            dispatch({ type: "todo/init", todos: todos.map(todo => todoServerToClient(todo))})
        })
    }, [])

    const actions = {
        createTodo: async (todo) => {
            validateTodo(todo)
            const todoData = await todoApi.post(userId, todoClientToServer(todo))
            dispatch({ type: "todo/add", todo: todoServerToClient(todoData) })
        },
        editTodo: async (todoId, updates) => {
            validateTodo(updates)
            const todoData = await todoApi.patch(todoId, todoClientToServer(updates))
            dispatch({ type: "todo/patch", todo: todoServerToClient(todoData) })
        },
        deleteTodo: async (todoId) => {
            const todoData = await todoApi.delete(todoId)
            dispatch({ type: "todo/delete", todo: todoServerToClient(todoData) })
        },
        getCompletedTodos: () => {  return todos.filter(t => t.isCompleted) },
        getIncompletedTodos: () => { return todos.filter(t => !t.isCompleted) },
    }

    return (
        <TodoContext.Provider value={todos}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoActionsContext.Provider value={actions}>
                    {children}
                </TodoActionsContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    )
}

const useTodo = () => useContext(TodoContext)
const useDispatchTodo = () => useContext(TodoDispatchContext)
const useTodoActions = () => useContext(TodoActionsContext)

export { useTodo, useDispatchTodo, useTodoActions, TodoProvider };

