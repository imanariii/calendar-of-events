import React, {FC} from 'react';
import {Badge, Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {formatDate} from "../utils/formatDate";

interface CalendarWrapperProps {
    events: IEvent[];
}
const CalendarWrapper: FC<CalendarWrapperProps> = (props) => {
    const dateCellRender = (value:any) => {
        const formatedDate = formatDate(value)
        const currentDayEvents = props.events.filter(ev=>ev.date === formatedDate)
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        )
    }
    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default CalendarWrapper;