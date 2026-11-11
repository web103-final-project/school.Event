import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApi } from '../api.js';
import PageState from '../components/PageState.jsx';

const empty = {
  title: '', description: '', location: '', host: '',
  categoryId: '', startsAt: '', endsAt: '', imageUrl: '',
};

function toLocalInput(iso) {
  const date = new Date(iso);
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toPayloadTime(value) {
  const time = new Date(value);
  return Number.isNaN(time.getTime()) ? value : time.toISOString();
}

function Field({ id, label, error, children }) {
  return (
    <label htmlFor={id}>
      <span>{label}</span>
      {children}
      {error && <span id={`${id}-error`} className="field-error">{error}</span>}
    </label>
  );
}

export default function EventEditor({ mode }) {
  const isEdit = mode === 'edit';
  const { eventId } = useParams();
  const navigate = useNavigate();
  const eventRequest = useApi(isEdit ? `/api/events/${encodeURIComponent(eventId)}` : null);
  const categoriesRequest = useApi('/api/categories');
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const prefilled = useRef(false);

  useEffect(() => {
    document.title = `${isEdit ? 'Edit event' : 'Post an event'} | School.Event`;
  }, [isEdit]);

  useEffect(() => {
    if (!isEdit || eventRequest.status !== 'ready' || prefilled.current) return;
    prefilled.current = true;
    const event = eventRequest.data;
    setValues({
      title: event.title,
      description: event.description,
      location: event.location,
      host: event.host,
      categoryId: String(event.categoryId),
      startsAt: toLocalInput(event.startsAt),
      endsAt: toLocalInput(event.endsAt),
      imageUrl: event.imageUrl ?? '',
    });
  }, [isEdit, eventRequest.status, eventRequest.data]);

  function change(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setFormError('');
    const payload = {
      ...values,
      categoryId: values.categoryId ? Number(values.categoryId) : '',
      startsAt: toPayloadTime(values.startsAt),
      endsAt: toPayloadTime(values.endsAt),
    };
    try {
      const response = await fetch(isEdit ? `/api/events/${encodeURIComponent(eventId)}` : '/api/events', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => ({}));
      if (response.status === 200 || response.status === 201) {
        navigate(`/events/${body.id}`);
        return;
      }
      setErrors(body.errors ?? {});
      setFormError(body.error ?? 'The event could not be saved.');
    } catch {
      setFormError('The event could not be saved. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  }

  if (isEdit && eventRequest.status === 'loading') return <p className="loading-state detail-loading" role="status">Opening the event…</p>;
  if (isEdit && eventRequest.status === 'missing') return <PageState title="This event isn't on the board." message="It may have been removed, or the link may be incorrect. There are more campus happenings to explore." />;
  if (isEdit && eventRequest.status === 'error') return <PageState title="We couldn't open this event." message="Check your connection and try again in a moment." retry={eventRequest.retry} />;

  const described = (id) => (errors[id] ? `${id}-error` : undefined);

  return (
    <div className="form-page">
      <Link className="text-link back-link" to={isEdit ? `/events/${eventId}` : '/'}><ArrowLeft size={18} aria-hidden="true" /> {isEdit ? 'Back to event' : 'Back to events'}</Link>
      <h1>{isEdit ? 'Edit this event' : 'Post an event'}</h1>
      <p className="form-intro">{isEdit ? 'Update the details students see on the board.' : 'Add a campus event to the noticeboard.'}</p>
      <form className="form-card" onSubmit={save} noValidate>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <Field id="title" label="Title" error={errors.title}>
          <input id="title" name="title" value={values.title} onChange={change} aria-invalid={Boolean(errors.title)} aria-describedby={described('title')} />
        </Field>
        <Field id="description" label="Description" error={errors.description}>
          <textarea id="description" name="description" rows="5" value={values.description} onChange={change} aria-invalid={Boolean(errors.description)} aria-describedby={described('description')} />
        </Field>
        <div className="time-fields">
          <Field id="startsAt" label="Starts" error={errors.startsAt}>
            <input id="startsAt" name="startsAt" type="datetime-local" value={values.startsAt} onChange={change} aria-invalid={Boolean(errors.startsAt)} aria-describedby={described('startsAt')} />
          </Field>
          <Field id="endsAt" label="Ends" error={errors.endsAt}>
            <input id="endsAt" name="endsAt" type="datetime-local" value={values.endsAt} onChange={change} aria-invalid={Boolean(errors.endsAt)} aria-describedby={described('endsAt')} />
          </Field>
        </div>
        <Field id="location" label="Location" error={errors.location}>
          <input id="location" name="location" value={values.location} onChange={change} aria-invalid={Boolean(errors.location)} aria-describedby={described('location')} />
        </Field>
        <Field id="host" label="Host" error={errors.host}>
          <input id="host" name="host" value={values.host} onChange={change} aria-invalid={Boolean(errors.host)} aria-describedby={described('host')} />
        </Field>
        <Field id="categoryId" label="Category" error={errors.categoryId}>
          <select id="categoryId" name="categoryId" value={values.categoryId} onChange={change} aria-invalid={Boolean(errors.categoryId)} aria-describedby={described('categoryId')} disabled={categoriesRequest.status !== 'ready'}>
            <option value="">{categoriesRequest.status === 'ready' ? 'Choose a category' : 'Loading categories…'}</option>
            {categoriesRequest.status === 'ready' && categoriesRequest.data.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </Field>
        {categoriesRequest.status === 'error' && <button className="button button-quiet" type="button" onClick={categoriesRequest.retry}>Try loading categories again</button>}
        <Field id="imageUrl" label="Image address (optional)" error={errors.imageUrl}>
          <input id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={change} aria-invalid={Boolean(errors.imageUrl)} aria-describedby={described('imageUrl')} />
        </Field>
        <div className="form-actions">
          <button className="button" type="submit" disabled={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Post event'}</button>
          <Link className="text-link" to={isEdit ? `/events/${eventId}` : '/'}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
