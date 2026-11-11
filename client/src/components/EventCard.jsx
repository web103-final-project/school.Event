import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import EventMeta, { categoryNames } from './EventMeta.jsx';

export default function EventCard({ event }) {
  return (
    <li>
      <Link className="event-card" data-category={event.category} to={`/events/${event.id}`} aria-labelledby={`event-${event.id}`}>
        <div className="card-photo">{event.imageUrl && <img src={event.imageUrl} alt="" loading="lazy" width="640" height="440" />}</div>
        <div className="card-content">
          <span className="category-script">#{event.category}</span>
          <h3 id={`event-${event.id}`}>{event.title}</h3>
          <EventMeta event={event} />
          <span className="card-action">View event <ArrowUpRight size={18} aria-hidden="true" /></span>
          <span className="sr-only">{categoryNames[event.category] ?? event.category}</span>
        </div>
      </Link>
    </li>
  );
}
