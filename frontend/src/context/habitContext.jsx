import { createContext, useContext, useEffect, useReducer } from "react"
import habitApi from "../api/habit"
import { v4 as uuidv4 } from 'uuid'

const HabitContext = createContext();
const HabitDispatchContext = createContext();
const HabitActionsContext = createContext();

function habitServerToClient(habit) {
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
        if (habit[serverKey] !== undefined) {
            result[clientKey] = habit[serverKey];
        }
    }
    return result;
}

function habitClientToServer(habit) {
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
        if (habit[clientKey] !== undefined) {
            result[serverKey] = habit[clientKey];
        }
    }
    return result;
}

const sortHabits = (habits) => {
    const sorted = [...habits].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return sorted;
}

const validateHabit = (data) => {
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
const habitReducer = (habits, action) => {
    let newHabits;

    switch (action.type) {
    case "habit/init":
        return sortHabits(action.habit);

    case "habit/add": 
        newHabits = [...habits, action.habit];
        return sortHabits(newHabits);

    case "habit/delete":
        newHabits = habits.filter(habit => habit.id !== action.habit.id);
        return sortHabits(newHabits);

    case "habit/patch":
        newHabits = habits.map(habit => 
            habit.id === action.habit.id ? action.habit : habit
        );
        return sortHabits(newHabits);
    default:
        return habits;
    }
};

const HabitProvider = ({children}) => {
    const [ habits, dispatch ] = useReducer(habitReducer, [])
    const userId = 1;

    useEffect(() => {
        habitApi.get(userId).then(data => {
            dispatch({ type: "habit/init", habit: data.habits.map(habitServerToClient)})
        })
    }, [])

    const actions = {
        createHabit: async (habit) => {
            validateHabit(habit)
            const habitToCreate = {
                userId: userId,
                ...habit,
                isCompleted: false,
            }
            const habitData = await habitApi.post(habitClientToServer(habitToCreate))
            dispatch({ type: "habit/add", habit: habitServerToClient(habitData) })
        },
        editHabit: async (id, updates) => {
            validatehabit(updates)
            const habitData = await habitApi.patch(id, habitClientToServer(updates))
            dispatch({ type: "habit/patch", habit: habitServerToClient(habitData) })
        },
        deleteHabit: async (id) => {
            const habitData = await habitApi.delete(id)
            dispatch({ type: "habit/delete", habit: habitServerToClient(habitData) })
        }
    }

    return (
        <HabitContext.Provider value={habits}>
            <HabitDispatchContext.Provider value={dispatch}>
                <HabitActionsContext.Provider value={actions}>
                    {children}
                </HabitActionsContext.Provider>
            </HabitDispatchContext.Provider>
        </HabitContext.Provider>
    )
}

const useHabit = () => useContext(HabitContext)
const useDispatchHabit = () => useContext(HabitDispatchContext)
const useHabitActions = () => useContext(HabitActionsContext)

export { useHabit, useDispatchHabit, useHabitActions, HabitProvider };

