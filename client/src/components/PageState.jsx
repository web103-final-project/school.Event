import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageState({ title, message, retry, headingLevel = 'h1' }) {
  const Heading = headingLevel;
  return (
    <section className="page-state" aria-live="polite">
      <span className="state-mark" aria-hidden="true">S</span>
      <Heading>{title}</Heading>
      <p>{message}</p>
      {retry ? <button className="button" onClick={retry}>Try again</button> : (
        <Link className="text-link" to="/"><ArrowLeft size={18} aria-hidden="true" /> Back to events</Link>
      )}
    </section>
  );
}
