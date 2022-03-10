import { EventInput } from '@fullcalendar/react';

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr,
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: '2022-02-20',
    },

    {
        id: createEventId(),
        title: 'Timed event',
        start: new Date(2022, 1, 10, 10, 0, 0),
        end: new Date(2022, 1, 10, 11, 0, 0),
    },
    {
        id: createEventId(),
        end: '2022-03-21T12:30:00',
        start: '2022-03-21T10:30:00',
        title: 'Meeting',
    },
    {
        id: createEventId(),
        end: '2022-03-21T15:30:00',
        start: '2022-03-21T14:00:00',
        title: 'Meeting',
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00',
    },
];

export function createEventId() {
    return String(eventGuid++);
}
