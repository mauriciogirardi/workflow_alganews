import { useState } from 'react';

import FullCalendar, {
    EventApi,
    DateSelectArg,
    EventClickArg,
    EventContentArg,
    formatDate,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import allLocales from '@fullcalendar/core/locales-all';

import { INITIAL_EVENTS, createEventId } from './event-utils';

export default function Calendar() {
    const [weekendsVisible, setWeekendsVisible] = useState(false);
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

    const renderSidebar = () => {
        return (
            <div className="demo-app-sidebar">
                <div className="demo-app-sidebar-section">
                    <h2>Instructions</h2>
                    <ul>
                        <li>
                            Select dates and you will be prompted to create a
                            new event
                        </li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className="demo-app-sidebar-section">
                    <label>
                        <input
                            type="checkbox"
                            checked={weekendsVisible}
                            onChange={handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className="demo-app-sidebar-section">
                    <h2>All Events ({currentEvents.length})</h2>
                    <ul>{currentEvents.map(renderSidebarEvent)}</ul>
                </div>
            </div>
        );
    };

    const handleWeekendsToggle = () => {
        setWeekendsVisible(prevState => !prevState);
    };

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let title = prompt('Please enter a new title for your event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            });
        }
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${clickInfo.event.title}'`,
            )
        ) {
            clickInfo.event.remove();
        }
    };

    const handleEvents = (events: EventApi[]) => {
        setCurrentEvents(events);
    };

    return (
        <div className="demo-app-main">
            {/* {renderSidebar()} */}
            <FullCalendar
                // height={400}
                // aspectRatio={1.35}
                // hiddenDays={[5, 6]} hidden fri and sat
                // weekends={weekendsVisible} hidden san and sat
                // dayHeaders={false} hidden header months
                // firstDay={5} first day the week order calendar header
                viewClassNames="fc-custom-view"
                allDayClassNames="fc-custom-all-day"
                dayHeaderClassNames="fc-custom-header"
                dayCellClassNames="fc-custom-day-cell"
                slotLaneClassNames="fc-custom-slot-lane"
                nowIndicatorClassNames="fc-custom-now-indicator"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                locales={allLocales}
                locale="pt-br" // the initial locale
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
            />
        </div>
    );
}

function renderEventContent(eventContent: EventContentArg) {
    return (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    );
}

function renderSidebarEvent(event: EventApi) {
    return (
        <li key={event.id}>
            <b>
                {formatDate(event.start!, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
            </b>
            <i>{event.title}</i>
        </li>
    );
}
