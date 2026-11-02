import { Link } from 'react-router-dom'
import { CalendarPlus, Pill } from 'lucide-react'
import Layout from '../components/Layout'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import PageHeader from '../components/PageHeader'
import SuccessState from '../components/SuccessState'
import { TableSkeleton, TileSkeleton } from '../components/Skeleton'

// A showcase of every screen state, so they can be reviewed without a backend.
// It is not linked from the menu. Open it at /states. Safe to delete later.
function Section({ title, note, children }) {
  return (
    <section className="mb-10">
      <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
      <p className="mb-4 mt-1 text-sm text-gray-500">{note}</p>
      {children}
    </section>
  )
}

function StatesPreview() {
  return (
    <Layout>
      <PageHeader
        title="Screen states"
        subtitle="What users see when a page is empty, loading, failing, or finished"
      />

      <Section title="Empty" note="A list with nothing in it yet. Say what will appear, and offer the next step.">
        <EmptyState
          icon={Pill}
          title="No prescriptions yet"
          message="When a doctor prescribes medicine, it will show up here."
          action={
            <Link
              to="/patient/book"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
              <CalendarPlus size={16} /> Book an appointment
            </Link>
          }
        />
      </Section>

      <Section title="Loading" note="Grey placeholders in the shape of the content, shown while data is on its way.">
        <div className="space-y-4">
          <TileSkeleton />
          <TableSkeleton rows={3} />
        </div>
      </Section>

      <Section title="Error" note="Say what happened, reassure, and offer a way to try again.">
        <ErrorState onRetry={() => {}} code="500" />
      </Section>

      <Section title="Success" note="Confirm it worked, show the details, and point to what happens next.">
        <SuccessState
          title="Appointment requested"
          message="We'll confirm it by email once the doctor approves."
          details={[
            { label: 'Doctor', value: 'Dr. Maria Santos' },
            { label: 'Date', value: 'Oct 25, 2026' },
            { label: 'Time', value: '9:00 AM' },
          ]}
        >
          <Link
            to="/patient/appointments"
            className="rounded-lg bg-blue-900 px-4 py-2.5 font-semibold text-white hover:bg-blue-800"
          >
            View my appointments
          </Link>
          <Link
            to="/patient/book"
            className="rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-100"
          >
            Book another
          </Link>
        </SuccessState>
      </Section>

      <Section title="Offline, expired session, and access denied" note="These are full screens or bars:">
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Offline: turn off your Wi-Fi and a yellow bar appears at the top of every portal page.</li>
          <li>
            Session expired:{' '}
            <Link to="/session-expired" className="text-blue-700 hover:underline">
              /session-expired
            </Link>
          </li>
          <li>
            Access denied:{' '}
            <Link to="/unauthorized" className="text-blue-700 hover:underline">
              /unauthorized
            </Link>
          </li>
          <li>
            Page not found:{' '}
            <Link to="/nope" className="text-blue-700 hover:underline">
              any unknown address
            </Link>
          </li>
        </ul>
      </Section>
    </Layout>
  )
}

export default StatesPreview
