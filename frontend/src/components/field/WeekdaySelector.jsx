import { useState } from "react" 
import { Wrap, Button } from "@chakra-ui/react";

const WeekdaySelector = () => {

    const weekdays = ["日", "月", "火", "水", "木", "金", "土"]

    const [selected, setSelected] = useState([]);

    const toggleDay = (day) => {
        setSelected((prev) =>
        prev.includes(day)
            ? prev.filter((d) => d !== day)
            : [...prev, day]
        );
    };
    return (
        <Wrap width="100%" justify="space-around">
        {weekdays.map((day) => (
            <Button
            key={day}
            size="sm"
            rounded="full"
            colorPalette="green"
            variant={selected.includes(day) ? "solid" : "outline"}
            onClick={() => toggleDay(day)}
            >
            {day}
            </Button>
        ))}
        </Wrap>
    )
}

export default WeekdaySelector