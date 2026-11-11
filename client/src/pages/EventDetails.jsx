import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkle } from 'lucide-react';
import { useApi } from '../api.js';
import EventMeta, { categoryNames } from '../components/EventMeta.jsx';
import PageState from '../components/PageState.jsx';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { status, data: event, retry } = useApi(`/api/events/${encodeURIComponent(eventId)}`);
  const [deleteError, setDeleteError] = useState('');
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    if (event) document.title = `${event.title} | School.Event`;
  }, [event]);

  if (status === 'loading') return <p className="loading-state detail-loading" role="status">Opening the event…</p>;
  if (status === 'missing') return <PageState title="This event isn't on the board." message="It may have been removed, or the link may be incorrect. There are more campus happenings to explore." />;
  if (status === 'error') return <PageState title="We couldn't open this event." message="Check your connection and try again in a moment." retry={retry} />;

  async function remove() {
    if (!window.confirm('Remove this event from the board?')) return;
    setRemoving(true);
    setDeleteError('');
    try {
      const response = await fetch(`/api/events/${event.id}`, { method: 'DELETE' });
      if (response.status === 204) {
        navigate('/');
        return;
      }
      setDeleteError(response.status === 404 ? 'This event is already gone.' : 'The event could not be removed. Try again.');
    } catch {
      setDeleteError('The event could not be removed. Check your connection and try again.');
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="detail-page">
      <Link className="text-link back-link" to="/"><ArrowLeft size={18} aria-hidden="true" /> Back to events</Link>
      <article className="event-detail" data-category={event.category}>
        {event.imageUrl && <div className="detail-photo paper-photo"><img src={event.imageUrl} alt="" width="960" height="660" /></div>}
        <div className="detail-content">
          <span className="category-label">{categoryNames[event.category] ?? event.category}</span>
          <h1>{event.title}</h1>
          <EventMeta event={event} detailed />
          <div className="detail-description"><h2>What's happening</h2><p>{event.description}</p></div>
          <div className="detail-actions">
            <Link className="button" to={`/events/${event.id}/edit`}>Edit event</Link>
            <button className="button button-quiet" type="button" onClick={remove} disabled={removing}>{removing ? 'Removing…' : 'Remove event'}</button>
          </div>
          {deleteError && <p className="form-error" role="alert">{deleteError}</p>}
        </div>
        <aside className="event-note">
          <Sparkle size={28} aria-hidden="true" />
          <p className="note-title">Good things happen<br />when you show up.</p>
          <p>Take a study break, bring a friend, and make a little room for campus life.</p>
          <Link className="text-link" to="/">Explore more events</Link>
        </aside>
      </article>
    </div>
  );
}
