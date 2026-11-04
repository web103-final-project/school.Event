import { CalendarDays, Clock3, MapPin, Users } from 'lucide-react';

export const categoryNames = {
  clubs: 'Clubs', academic: 'Academic', career: 'Career',
  sports: 'Sports', social: 'Social', arts: 'Arts',
};

const timeZone = 'America/Chicago';
const dateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone });
const detailedDateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone });
const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone });

export default function EventMeta({ event, detailed = false }) {
  return (
    <dl className={`event-meta ${detailed ? 'event-meta-detailed' : ''}`}>
      <div>
        <dt><CalendarDays size={18} aria-hidden="true" /><span className="sr-only">Date</span></dt>
        <dd><time dateTime={event.startsAt}>{(detailed ? detailedDateFormat : dateFormat).format(new Date(event.startsAt))}</time></dd>
      </div>
      <div>
        <dt><Clock3 size={18} aria-hidden="true" /><span className="sr-only">Time</span></dt>
        <dd>{timeFormat.format(new Date(event.startsAt))}{detailed && ` – ${timeFormat.format(new Date(event.endsAt))}`} CT</dd>
      </div>
      <div><dt><MapPin size={18} aria-hidden="true" /><span className="sr-only">Location</span></dt><dd>{event.location}</dd></div>
      {detailed && <div><dt><Users size={18} aria-hidden="true" /><span className="sr-only">Host</span></dt><dd>{event.host}</dd></div>}
    </dl>
  );
}
