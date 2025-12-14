import { createContext, useContext, useEffect, useReducer } from "react"
import todoApi from "../api/todo"
import { v4 as uuidv4 } from 'uuid'

const TodoContext = createContext();
const TodoDispatchContext = createContext();
const TodoActionsContext = createContext();

function todoServerToClient(todo) {
    const mapping = {
        id: "id",
        user_id: "userId",
        name: "taskName",
        difficulty: "difficulty",
        reward: "reward",
        memo: "memo",
        is_completed: "isCompleted",
        created_at: "createdAt",
        updated_at: "updatedAt",
    };

    const result = {};
    for (const [serverKey, clientKey] of Object.entries(mapping)) {
        if (todo[serverKey] !== undefined) {
            result[clientKey] = todo[serverKey];
        }
    }
    return result;
}

function todoClientToServer(todo) {
    const mapping = {
        id: "id",
        userId: "user_id",
        taskName: "name",
        difficulty: "difficulty",
        reward: "reward",
        memo: "memo",
        isCompleted: "is_completed",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const result = {};
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
    const userId = 1;

    useEffect(() => {
        todoApi.get(userId).then(data => {
            dispatch({ type: "todo/init", todos: data.todos.map(todoServerToClient)})
        })
    }, [])

    const actions = {
        createTodo: async (todo) => {
            validateTodo(todo)
            const todoToCreate = {
                userId: userId,
                ...todo,
                isCompleted: false,
            }
            const todoData = await todoApi.post(todoClientToServer(todoToCreate))
            dispatch({ type: "todo/add", todo: todoServerToClient(todoData) })
        },
        editTodo: async (id, updates) => {
            validateTodo(updates)
            const todoData = await todoApi.patch(id, todoClientToServer(updates))
            dispatch({ type: "todo/patch", todo: todoServerToClient(todoData) })
        },
        deleteTodo: async (id) => {
            const todoData = await todoApi.delete(id)
            dispatch({ type: "todo/delete", todo: todoServerToClient(todoData) })
        }
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
const useDispatchtodo = () => useContext(TodoDispatchContext)
const useTodoActions = () => useContext(TodoActionsContext)

export { useTodo, useDispatchtodo, useTodoActions, TodoProvider };

