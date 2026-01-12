import { createContext, useContext, useEffect, useReducer } from "react"
import habitApi from "../api/habit"

const HabitContext = createContext();
const HabitDispatchContext = createContext();
const HabitActionsContext = createContext();



function extractWeekdays(habit) {
    const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

    return DAYS.reduce((acc, day) => {
        acc[day] = Boolean(habit[day]);
        return acc;
    }, {});
}

function habitServerToClient(habit) {
    const mapping = {
        user_id: "userId",
        name: "taskName",
        is_completed: "isCompleted",
        created_at: "createdAt",
        updated_at: "updatedAt",
    };
    const result = { ...habit };
    for (const [serverKey, clientKey] of Object.entries(mapping)) {
        if (habit[serverKey] !== undefined) {
            result[clientKey] = habit[serverKey];
        }
    }
    result.weekdays = extractWeekdays(habit);

    return result;
}

function habitClientToServer(habit) {
    const mapping = {
        userId: "user_id",
        taskName: "name",
        isCompleted: "is_completed",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };
    const result = { ...habit };
    for (const [clientKey, serverKey] of Object.entries(mapping)) {
        if (habit[clientKey] !== undefined) {
            result[serverKey] = habit[clientKey];
        }
    }
    if (habit.weekdays) {
        Object.assign(result, habit.weekdays);
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
        return sortHabits(action.habits);

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
    const userId = 4;

    useEffect(() => {
        habitApi.get(userId).then(habits => {
            dispatch({ type: "habit/init", habits: habits.map(habit => habitServerToClient(habit))})
        })
    }, [])

    const actions = {
        createHabit: async (habit) => {
            validateHabit(habit)
            const habitRes = await habitApi.post(userId, habitClientToServer(habit))
            dispatch({ type: "habit/add", habit: habitServerToClient(habitRes) })
        },
        editHabit: async (habitId, updates) => {
            validateHabit(updates)
            const habitRes = await habitApi.patch(habitId, habitClientToServer(updates))
            dispatch({ type: "habit/patch", habit: habitServerToClient(habitRes) })
        },
        deleteHabit: async (habitId) => {
            const habitData = await habitApi.delete(habitId)
            dispatch({ type: "habit/delete", habit: habitServerToClient(habitData) })
        },
        getCompletedHabits: () => {  return habits.filter(t => t.isCompleted) },
        getIncompletedHabits: () => { return habits.filter(t => !t.isCompleted) },
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

