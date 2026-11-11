import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EventDetails from './pages/EventDetails.jsx';
import EventEditor from './pages/EventEditor.jsx';
import PageState from './components/PageState.jsx';

export default function App() {
  const { pathname } = useLocation();
  const main = useRef(null);

  useLayoutEffect(() => {
    document.title = 'School.Event | Your campus noticeboard';
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="School.Event home">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span>School<span className="brand-dot">.</span>event</span>
          </Link>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>Browse events</NavLink>
            <NavLink to="/events/new">Post an event</NavLink>
          </nav>
        </div>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/new" element={<EventEditor mode="create" />} />
          <Route path="/events/:eventId/edit" element={<EventEditor mode="edit" />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="*" element={<PageState title="This page isn't on the board." message="The address may have changed. Find your next event on the campus board." />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span className="footer-brand">School.event</span>
        <span>See you around campus.</span>
      </footer>
    </>
  );
}
