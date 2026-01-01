import { useState } from "react" 
import { Wrap, Button } from "@chakra-ui/react";

const WeekdaySelector = ({weekdays, onChange}) => {

    const WEEKDAYS = [
        { label: "日", key: "sunday" },
        { label: "月", key: "monday" },
        { label: "火", key: "tuesday" },
        { label: "水", key: "wednesday" },
        { label: "木", key: "thursday" },
        { label: "金", key: "friday" },
        { label: "土", key: "saturday" },
    ];

    const toggleDay = (key) => {
        onChange({
        ...weekdays,
        [key]: !weekdays[key],
        });
    };

    return (
        <Wrap width="100%" justify="space-around">
        {WEEKDAYS.map(({label, key}) => (
            <Button
            key={key}
            size="sm"
            rounded="full"
            colorPalette="green"
            variant={weekdays[key] ? "solid" : "outline"}
            onClick={() => toggleDay(key)}
            >
            {label}
            </Button>
        ))}
        </Wrap>
    )
}

export default WeekdaySelector