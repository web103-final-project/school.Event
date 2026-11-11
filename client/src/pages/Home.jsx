import { useState } from 'react';
import { Sparkle } from 'lucide-react';
import { useApi } from '../api.js';
import EventCard from '../components/EventCard.jsx';
import PageState from '../components/PageState.jsx';

export default function Home() {
  const [categoryId, setCategoryId] = useState('');
  const [sort, setSort] = useState('date_asc');
  const params = new URLSearchParams({ sort });
  if (categoryId) params.set('categoryId', categoryId);
  const { status, data: events, retry } = useApi(`/api/events?${params}`);
  const categories = useApi('/api/categories');

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
        <form className="board-controls" onSubmit={(event) => event.preventDefault()}>
          <label>Category
            <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
              <option value="">All categories</option>
              {categories.status === 'ready' && categories.data.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label>Date
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="date_asc">Soonest first</option>
              <option value="date_desc">Latest first</option>
            </select>
          </label>
        </form>
        {status === 'loading' && <p className="loading-state" role="status">Gathering campus events…</p>}
        {(status === 'error' || status === 'missing') && <PageState headingLevel="h3" title="The board couldn't load." message="We couldn't reach the event list. Try again in a moment." retry={retry} />}
        {status === 'ready' && events.length === 0 && (
          <div className="empty-state" role="status">
            <h3>{categoryId ? 'Nothing in this category.' : 'A little quiet around here.'}</h3>
            <p>{categoryId ? 'Try another category, or post an event for the board.' : 'No events are on the board yet. Check back for the next campus gathering.'}</p>
          </div>
        )}
        {status === 'ready' && events.length > 0 && <ul className="event-grid">{events.map((event) => <EventCard key={event.id} event={event} />)}</ul>}
      </section>
    </div>
  );
}
