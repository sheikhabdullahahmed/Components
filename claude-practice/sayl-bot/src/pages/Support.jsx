import AppLayout from '../components/layout/AppLayout'
import TopBar from '../components/layout/TopBar'
import NewRequestModal from '../components/NewRequestModal'
import PrimaryButton from '../components/PrimaryButton'
import StatusBadge from '../components/StatusBadge'

const statuses = ['Open', 'Resolved', 'Open', 'Pending', 'Resolved', 'Resolved', 'Pending', 'Resolved', 'Resolved', 'Open', 'Resolved', 'Resolved', 'Pending']
const tickets = statuses.map((status) => ({ id: 'ABC1234567', issue: 'Rewiring', updated: '03 Hours Ago', status }))

// Column positions are taken from the Figma frame.
const headColumns = 'grid-cols-[260.8px_236.7px_285.8px_250.7px_1fr]'
const rowColumns = 'grid-cols-[266.8px_243.7px_275.8px_268.7px_1fr]'

function Support({ showNewRequest = false }) {
  return (
    <AppLayout active="support">
      <div className="flex flex-col gap-5">
        <TopBar title="Support" subtitle="Quickly Create and manage your existing bots" />

        <section className="flex flex-col gap-6 rounded-[10px] bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-[31px] font-medium text-text">Support Request History</h2>
            <PrimaryButton icon="question-white" href="#/support/new" className="w-[133px]">
              New Request
            </PrimaryButton>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`grid h-[29px] items-center rounded-[5px] bg-table-head px-3 text-sm leading-[21px] text-text ${headColumns}`}>
              <span>Ticket ID</span>
              <span>Issue</span>
              <span>Last Update</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="flex flex-col gap-2">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className={`grid h-12 items-center text-sm leading-[21px] text-muted ${rowColumns} ${
                    index < tickets.length - 1 ? 'border-b-[0.5px] border-line' : ''
                  }`}
                >
                  <span>{ticket.id}</span>
                  <span>{ticket.issue}</span>
                  <span>{ticket.updated}</span>
                  <span>
                    <StatusBadge status={ticket.status} />
                  </span>
                  <button type="button" className="h-[23px] w-[52px] justify-self-end rounded-full bg-page text-xs font-medium text-primary">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {showNewRequest && <NewRequestModal />}
    </AppLayout>
  )
}

export default Support
