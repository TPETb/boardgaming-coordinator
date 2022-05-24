import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime, Settings } from 'luxon';
import { useRecoilState, useRecoilValue, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import VisibleAffairsAtom from "../recoil/atoms/VisibleAffairsAtom";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AffairDetailsPopup from "./AffairDetailsPopup";
import AffairCreatePopup from "./AffairCreatePopup";

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

function CalendarWrapper() {
    const user = useRecoilValue(CurrentUserAtom);
    const [affairs, setAffairs] = useRecoilState(VisibleAffairsAtom);

    const [selectedAffair, setSelectedAffair] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [viewMode, setViewMode] = useState('month');

    const clickRef = useRef(null);

    useEffect(() => {
        return () => {
            window.clearTimeout(clickRef?.current)
        }
    }, []);

    const onAffairClick = ({ id }) => {
        setSelectedAffair(id);
    };

    const onSelectSlot = useCallback(({ start }) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            setSelectedSlot(DateTime.fromJSDate(start));
        }, 250)
    }, [])

    const onSelecting = useCallback(({ start }) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            setSelectedSlot(DateTime.fromJSDate(start));
        }, 250)
    }, [])

    // Autoscroll to evening for convenience
    const scrollTime = new Date();
    scrollTime.setHours(23);
    scrollTime.setMinutes(0);

    return (
        <div style={{ height: '95vh' }}>
            <Calendar
                onSelectEvent={onAffairClick}
                views={['month', 'day', 'agenda']}
                localizer={localizer}
                events={affairs}
                scrollToTime={scrollTime}
                dayLayoutAlgorithm={'no-overlap'}
                onSelecting={onSelecting}
                onSelectSlot={onSelectSlot}
                selectable
            />

            {selectedSlot && <AffairCreatePopup defaultStart={selectedSlot}
                                                close={() => setSelectedSlot(null)} />}

            {selectedAffair && <AffairDetailsPopup id={selectedAffair}
                                                   onClose={() => setSelectedAffair(null)} />}
        </div>
    );
}

export default CalendarWrapper;
