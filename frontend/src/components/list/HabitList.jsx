import { useHabit } from "../../context/habitContext";
import { useNavigate } from "react-router-dom";
import HabitItem from "../Item/HabitItem"

const HabitList = () => {

    const habits = useHabit();
    const navigate = useNavigate();
    
    const handleEdit = (habit) => {
        navigate(`/static/edit/habit`, { state: { editData: habit } });
    }

    return (
        <>
            {habits.map((habit) => (
                <HabitItem 
                    key={habit.id}
                    habit={habit}
                    handleEdit={() => handleEdit(habit)}
                />
            ))}
        </>
    )
}

export default HabitList