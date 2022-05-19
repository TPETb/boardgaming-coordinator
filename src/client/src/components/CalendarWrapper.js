import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime, Settings } from 'luxon';
import { useRecoilState, useRecoilValue, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import VisibleAffairsAtom from "../recoil/atoms/VisibleAffairsAtom";
import VisibleDateRangeAtom from "../recoil/atoms/VisibleDateRangeAtom";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import fetchAffairs from "../persistence/fetchAffairs";
import dayjs from "dayjs";
import AffairDetailsPopup from "./AffairDetailsPopup";
import AffairCreatePopup from "./AffairCreatePopup";

Settings.defaultZone = 'Asia/Tbilisi';
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

function CalendarWrapper() {
    const user = useRecoilValue(CurrentUserAtom);
    const [affairs, setAffairs] = useRecoilState(VisibleAffairsAtom);
    const [range, setRange] = useRecoilState(VisibleDateRangeAtom);
    const [selectedAffair, setSelectedAffair] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const clickRef = useRef(null);

    useEffect(() => {
        return () => {
            window.clearTimeout(clickRef?.current)
        }
    }, []);

    useEffect(async () => {
        if (!range) {
            const start = dayjs(new Date).subtract(7, "days");
            const end = dayjs(new Date).add(37, "days");
            setRange({ start, end });
            setAffairs(await fetchAffairs({ start, end }));
        }
    });

    const onRangeChange = async ({ start, end }) => {
        setRange({ start, end });
        setAffairs(await fetchAffairs({ start, end }));
    };

    const onAffairClick = ({id}) => {
        setSelectedAffair(id);
    };

    const onSelectSlot = useCallback(({start}) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            setSelectedSlot(start);
        }, 250)
    }, [])

    const onSelecting = useCallback(({start}) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            setSelectedSlot(start);
        }, 250)
    }, [])

    return (
        <div style={{ height: '95vh' }}>
            <Calendar
                onSelectEvent={onAffairClick}
                views={['month', 'day', 'week', 'agenda']}
                localizer={localizer}
                onRangeChange={onRangeChange}
                events={affairs}
                dayLayoutAlgorithm={'no-overlap'}
                onSelecting={onSelecting}
                onSelectSlot={onSelectSlot}
                selectable
            />

            {selectedSlot && <AffairCreatePopup start={selectedSlot}
                                                close={() => setSelectedSlot(null)}/>}

            {selectedAffair && <AffairDetailsPopup id={selectedAffair}
                                                   onClose={() => setSelectedAffair(null)}/>}
        </div>
    );
}

export default CalendarWrapper;
