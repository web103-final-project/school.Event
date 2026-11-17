import { useState } from 'react';
import { CircleCheck, Star } from 'lucide-react';
import { useApi } from '../api.js';

const options = [
  { status: 'Going', Icon: CircleCheck },
  { status: 'Interested', Icon: Star },
];

function saveErrorMessage(status, body) {
  if (status === 404) return body?.error === 'Student not found.' ? "We couldn't find your student record, so your RSVP wasn't saved." : "This event is no longer on the board, so your RSVP wasn't saved.";
  if (status === 400 && body?.error) return `Your RSVP wasn't saved. ${body.error}`;
  return "Your RSVP wasn't saved. Try again in a moment.";
}

// RSVP for the demo student (no sign-in yet; see server/students.js).
// PostgreSQL is the source of truth. A choice is shown as selected only after
// the server confirms it was saved.
export default function RsvpControls({ eventId }) {
  const student = useApi('/api/students/demo');
  const studentId = student.status === 'ready' ? student.data.id : null;
  const saved = useApi(studentId ? `/api/events/${eventId}/rsvp?student_id=${studentId}` : null);
  const [confirmed, setConfirmed] = useState(undefined);
  const [pending, setPending] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loading = student.status === 'loading' || saved.status === 'loading';
  const ready = student.status === 'ready' && saved.status === 'ready';
  const current = confirmed !== undefined ? confirmed : (ready ? saved.data.rsvp?.status ?? null : null);

  async function choose(status) {
    if (!ready || pending || status === current) return;
    setPending(status);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, status }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.rsvp) {
        setError(saveErrorMessage(response.status, body));
        return;
      }
      setConfirmed(body.rsvp.status);
      setNotice(`Saved. You're marked as ${body.rsvp.status}.`);
    } catch {
      setError("Your RSVP wasn't saved. Check your connection and try again.");
    } finally {
      setPending(null);
    }
  }

  let loadProblem = null;
  if (student.status === 'missing') loadProblem = { message: "RSVP isn't set up yet. The demo student record is missing." };
  else if (student.status === 'error') loadProblem = { message: "We couldn't load RSVP options.", retry: student.retry };
  else if (saved.status === 'missing') loadProblem = { message: "We couldn't find your RSVP for this event." };
  else if (saved.status === 'error') loadProblem = { message: "We couldn't load your RSVP.", retry: saved.retry };

  return (
    <section className="rsvp" aria-labelledby="rsvp-heading">
      <h2 id="rsvp-heading">Are you going?</h2>
      {student.status === 'ready' && (
        <p className="rsvp-identity">RSVPing as {student.data.name}, a shared demo profile. There's no sign-in yet.</p>
      )}
      <div className="rsvp-options" role="group" aria-labelledby="rsvp-heading" aria-busy={loading || pending !== null}>
        {options.map(({ status, Icon }) => {
          const selected = current === status;
          return (
            <button
              key={status}
              type="button"
              className={`rsvp-option${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              disabled={!ready || pending !== null}
              onClick={() => choose(status)}
            >
              <Icon size={18} aria-hidden="true" />
              {pending === status ? 'Saving…' : status}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {loading && <p className="rsvp-status">Checking your RSVP…</p>}
        {notice && !error && <p className="rsvp-status rsvp-saved">{notice}</p>}
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      {loadProblem && (
        <div className="rsvp-problem" role="alert">
          <p className="form-error">{loadProblem.message}</p>
          {loadProblem.retry && <button className="button button-quiet" type="button" onClick={loadProblem.retry}>Try again</button>}
        </div>
      )}
    </section>
  );
}
