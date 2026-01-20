import { createContext, useContext, useEffect, useReducer } from "react"
import todoApi from "../api/todo"

const TodoContext = createContext();
const TodoActionsContext = createContext();

function todoServerToClient(todo) {
    const mapping = {
        user_id: "userId",
        name: "taskName",
        is_completed: "isCompleted",
        completed_at: "completedAt",
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
        completedAt: "completed_at",
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

const isSameLocalDate = (a, b) => {
    if (!a || !b) return false;
    const toDate = (v) => (v instanceof Date ? v : new Date(v));
    const d1 = toDate(a);
    const d2 = toDate(b);
    return d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate();
}

const initialTodos = {
    incompleted: [],
    completedToday: [],
    completedPast: {
        todos: [],
        totalCount: 0,
        page: 1,
        limit: 5
    } 
}

const todoReducer = (todos, action) => {
    switch(action.type) {
        case "LOAD":
            return {
                incompleted: action.payload.incompleted,
                completedToday: action.payload.completedToday,
                completedPast: {
                    ...todos.completedPast,
                    todos: action.payload.completedPast,
                    totalCount: action.payload.totalCount,
                }
            }
        case "ADD":
            return {
                ...todos,
                incompleted: [...todos.incompleted, action.todo]
            }
        case "PAGINATE":
            return {
                ...todos, 
                completedPast: {
                    ...todos.completedPast,
                    todos: action.payload.todos,
                    page: action.payload.page
                }
            }
    }
}

const TodoProvider = ({children}) => {
    const [ todos, dispatch ] = useReducer(todoReducer, initialTodos)
    const userId = 4;

    const today = new Date();
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth()+1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    const todayStr = `${yyyy}-${mm}-${dd}`

    const load = async() => {
        try {
            const [incompletedRes, completedTodayRes, completedPastRes, totalCountRes] = await Promise.all([
                todoApi.get(userId, { completed:false, sort: "-updated_at" }),
                todoApi.get(userId, { completed:true, completed_at: todayStr, sort: "-completed_at" }),
                todoApi.get(userId, { completed:true, completed_before: todayStr, sort: "-completed_at", page: todos.completedPast.page, limit: todos.completedPast.limit }),
                todoApi.get(userId, { completed:true, completed_before: todayStr, limit: 0 }), ])
            const incompletedTodos = incompletedRes.map(todoServerToClient)
            const completedTodayTodos = completedTodayRes.map(todoServerToClient)
            const completedPastTodos = completedPastRes.map(todoServerToClient)
            const totalCount = totalCountRes.count
            dispatch({  type: "LOAD",  payload: {   incompleted: incompletedTodos, 
                                                    completedToday: completedTodayTodos, 
                                                    completedPast: completedPastTodos, 
                                                    totalCount: totalCount }})
        } catch(err) {
            console.error(err)                
        } 
    }

    useEffect(() => {
        load()
    }, [userId])

    const actions = {
        createTodo: async (todo) => {
            validateTodo(todo)
            const todoData = await todoApi.post(userId, todoClientToServer(todo))
            dispatch({ type: "ADD", todo: todoServerToClient(todoData) })
        },
        editTodo: async (todoId, updates) => {
            validateTodo(updates)
            await todoApi.patch(todoId, todoClientToServer(updates))
            load()
        },
        deleteTodo: async (todoId) => {
            await todoApi.delete(todoId)
            load()
        },
        paginateCompletedPastTodos: async (page) => {
            const paginatedRes = await todoApi.get(userId, { completed: true, completed_before: todayStr, sort: "-completed_at", page: page, limit: 5 })
            const paginatedTodos = paginatedRes.map(todoServerToClient)
            dispatch({ type: "PAGINATE", payload: { todos: paginatedTodos, page: page } })
         }
    }

    return (
        <TodoContext.Provider value={todos}>
            <TodoActionsContext.Provider value={actions}>
                {children}
            </TodoActionsContext.Provider>
        </TodoContext.Provider>
    )
}

const useTodo = () => useContext(TodoContext)
const useTodoActions = () => useContext(TodoActionsContext)

export { useTodo, useTodoActions, TodoProvider };

