"use client";

import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {useState} from "react";
import moment from "moment";

const localizer = momentLocalizer(moment);

const BigCalendar = ({events = []}) => {
    const [view, setView] = useState(Views.WORK_WEEK);

    const handleOnChangeView = (selectedView) => {
        setView(selectedView);
    };

    const EventComponent = ({event}) => (
        <div>
            <div>{event.title}</div>
            {event.resource?.zoomLink && (
                <a href={event.resource.zoomLink} target="_blank" rel="noopener noreferrer"
                   className="text-blue-500 text-xs">
                    Zoom
                </a>
            )}
        </div>
    );

    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={["work_week", "day"]}
            view={view}
            onView={handleOnChangeView}
            style={{height: "98%"}}
            min={new Date(2025, 1, 0, 6, 0, 0)}
            max={new Date(2025, 1, 0, 22, 0, 0)}
            components={{
                event: EventComponent,
            }}
            eventPropGetter={(event) => ({
                style: {
                    backgroundColor: event.resource?.zoomLink ? "#e2f8ff" : "#f2f1ff",
                    borderRadius: "5px",
                    color: "black",
                },
            })}
            onSelectEvent={(event) => {
                console.log("Selected event:", event);
            }}
        />
    );
};

export default BigCalendar;
