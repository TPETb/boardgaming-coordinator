import React, { useEffect, useState } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime, Settings } from 'luxon';
import { useRecoilState, useRecoilValue, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import VisibleEventsAtom from "../recoil/atoms/VisibleEventsAtom";
import VisibleDateRangeAtom from "../recoil/atoms/VisibleDateRangeAtom";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import fetchEvents from "../persistence/fetchEvents";
import dayjs from "dayjs";

Settings.defaultZone = 'Asia/Tbilisi';
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

const defaultRange = {};

function CalendarWrapper() {
    const user = useRecoilValue(CurrentUserAtom);
    const [events, setEvents] = useRecoilState(VisibleEventsAtom);
    const [range, setRange] = useRecoilState(VisibleDateRangeAtom);

    useEffect(() => {
        if (!range) {
            const start = dayjs(new Date).subtract(7, "days");
            const end = dayjs(new Date).add(37, "days");
            setRange({ start, end });
            setEvents(fetchEvents({ start, end }));
        }
    });

    const onRangeChange = ({ start, end }) => {
        setRange({ start, end });
        setEvents(fetchEvents(range));
    };

    return (
        <div style={{ height: '95vh' }}>
            <Calendar
                views={['month', 'day', 'week', 'agenda']}
                localizer={localizer}
                onRangeChange={onRangeChange}
                events={events}
            />
        </div>
    );
}

export default CalendarWrapper;
