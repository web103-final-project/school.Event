import { Sparkle } from 'lucide-react';
import { useApi } from '../api.js';
import EventCard from '../components/EventCard.jsx';
import PageState from '../components/PageState.jsx';

export default function Home() {
  const { status, data: events, retry } = useApi('/api/events');

  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="home-title">
        <p className="handwritten">A little more campus, a little less scrolling <Sparkle size={24} aria-hidden="true" /></p>
        <h1 id="home-title">What's happening<br />on campus?</h1>
        <p className="hero-description">A new idea. A familiar face. Your next favorite thing.<br className="desktop-break" /> Find your people on the campus noticeboard.</p>
        <a className="hero-link" href="#events">Find something to look forward to <span aria-hidden="true">↓</span></a>
      </section>
      <section className="events-section" id="events" aria-labelledby="events-title">
        <div className="section-heading">
          <div><p className="season">Fall 2026</p><h2 id="events-title">On the board</h2></div>
          <p className="event-count" role="status">{status === 'ready' ? `${events.length} ${events.length === 1 ? 'event' : 'events'} to explore` : 'Campus happenings'}</p>
        </div>
        {status === 'loading' && <p className="loading-state" role="status">Gathering campus events…</p>}
        {(status === 'error' || status === 'missing') && <PageState headingLevel="h3" title="The board couldn't load." message="We couldn't reach the event list. Try again in a moment." retry={retry} />}
        {status === 'ready' && events.length === 0 && <div className="empty-state" role="status"><h3>A little quiet around here.</h3><p>No events are on the board yet. Check back for the next campus gathering.</p></div>}
        {status === 'ready' && events.length > 0 && <ul className="event-grid">{events.map((event) => <EventCard key={event.id} event={event} />)}</ul>}
      </section>
    </div>
  );
}
