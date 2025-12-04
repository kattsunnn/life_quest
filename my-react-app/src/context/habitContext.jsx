import { createContext, useContext, useEffect, useReducer } from "react"
import habitApi from "../api/habit"

const HabitContext = createContext();
const HabitDispatchContext = createContext();

const habitReducer = (habits, action) => {
  switch (action.type) {
    case "habit/init":
        return action.habit;
    case "habit/add":
        return [...habits, action.habit];
    case "habit/delete":
        return habits.filter(habit => habit.id !== action.habitId);  // 修正
    case "habit/patch":
        // 同じIDを探して、見つかったら置き換え、それ以外はそのまま
        return habits.map(habit => 
            habit.id === action.habit.id ? action.habit : habit
        );
    default:
        return habits;
  }
};

const HabitProvider = ({children}) => {
    const [ habits, dispatch ] = useReducer(habitReducer, [])
    const userId = 1;

    useEffect(() => {
        habitApi.get(userId).then(habitData => {
            dispatch({ type: "habit/init", habit: habitData})
        })
    }, [])

    return (
        <HabitContext.Provider value={habits}>
            <HabitDispatchContext.Provider value={dispatch}>
                {children}
            </HabitDispatchContext.Provider>
        </HabitContext.Provider>
    )
}

const useHabit = () => useContext(HabitContext)
const useDispatchhabit = () => useContext(HabitDispatchContext)

export { useHabit, useDispatchhabit, HabitProvider };

