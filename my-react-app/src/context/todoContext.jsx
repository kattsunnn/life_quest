import { createContext, useContext, useEffect, useReducer } from "react"
import todoApi from "../api/todo"

const TodoContext = createContext();
const TodoDispatchContext = createContext();

const validateTodo = (todo) => {
    if (todo.name || todo.name.trim() === "") {
        throw new Error("タスク名を入力してください");
    }
    
    if (todo.difficulty < 1 || todo.difficulty > 5) {
        throw new Error("難易度は1-5の範囲で設定してください");
    }
    
    if (todo.reward < 1) {
        throw new Error("報酬は1以上で設定してください");
    }
}

const todoReducer = (todos, action) => {
  switch (action.type) {
    case "todo/init":
        return action.todo;

    case "todo/add": 
        return [...todos, action.todo];
    
    case "todo/delete":
        return todos.filter(todo => todo.id !== action.todoId);  // 修正

    case "todo/patch":
        // 同じIDを探して、見つかったら置き換え、それ以外はそのまま
        return todos.map(todo => 
            todo.id === action.todo.id ? action.todo : todo
        );
    default:
        return todos;
  }
};

const TodoProvider = ({children}) => {
    const [ todos, dispatch ] = useReducer(todoReducer, [])
    const userId = 1;

    useEffect(() => {
        todoApi.get(userId).then(todoData => {
            dispatch({ type: "todo/init", todo: todoData})
        })
    }, [])

    return (
        <TodoContext.Provider value={todos}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    )
}

const useTodo = () => useContext(TodoContext)
const useDispatchtodo = () => useContext(TodoDispatchContext)

export { useTodo, useDispatchtodo, TodoProvider, validateTodo };

